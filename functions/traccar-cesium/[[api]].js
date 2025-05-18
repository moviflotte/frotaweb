export const onRequest = ({request}, cf) => {
    const url = new URL(request.url)
    url.host = 'jcardus.github.io'
    return fetch(new Request(url, request), cf)
}
