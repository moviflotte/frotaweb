export const onRequest = ({request}) => {
    const url = new URL(request.url);
    url.pathname = "/traccar" + url.pathname;
    return Response.redirect(url.toString(), 302);
}
