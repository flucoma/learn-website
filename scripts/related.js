import glob from 'glob';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import frontmatter from 'front-matter';
import { urlFromRoute } from './util.js';
import markdownLinkExtractor from 'markdown-link-extractor';

let db = {};

const add = (key, reference) => {
	if (!(db[key] instanceof Array)) {
		db[key] = [reference];
	} else {
		db[key].push(reference);
	}
};

glob('src/routes/*(reference|learn|explore)/*.svx', (err, routes) => {
	routes = routes.filter(p => path.basename(p) !== 'index.svx');

	routes.forEach(route => {
		const section = route.split('/')[2];

		const url = urlFromRoute(route);
		// Read the page in as a string
		const data = fs.readFileSync(route, 'utf8');
		let links = markdownLinkExtractor(data, false);
		links = links.filter(x => x.startsWith('/'));
		links = [...new Set(links)];

		let fm = frontmatter(data).attributes;
		let backreference = {
			title: fm.title,
			flair: fm.flair,
			blurb: fm.blurb,
			url: url
		};

		let payload = [];
		links.forEach(link => {
			const length = link.split('/').filter(x => x != '').length; // filter out index.svx type situations
			link = link.split('#')[0]
			if (length > 1 && link !== url) {
				add(link, backreference);
				const branch = fs.readFileSync(`src/routes${link}.svx`, 'utf8');
				const branchfm = frontmatter(branch).attributes;
				const fwdreference = {
					title: branchfm.title,
					flair: branchfm.flair,
					blurb: branchfm.blurb,
					url: link
				};
				add(url, fwdreference);
			}
		});
	});

	// De-duplicate arrays
	for (const key in db) {
		db[key] = _.uniqWith(db[key], _.isEqual);
	}
	// Write out results
	fs.writeFile('static/related.json', JSON.stringify(db), 'utf8', () => {
		console.log('Relationships file written to static/related.json');
	});
});
