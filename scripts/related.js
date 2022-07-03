import glob from 'glob';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import frontmatter from 'front-matter';
import { urlFromRoute } from './util.js';
import markdownLinkExtractor from 'markdown-link-extractor';

let related = {};

const add = (key, reference) => {
	if (!(related[key] instanceof Array)) {
		related[key] = [reference];
	} else {
		related[key].push(reference);
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

		links.forEach(link => {
			const length = link.split('/').filter(x => x != '').length; // filter out index.svx type situations
			link = link.split('#')[0];
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


});
