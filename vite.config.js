import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { sentrySvelteKit } from "@sentry/sveltekit";

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA(),
		sentrySvelteKit({
			authToken: process.env.SENTRY_AUTH_TOKEN,
			org: "rastreosat",
			project: "frotaweb",
		}),
	],
	server: {
		proxy: {
			'/traccar-cesium': 'https://jcardus.github.io',
			'/dash': 'https://frotaweb-dash.pages.dev',
			'/reports': 'https://traccar-reports.pages.dev',
			'/traccar': 'https://frotaweb-traccar.pages.dev',
			'/api/socket': 'ws://gps.rastreosat.com.br',
			'/api': 'http://gps.rastreosat.com.br',
		},
	},
});
