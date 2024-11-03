import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/dash': 'https://frotaweb-dash.pages.dev',
			'/traccar': 'https://frotaweb-traccar.pages.dev',
			'/api/socket': 'ws://gps.rastreosat.com.br',
			'/api': 'http://gps.rastreosat.com.br',
		},
	},
});
