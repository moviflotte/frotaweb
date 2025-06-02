<script>
    import {onMount} from "svelte";
    import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
    const {data} = $props()
    onMount(async () => {
        const frameOptions = {
            url: await fetch('/quicksight').then(r => r.text()),
            container: '#quicksight',
            resizeHeightOnSizeChangedEvent: true,
        }
        console.log(data.session.id)
        const contentOptions = {
            parameters: [{Name: 'userId', Values: [data.session && data.session.id]}],
            locale: navigator.language,
        }
        const embeddingContext = await createEmbeddingContext()
        console.log(await embeddingContext.embedDashboard(frameOptions, contentOptions))
    })
</script>
<div id="quicksight" class="h-full"></div>

