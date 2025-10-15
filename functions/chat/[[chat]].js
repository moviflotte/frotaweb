export const onRequest = ({request}, cf) => {
    const url = new URL(request.url)
    url.host = 'traccar-chatkit.pages.dev'
    url.port = 443
    url.protocol = 'https:'
    return fetch(new Request(url, request), cf)
}
