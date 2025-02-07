<script>
  import { pwaInfo } from 'virtual:pwa-info'; 

  let webManifestLink = $state(pwaInfo ? pwaInfo.webManifest.linkTag : '') 
  let { children } = $props();
</script> 
  
<svelte:head> 
 	{@html webManifestLink} 
</svelte:head>

{@render children()}
