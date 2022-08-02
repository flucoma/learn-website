import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import { s } from 'hastscript';
import { mdsvex } from 'mdsvex';
import jargon from 'remark-jargon';
import { definitions }  from './jargon.js';


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
						properties: {
							target: '_self'
						},
						test: ['h2', 'h3', 'h4', 'h5', 'h6'], // don't auto-link <h1>
						content: s(
							'svg .autolink',
							{
								xmlns: 'http://www.w3.org/2000/svg',
								height: '16px',
								viewbox: '0 0 24 24',
								fill: '#000000'
							},
							[
								s('path', {
									d: 'M0 0h24v24H0z',
									fill: 'none'
								}),
								s('path', {
									d: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z'
								})
							]
						)
					}
				]
			],
			remarkPlugins: [[ jargon, { jargon: definitions } ]],
			layout: {
				_: './src/lib/layouts/Content.svelte',
				contentindex: './src/lib/layouts/ContentIndex.svelte'
			}
		})
	],
	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		trailingSlash: 'always'
	}
};

export default config;
