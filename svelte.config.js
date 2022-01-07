import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import { h } from 'hastscript';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: [
		preprocess(),
		mdsvex({
			rehypePlugins: [
				slug, 
				[
					headings,
					{
						behavior: 'append',
						test: ['h2', 'h3', 'h4', 'h5', 'h6'], // don't auto-link <h1>
						content: h('img', { 
							src: '/img/onlylogo.svg',
							class: 'autolink'
						}),
						// <img class="logo" src="/img/onlylogo.svg" alt="FluCoMa Logo" loading="lazy" />
					  },
				]
			],
			layout: {
				overviews: './src/lib/layouts/overviews.svelte',
				reference: './src/lib/layouts/reference.svelte',
				madewithflucoma: './src/lib/layouts/madewithflucoma.svelte'
			}
		})
	],
	kit: {
		adapter: adapter(),
		target: '#svelte'
	}
};

export default config;
