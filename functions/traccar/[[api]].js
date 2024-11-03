export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    url.host = env.TRACCAR_WEB_HOST
    return fetch(new Request(url, request), cf)
}
