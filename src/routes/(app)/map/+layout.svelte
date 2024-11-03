<script>
    import {page} from "$app/stores";
    let { children } = $props();
</script>
<iframe style="width: 100%; height: 100%" title="map" src="{$page.url.pathname.replace('/map', '/traccar')}">
</iframe>
{@render children()}
