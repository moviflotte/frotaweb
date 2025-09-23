<script>
    import config from 'tailwindcss/defaultTheme';
    if (!window.matchMedia(`(min-width: ${config.screens.md})`).matches ||
        (window.location.pathname === '/' && new URLSearchParams(window.location.search).has('eventId'))) {
        window.location = '/map' + window.location.search;
    }
</script>
<iframe style="width: 100%; height: 100%" class="bg-white" title="dashboard"
        src="/dash">
</iframe>
