import {goto} from "$app/navigation";
export const ssr = false
export const load = async (event) => {
    try {
        const response = await event.fetch('/api/session');
        if (response.ok) {
            const body = new URLSearchParams();
            body.append('expiration', new Date(new Date().getTime()+1000*60*60*24).toISOString());
            const token = await fetch('/api/session/token',
                {method: 'post', body, headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                .then(r => r.text())
            return {session: await response.json(), token};
        } else if (!window.location.href.endsWith('session/openid/auth')) {
            await goto('/login')
        }
    } catch (e) {
        alert(e.message)
        console.error(e)
    }
};
