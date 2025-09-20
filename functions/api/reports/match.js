import distance from '@turf/distance';
import {featureCollection, lineString, point} from '@turf/helpers';
import bbox from "@turf/bbox";

function computeBoundingBox(edges) {
    // Convert each edge's shape to a LineString Feature
    const features = edges.map(edge =>
        lineString(edge.shape)
    );

    const collection = featureCollection(features);

    // Turf returns [minX, minY, maxX, maxY] → [west, south, east, north]
    const [west, south, east, north] = bbox(collection);

    // Add ~5km buffer (~0.05 deg)
    const buffer = 0.05;
    return [
        south - buffer,
        west - buffer,
        north + buffer,
        east + buffer
    ];
}

async function findTollBoothsByBoundingBox(tolledEdges) {
    console.log(tolledEdges);
    const bbox = computeBoundingBox(tolledEdges);
    const [south, west, north, east] = bbox;

    const overpassEndpoint = 'https://overpass-api.de/api/interpreter';

    const query = `
    [out:json][timeout:15];
    (
      node["barrier"="toll_booth"](${south},${west},${north},${east});
    );
    out body;
  `;

    const res = await fetch(overpassEndpoint, {
        method: 'POST',
        body: query
    });

    const data = await res.json();
    const booths = data.elements;

    // OPTIONAL: filter booths by distance to any tolled edge midpoint
    // E.g. keep booths within 2 km of any tolled edge midpoint
    const filtered = booths.filter(booth => {
        const boothCoord = { lat: booth.lat, lon: booth.lon };
        for (const edge of tolledEdges) {
            const shape = edge.shape;
            const start = shape[0];
            const end = shape[shape.length - 1];
            const mid = {
                lat: (start[1] + end[1]) / 2,
                lon: (start[0] + end[0]) / 2
            };
            const d = haversine(mid, boothCoord);
            if (d < 2000) return true; // within 2 km
        }
        return false;
    });

    // Deduplicate by OSM id
    return Object.values(Object.fromEntries(
        filtered.map(b => [b.id, b])
    ));
}

function getCountry(position) {
    const c = position?.address.split(',').slice(-1)[0].trim()
    switch (c) {
        case 'Brazil':
        case 'Brasil':
            return 'BR'
        case 'Portugal':
            return 'PT'
        case 'Chile':
            return 'CL'
        default:
            return c
    }
}

function interpolateIfNeeded(positions, maxGapMeters = 10) {
    const result = [];

    for (let i = 0; i < positions.length - 1; i++) {
        const from = positions[i];
        const to = positions[i + 1];

        const distKm = distance(
            point([from.longitude, from.latitude]),
            point([to.longitude, to.latitude])
        );
        const distMeters = distKm * 1000;

        result.push(from); // always keep the original point

        if (distMeters > maxGapMeters) {
            const steps = Math.floor(distMeters / maxGapMeters);

            for (let j = 1; j < steps; j++) {
                const t = j / steps;
                const newDate = new Date(from.fixTime).getTime() + Math.round((new Date(to.fixTime) - new Date(from.fixTime)) * t)
                const interpolated = {
                    latitude: from.latitude + (to.latitude - from.latitude) * t,
                    longitude: from.longitude + (to.longitude - from.longitude) * t,
                    fixTime: new Date(newDate).toISOString()
                };

                result.push(interpolated);
            }
        }
    }

    result.push(positions[positions.length - 1]); // add the last point
    return result;
}

export async function snapToRoads(_positions) {
    const positions = _positions
    const body = {
        shape: positions.map(pos => ({lat: pos.latitude, lon: pos.longitude})),
        costing: "auto",
        shape_match: "map_snap",
        filters: {
            action: "include",
            attributes: ['matched.point', 'edge.toll', 'edge.road_class', 'edge.way_id']
        }
    };

    const response = await fetch(`https://valhalla-${getCountry(positions.find(p => p.address))}.fleetmap.org/trace_attributes`, {
        method: "POST",
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Valhalla error: ${response.status} ${errorText}`);
    }
    const result = await response.json();
    const {matched_points, edges} = result
    console.log(edges.filter(e => e.toll))
    const booths = await findBoothsByWayIds(edges.filter(e => e.toll).map(e => e.way_id));
    console.log(`Found ${booths.length} real OSM booths near these segments.`);
    console.log(booths)
    return matched_points.map((pt, i) => {
        const {lon, lat} = pt
        return {
            ...positions[i], // keep original time, altitude, etc.
            latitude: lat,
            longitude: lon
        };
    });
}

export const onRequest = async ({request, env}, cf) => {
    const url = new URL(request.url)
    url.host = env.TRACCAR_SERVER
    url.protocol = 'http:'
    url.port = 80
    url.pathname = url.pathname.replace('match', 'route')
    const response = await fetch(new Request(url, request), cf)
    const positions = await response.json()
    await snapToRoads(positions)
    return new Response()
}

async function findBoothsByWayIds(wayIds) {
    console.log(wayIds)
    const overpassEndpoint = 'https://overpass-api.de/api/interpreter';

    const wayPart = wayIds.map(id => `way(${id});`).join('\n');

    const query = `
    [out:json][timeout:25];
    (
      ${wayPart}
    );
    node(w)["barrier"="toll_booth"];
    out body;
  `;
    console.log(query);
    const res = await fetch(overpassEndpoint, {
        method: 'POST',
        body: query
    });

    const data = await res.json();
    console.log(data);
    return data.elements;
}