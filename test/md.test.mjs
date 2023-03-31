import fg from 'fast-glob'
import frontmatter from 'front-matter'
import { markdown } from 'markdown';
import fs from 'fs'
import test from 'node:test';
import assert from 'node:assert';

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

	test(`${route} frontmatter has title`, () => {
		assert.equal(true, fm.hasOwnProperty('title'));
	});
	test(`${route} frontmatter has blurb`, () => {
		assert.equal(true, fm.hasOwnProperty('blurb'));
	});
	test(`${route} frontmatter has tags`, () => {
		assert.equal(true, fm.hasOwnProperty('tags'));
	});

	test(`${route} frontmatter has flair`, () => {
		assert.equal(true, fm.hasOwnProperty('flair'));
	});
	test(`${route} title is valid`, () => {
		assert.strictEqual('string', typeof fm.title)
	});
	test(`${route} array of tags supplied`, () => {
		assert.strictEqual('object', typeof fm.tags)
		assert.strictEqual(true, fm.tags.length > 0)
	});
	test(`${route} flair is one of (reference|article|podcast|event|tutorial)`, () => {
		const flair = fm.flair;
		assert.match(flair, new RegExp('reference|article|podcast|event|tutorial'))
	});

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
