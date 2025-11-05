export const onRequest = ({request}) => {
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400',
            }
        });
    }

    const url = new URL(request.url);
    url.pathname = "/traccar" + url.pathname;
    return Response.redirect(url.toString(), 302);
}
