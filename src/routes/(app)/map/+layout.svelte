<script>
    import {page} from "$app/stores";
    import {derived} from 'svelte/store';
    import {onMount} from "svelte";
    let { children } = $props();
    let iframeRef;

    const pathname = derived(page, ($page) => $page.url.pathname);

    onMount(() => {
        pathname.subscribe((_path) => {
            const path = _path.replace('/map', '/')
            console.log(_path, path)
            if (iframeRef && iframeRef.contentWindow) {
                iframeRef.contentWindow.postMessage({type: 'navigate', path}, '*');
            } else {
                console.warn("iframeRef is not yet initialized.", iframeRef);
            }
        })
    })

</script>
<iframe bind:this={iframeRef} style="width: 100%; height: 100%" title="map" src="{window.location.pathname.replace('/map', '/traccar')}">
</iframe>
{@render children()}
