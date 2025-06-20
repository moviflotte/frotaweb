import distance from '@turf/distance';
import { point } from '@turf/helpers';

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
    const positions = interpolateIfNeeded(_positions)
    const body = {
        shape: positions.map(pos => ({lat: pos.latitude, lon: pos.longitude})),
        costing: "auto",
        shape_match: "map_snap",
        filters: {
            action: "include",
            attributes: ['matched.point', 'edge.toll', 'edge.road_class']
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
    edges.forEach(e => e.toll && console.log(e))

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
