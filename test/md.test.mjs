import fg from 'fast-glob'
import frontmatter from 'front-matter'
import { markdown } from 'markdown';
import fs from 'fs'
import test from 'node:test';
import assert from 'node:assert';
import fetch from 'node-fetch';


const ignores = [
	'src/routes/(content)/reference/+page.svx',
	'src/routes/(content)/explore/+page.svx',
	'src/routes/(content)/learn/+page.svx',
	'src/routes/(content)/+page.svx',
	'src/routes/(content)/installation/+page.svx'
];

const pattern = 'src/routes/\\(content\\)/**/*.svx';

const routes = fg.sync(pattern)
	.filter(route => !ignores.includes(route));

routes.forEach(route => {
	const data = fs.readFileSync(route, 'utf8');
	const tree = markdown.parse(data);

	const fm = frontmatter(data).attributes;

	test(`${route} frontmatter has necessary structure`, () => {

		assert.equal(true, fm.hasOwnProperty('title'));
		assert.equal(true, fm.hasOwnProperty('blurb'));
		assert.equal(true, fm.hasOwnProperty('tags'));
		assert.equal(true, fm.hasOwnProperty('flair'));
	});
	test(`${route} title is valid`, () => {
		assert.strictEqual('string', typeof fm.title)
	});
	test(`${route} array of tags supplied`, () => {
		assert.strictEqual('object', typeof fm.tags)
		assert.strictEqual(true, fm.tags.length > 0)
	});
	test(`${route} flair is valid`, () => {
		const flair = fm.flair;
		assert.match(flair, new RegExp('reference|article|podcast|event|tutorial'))
	});

	test(`${route} podcast structure is correct`, async() => {
		if (fm.flair === 'podcast') {
			assert.strictEqual(true, fm.hasOwnProperty('day'))
			assert.strictEqual(true, fm.hasOwnProperty('month'))
			assert.strictEqual(true, fm.hasOwnProperty('year'))
			assert.strictEqual(true, fm.hasOwnProperty('youtube'))
			assert.strictEqual(true, fm.hasOwnProperty('artist'))

			// and that there is a relevant backblaze asset to accompay, OTHERWISE FAIL
			const backblazePrefix = 'https://f003.backblazeb2.com/file/flucoma-podcasts';
			const parentFolder = route.split('/')[4];
			const params = { method: "HEAD" };
			const response = await fetch(`${backblazePrefix}/${parentFolder}.mp3`, params);
			console.log(route)
			assert.strictEqual(200, response.status)
		}
	})

	const headers = tree.filter(x => x.includes('header'));
	const h1 = headers.filter(x => x[1].level === 1);

	test(`${route} No <h1/> (#) defined in markdown ${route}`, () => {
		assert.strictEqual(0, h1.length)
	});

	test(`${route} related resources is <h2/>`, () => {
		const relatedResources = headers.filter(x => x[2] === 'Related Resources');
		relatedResources.forEach(x => {
			assert.strictEqual(2, x[1].level)
		});
	});
});
