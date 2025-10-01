export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    const from = new Date(url.searchParams.get('from'))
    const oldest = new Date()
    oldest.setMonth(oldest.getMonth() - parseInt(env.DATABASE_RETENTION_MONTHS || '2'))
    const forward = url.searchParams.get('from') && from < oldest
    url.host = forward ? (env.TRACCAR_REPORTS_SERVER || 'aadobrygc6wsyawaleatkimjjm0cczwu.lambda-url.us-east-1.on.aws') : env.TRACCAR_SERVER
    url.protocol = forward ? 'https:' : 'http:'
    url.port = forward ? 443 : 80
    return fetch(new Request(url, request), cf)
}
