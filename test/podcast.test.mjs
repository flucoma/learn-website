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

const pattern = 'src/routes/\\(content\\)/explore/**/*.svx';

const routes = fg.sync(pattern)
	.filter(route => !ignores.includes(route));

routes.forEach(route => {
	const data = fs.readFileSync(route, 'utf8');
	const fm = frontmatter(data).attributes;

	const printedRoute = route.split('/').slice(-3)[1];

	test(`${printedRoute} podcast frontmatter has day`, async() => {
		assert.strictEqual(true, fm.hasOwnProperty('day'))
	})

	test(`${printedRoute} podcast frontmatter has month`, async() => {
		assert.strictEqual(true, fm.hasOwnProperty('month'))
	})

	test(`${printedRoute} podcast frontmatter has year`, async() => {
		assert.strictEqual(true, fm.hasOwnProperty('year'))
	})

	test(`${printedRoute} podcast frontmatter has youtube`, async() => {
		assert.strictEqual(true, fm.hasOwnProperty('youtube'))
	})

	test(`${printedRoute} podcast frontmatter has artist`, async() => {
		assert.strictEqual(true, fm.hasOwnProperty('artist'))
	})

	test(`${printedRoute} has mp3 version of podcast`, async() => {
		// and that there is a relevant backblaze asset to accompay, OTHERWISE FAIL
		const backblazePrefix = 'https://f003.backblazeb2.com/file/flucoma-podcasts';
		const parentFolder = route.split('/')[4];
		const params = { method: "HEAD" };
		const response = await fetch(`${backblazePrefix}/${parentFolder}.mp3`, params);
		assert.strictEqual(200, response.status)
	})

	if (fm.day || fm.month || fm.year || fm.youtube) {
		test(`${route} has podcast frontmatter and has podcast flair`, () => {
			assert.strictEqual('podcast', fm.flair)
		})
	}
});
