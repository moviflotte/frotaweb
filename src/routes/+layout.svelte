<script>
    let title = '', favicon = ''
    fetch(`https://raw.githubusercontent.com/rastreosat/rastreosat.github.io/refs/heads/main/${window.location.hostname}/info.json`).then(r => {
        if (r.ok) {
            r.json().then(j => {
                title = j.title
                favicon = j.favicon
            })
        }
    })
    import { pwaInfo } from 'virtual:pwa-info';

    $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
    {@html webManifestLink}
    <title>{title}
    </title>
    <link rel="icon" href="{favicon}"/>
</svelte:head>

<slot></slot>
