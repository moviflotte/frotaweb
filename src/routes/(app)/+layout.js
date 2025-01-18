import {goto} from "$app/navigation";
export const ssr = false
export const load = async (event) => {
    const response = await event.fetch('/api/session');
    if (response.ok) {
        return {session: await response.json()};
    } else if (!window.location.href.endsWith('session/openid/auth')) {
        await goto('/login')
    }
};
