export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    url.host = env.TRACCAR_REPORTS || env.TRACCAR_SERVER
    if (!env.TRACCAR_REPORTS) {
        url.protocol = 'http:'
        url.port = 80
    }
    return fetch(new Request(url, request), cf)
}
