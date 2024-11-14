<script>
    import {page} from "$app/stores";
    import {derived} from 'svelte/store';
    import {onMount} from "svelte";
    let { children } = $props();
    let iframe;

    const pathname = derived(page, (_page) => _page.url.pathname);

    onMount(() =>
        pathname.subscribe(_path => {
            const path = _path.replace('/map', '/')
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({type: 'navigate', path}, '*')
            }
        })
    )

</script>
<iframe bind:this={iframe} style="width: 100%; height: 100%" title="map" src="{window.location.pathname.replace('/map', '/traccar')}">
</iframe>
{@render children()}
