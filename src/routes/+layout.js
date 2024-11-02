export const load = async (event) => {
    const response = await event.fetch('/api/session');
    if (response.ok) {
        return {session: await response.json()};
    }
};
