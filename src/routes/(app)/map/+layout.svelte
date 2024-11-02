<script>
    import { dev } from '$app/environment';
    import {page} from "$app/stores";
</script>
<iframe style="width: 100%; height: 100%" title="map"
        src="{dev?'http://localhost:3000':''}{$page.url.pathname.replace('/main', '')}">
</iframe>
