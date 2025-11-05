<script>
    const {data} = $props()
</script>

<iframe style="width: 100%; height: 100%" class="bg-white" title="temperature"
        src="/traccar-temperature?token={data.token}">
</iframe>
