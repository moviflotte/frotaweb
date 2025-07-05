export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    url.host = 'aadobrygc6wsyawaleatkimjjm0cczwu.lambda-url.us-east-1.on.aws'
    url.pathname.replace('athena', 'route')
    return fetch(new Request(url, request), cf)
}
