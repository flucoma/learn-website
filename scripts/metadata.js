import glob from 'glob';
import path from 'path';
import fs from 'fs';
import GithubSlugger from 'github-slugger';
import frontmatter from 'front-matter';
import { extractGit } from './git.js';
import { urlFromRoute } from './util.js';
import { markdown } from 'markdown';

const slugger = new GithubSlugger();

let info = {};
let structure = {};
let tags = {};
let crumbs = {};
let edits = {};

glob('src/**/*.svx', (err, routes) => {
	routes = routes.filter((p) => path.basename(p) !== 'index.svx');
	edits = extractGit(routes);

	routes.forEach((route) => {
		let section = route.split('/')[2];

		let url = urlFromRoute(route);

		// Read the page in as a string
		let data = fs.readFileSync(route, 'utf8');

		// Parse the markdown tree for the headings
		let tree = markdown.parse(data);
		if (!Object.keys(structure).includes(url)) {
			structure[url] = [];
		}

		tree.forEach((el) => {
			
			if (el[0] === 'header' && el[1].level === 2) {
				const rawText = el[2];

				const text = rawText
					.flat()
					.filter(x => !x.includes('em'))
					.join('')

				slugger.reset();
				let hashPart = slugger.slug(text);
				
				structure[url].push({
					url: `${url}#${hashPart}`,
					text: el[2]
				});
			}
		});

		// Get frontmatter
		let fm = frontmatter(data).attributes;

		if (!Object.keys(info).includes(section)) {
			info[section] = [];
		}
		// Structure
		info[section].push({
			url: url,
			data: fm
		});

		// Tags
		if (Object.keys(fm).includes('tags')) {
			fm.tags.forEach((tag) => {
				if (!Object.keys(tags).includes(tag)) {
					tags[tag] = [];
				}
				tags[tag].push(url);
			});
		}

		// Crumbs
		if (fm.crumb) {
			crumbs[url] = fm.crumb;
		} else {
			switch (section) {
				case 'reference':
					crumbs[url] = fm.title;
					break;
				case 'madewithflucoma':
					crumbs[url] = fm.artist;
					break;
				case 'guides':
					crumbs[url] = fm.short;
					break;
				case 'overviews':
					crumbs[url] = fm.title;
					break;
				case 'installation':
					crumbs[url] = fm.title;
					break;
			}
		}
	});

	// Write out results
	fs.writeFile('static/tag.json', JSON.stringify(tags), 'utf8', () => {});
	fs.writeFile('static/info.json', JSON.stringify(info), 'utf8', () => {});
	fs.writeFile('static/structure.json', JSON.stringify(structure), 'utf8', () => {});
	fs.writeFile('static/crumbs.json', JSON.stringify(crumbs), 'utf8', () => {});
	fs.writeFile('static/edits.json', JSON.stringify(edits), 'utf8', () => {});
});
