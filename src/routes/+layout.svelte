<script>
  import { pwaInfo } from 'virtual:pwa-info'; 

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '' 
  let { children } = $props();
</script> 
  
<svelte:head> 
 	{@html webManifestLink} 
</svelte:head>

{@render children()}
