import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps: {
		include: ['tone']
	},
	server: {
		fs: {
			allow: ['../']
		}
	},
	build: {
		commonjsOptions: {
			include: [/tone/, /node_modules/]
		}
	}
};

export default config;
