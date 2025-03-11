export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    url.host = env.TRACCAR_SERVER
    url.protocol = 'http:'
    url.port = 80
    return fetch(new Request(url, request), cf)
}
