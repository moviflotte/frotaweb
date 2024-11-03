export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    url.host = env.DASHBOARD_HOST
    return fetch(new Request(url, request), cf)
}
