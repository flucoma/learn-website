import markdownLinkExtractor from 'markdown-link-extractor';
import glob from 'glob';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import GithubSlugger from 'github-slugger';
import frontmatter from 'front-matter';
import { markdown } from 'markdown';
import { extractGit } from './git.js';
import { urlFromRoute, spill_to_array, get_components } from './util.js';

const slugger = new GithubSlugger();

let structure = {};
let tags = {};
let crumbs = {};
let edits = {};
let related = {};
let featured = {
	reference: {},
	learn: {},
	explore: {}
};
let db = [];

const add = (key, reference) => {
	if (!(related[key] instanceof Array)) {
		related[key] = [reference];
	} else {
		related[key].push(reference);
	}
};

glob('src/routes/*(reference|learn|explore|installation)/*.svx', (err, routes) => {
	routes = routes.filter(p => path.basename(p) !== 'index.svx');
	edits = extractGit(routes);

	routes.forEach(route => {
		const section = route.split('/')[2];
		let url = urlFromRoute(route);

		// Read the page in as a string
		const data = fs.readFileSync(route, 'utf8');

		// Get frontmatter
		let fm = frontmatter(data).attributes;
		fm.url = url;
		fm.section = section;

		// Parse the markdown tree for the headings
		let tree = markdown.parse(data);
		if (!Object.keys(structure).includes(url)) {
			structure[url] = [];
		}

		tree.forEach(el => {
			if (el[0] === 'header' && el[1].level === 2) {
				const rawText = el.slice(2);

				const text = rawText
					.flat()
					.filter(x => !x.includes('em'))
					.filter(x => x !== 'inlinecode')
					.join('');

				slugger.reset();
				let hashPart = slugger.slug(text);

				structure[url].push({
					url: `${url}#${hashPart}`,
					text: text
				});
			}
		});

		// Tags
		if (Object.keys(fm).includes('tags')) {
			fm.tags.forEach(tag => {
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
				case 'explore':
					crumbs[url] = fm.artist;
					break;
				case 'guides':
					crumbs[url] = fm.short;
					break;
				case 'learn':
					crumbs[url] = fm.title;
					break;
				case 'installation':
					crumbs[url] = fm.title;
					break;
			}
		}

		// Database
		let feature_info = {
			featuredimage: '',
			images: [],
			video: [],
			youtube: [],
			vimeo: []
		};

		let component_dict = get_components(frontmatter(data).body, ['Image', 'Video', 'YouTube', 'Vimeo']);

		// These wouldn't necessarily have to be spilled to arrays
		feature_info.images = spill_to_array(component_dict.Image, 'src');
		feature_info.video = spill_to_array(component_dict.Video, 'url');
		feature_info.youtube = spill_to_array(component_dict.YouTube, 'url');
		feature_info.vimeo = spill_to_array(component_dict.Vimeo, 'src');

		if (Object.keys(fm).includes('featuredimage')) {
			feature_info['featuredimage'] = fm.featuredimage;
		} else {
			if (component_dict.Image.length != 0) {
				feature_info['featuredimage'] =
					component_dict.Image[Math.floor(Math.random() * component_dict.Image.length)].src;
			}
		}

		fm.feature = feature_info;
		db.push(fm);

		// Related Links
		let links = markdownLinkExtractor(data, false)
			.filter(x => x.startsWith('/'))
			.filter(x => path.extname(x) === '');

		links = [...new Set(links)];

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

	// De-duplicate Related Links
	for (const key in related) {
		related[key] = _.uniqWith(related[key], _.isEqual);
	}

	let preprocData = {
		tags: tags,
		structure: structure,
		crumbs: crumbs,
		edits: edits,
		db: db,
		related: related
	};
	// Write out results
	fs.writeFile('src/lib/data/metadata.json', JSON.stringify(preprocData, null, 0), 'utf8', () => {});
});
