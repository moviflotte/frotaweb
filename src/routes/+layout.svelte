<script>
    let title = ''
    fetch(`https://raw.githubusercontent.com/rastreosat/rastreosat.github.io/refs/heads/main/${window.location.hostname}/info.json`).then(r => {
        if (r.ok) {
            r.json().then(j => title = j.title)
        }
    })
</script>

<svelte:head>
    <title>{title}
    </title>
</svelte:head>

<slot></slot>
