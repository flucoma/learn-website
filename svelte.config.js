import adapter from '@sveltejs/adapter-static';
import slug from 'rehype-slug';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const filePath = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [ '.svelte', '.svx' ],
	preprocess: [ 
		mdsvex({
			rehypePlugins : [slug],
			layout: {
				overviews: './src/lib/layouts/overviews.svelte',
				guides: './src/lib/layouts/overviews.svelte',
				reference: './src/lib/layouts/reference.svelte'
			}
		}),
		sveltePreprocess({
			scss: {
				prependData: `@import '${filePath}/src/app.scss';`
			}
		})
	],
	kit: {
		adapter: adapter(),
		target: '#svelte'
	}
};

export default config;
