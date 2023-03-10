import markdownLinkExtractor from 'markdown-link-extractor';
import fg from 'fast-glob';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import GithubSlugger from 'github-slugger';
import frontmatter from 'front-matter';
import { markdown } from 'markdown';
import { urlFromRoute, spillToArray, getComponents } from './util.js';

const slugger = new GithubSlugger();

let structure = {};
let tags = {};
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

const ignores = [
	'src/routes/reference/+page.svx',
	'src/routes/explore/+page.svx',
	'src/routes/learn/+page.svx',
	'src/routes/+page.svx'
];
let routes = fg.sync(['**/*+page.svx']);
routes = routes.filter(route => !ignores.includes(route));

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

	// iterate over the tree and find headers for ToC
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

	// Database
	let featureInfo = {
		featuredimage: '',
		images: [],
		video: [],
		youtube: [],
		vimeo: []
	};

	let componentDict = getComponents(frontmatter(data).body, ['Image', 'Video', 'YouTube', 'Vimeo']);

	// These wouldn't necessarily have to be spilled to arrays
	featureInfo.images = spillToArray(componentDict.Image, 'src');
	featureInfo.video = spillToArray(componentDict.Video, 'url');
	featureInfo.youtube = spillToArray(componentDict.YouTube, 'url');
	featureInfo.vimeo = spillToArray(componentDict.Vimeo, 'src');

	if (Object.keys(fm).includes('featuredimage')) {
		featureInfo['featuredimage'] = fm.featuredimage;
	} else {
		if (componentDict.Image.length != 0) {
			featureInfo['featuredimage'] =
				componentDict.Image[Math.floor(Math.random() * componentDict.Image.length)].src;
		}
	}

	fm.feature = featureInfo;
	db.push(fm);

	// // Related Links
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
			const branch = fs.readFileSync(`src/routes${link}/+page.svx`, 'utf8');
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
	db: db,
	related: related
};
// Write out results
fs.writeFile('src/lib/data/metadata.json', JSON.stringify(preprocData, null, 0), 'utf8', () => {});
