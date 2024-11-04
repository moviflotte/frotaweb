<script>
    import config from 'tailwindcss/defaultTheme';
    if (!window.matchMedia(`(min-width: ${config.screens.md})`).matches) {
        window.location = '/map'
    }
</script>
<iframe style="width: 100%; height: 100%" class="bg-white" title="dashboard"
        src="/dash">
</iframe>
