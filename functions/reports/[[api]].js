export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    url.host = 'traccar-reports-5zo.pages.dev'
    return fetch(new Request(url, request), cf)
}
