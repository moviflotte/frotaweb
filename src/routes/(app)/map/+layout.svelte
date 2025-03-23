<script>
    import {page} from "$app/stores";
    import {derived} from 'svelte/store';
    import {onMount} from "svelte";
    import {headerClicked} from "../../../lib/store.js";
    let { children } = $props();
    let iframe;

    const pathname = derived(page, (_page) => _page.url.pathname);

    onMount(() => {
            const pathChanged = _path => {
                if (!_path) { return }
                const path = _path.replace('/map', '/')
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage({type: 'navigate', path}, '*')
                }
            }
            pathname.subscribe(pathChanged)
            headerClicked.subscribe(pathChanged)
        }
    )
    console.log('listening events')
    window.addEventListener("message", (event) => {
        console.log('received', event)
        if (event.data.type === "openUrl") {
            window.location = event.data.url
        }
    });

</script>
<iframe bind:this={iframe} style="width: 100%; height: 100%" title="map" src="{window.location.pathname.replace('/map', '/traccar')+window.location.search}">
</iframe>
{@render children()}
