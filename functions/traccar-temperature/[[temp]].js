export const onRequest = ({request}, cf) => {
    const url = new URL(request.url)
    url.host = 'jcardus.github.io'
    url.port = 443
    url.protocol = 'https:'
    return fetch(new Request(url, request), cf)
}
