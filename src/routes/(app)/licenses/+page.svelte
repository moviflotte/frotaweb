<script>
    let url = $state('')
    fetch('/quicksight').then(r => r.text()).then(r => (url = r))
</script>
<iframe style="width: 100%; height: 100%" class="bg-white" title="licenses"
        src="{url}">
</iframe>

