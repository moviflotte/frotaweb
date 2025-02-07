<!-- src/routes/+layout.svelte -->
<script>
  import { pwaInfo } from 'virtual:pwa-info'; 

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '' 
</script> 
  
<svelte:head> 
 	{@html webManifestLink} 
</svelte:head>

{@render children()}
