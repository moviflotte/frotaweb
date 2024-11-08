/// <reference types="@sveltejs/kit" />
import { version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

self.addEventListener('activate', (event) => {
    // Remove previous cached data from disk
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== CACHE) await caches.delete(key);
        }
    }
    event.waitUntil(deleteOldCaches());
});
