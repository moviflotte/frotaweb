export const onRequest = ({request, env}, cf) => {
    const url = new URL(request.url)
    const from = url.searchParams.get('from')
    console.log('from query parameter:', from)
    if (from) {
        const fromDate = new Date(from)
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

        if (fromDate < threeMonthsAgo) {
            console.log('from date is older than 3 months')
        } else {
            console.log('from date is within the last 3 months')
        }
    }
    url.host = env.TRACCAR_SERVER
    url.protocol = 'http:'
    url.port = 80
    return fetch(new Request(url, request), cf)
}
