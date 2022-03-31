import glob from 'glob';
import path from 'path';
import fs from 'fs';
import frontmatter from 'front-matter';
import { urlFromRoute } from './util.js';
import markdownLinkExtractor from 'markdown-link-extractor';

let db = {};

glob('src/routes/*(reference|learn|explore)/*.svx', (err, routes) => {
	routes = routes.filter((p) => path.basename(p) !== 'index.svx');

	routes.forEach((route) => {
		const section = route.split('/')[2];

		const url = urlFromRoute(route);
		// Read the page in as a string
		const data = fs.readFileSync(route, 'utf8');
		let links = markdownLinkExtractor(data, false);
		links = links.filter(x => x.startsWith('/'));
		links = [...new Set(links)];

		let fm = frontmatter(data).attributes;

		let payload = [];

		links.forEach(link => {
			const length = link.split('/').filter(x => x != '').length; // filter out index.svx type situations
			if (length > 1 && link !== url) {
				const branchUrl = `src/routes${link}.svx`;
				const branch = fs.readFileSync(branchUrl, 'utf8');
				const branchFm = frontmatter(branch).attributes;
				payload.push({
					title: branchFm.title,
					url: link,
					flair: branchFm.flair,
					blurb: branchFm.blurb
				})
			}
		})

		db[url] = payload
	});

	// Write out results
	fs.writeFile('static/related.json', JSON.stringify(db), 'utf8', () => {
		console.log('Relationships file written to static/related.json')
	});
});
