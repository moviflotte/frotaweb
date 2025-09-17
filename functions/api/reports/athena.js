export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    const from = url.searchParams.get('from')
    console.log('from query parameter:', from)
    url.host = 'aadobrygc6wsyawaleatkimjjm0cczwu.lambda-url.us-east-1.on.aws'
    url.pathname.replace('athena', 'route')
    return fetch(new Request(url, request), cf)
}
