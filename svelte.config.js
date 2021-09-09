import adapter from '@sveltejs/adapter-static';
import slug from 'rehype-slug';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [ '.svelte', '.svx' ],
	preprocess: [ mdsvex({
		rehypePlugins : [slug],
		layout: {
			overviews: './src/lib/layouts/overview.svelte',
			guides: './src/lib/layouts/overview.svelte'
		}
	})],
	kit: {
		adapter: adapter(),
		target: '#svelte'
	}
};

export default config;
