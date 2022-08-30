const fg = require('fast-glob')
const frontmatter = require('front-matter');
const { markdown } = require('markdown');
const fs = require('fs');

const categories = ['Decompose', 'Analyse Sound', 'Analyse Data', 'Utility', 'Transform', 'Slicing'];
const ignores = [
	'src/routes/reference/+page.svx',
	'src/routes/explore/+page.svx',
	'src/routes/learn/+page.svx',
	'src/routes/+page.svx',
	'src/routes/installation/+page.svx'
];
const routes = fg.sync(['src/routes/(learn|reference|explore)/**/*+page.svx'])
.filter(route => !ignores.includes(route));

routes.forEach(route => {
	const section = route.split('/')[2];
 	const data = fs.readFileSync(route, 'utf8');
	const tree = markdown.parse(data);
	
	const fm = frontmatter(data).attributes;

	test('frontmatter has necessary structure', () => {
		expect(fm).toHaveProperty('title');
		expect(fm).toHaveProperty('blurb');
		expect(fm).toHaveProperty('tags');
		expect(fm).toHaveProperty('flair');
	})
	test('title is valid', () => {
		expect(typeof fm.title).toBe('string')
	})
	test('array of tags supplied', () => {
		expect(typeof fm.tags).toBe('object')
		expect(fm.tags.length).toBeGreaterThan(0);
	})
	test('flair is valid', () => {
		const flair = fm.flair;
		expect(flair).toMatch(new RegExp('reference|article|podcast|event|tutorial'))
	})

	if (section === 'reference') {
		test('reference frontmatter', () => {
			expect(fm).toHaveProperty('category');
			expect(categories).toContain(fm.category);
		})
	}

	const headers = tree.filter(x => x.includes('header'));
	const h1 = headers.filter(x => x[1].level === 1)

	test(`No <h1/> (#) defined in markdown ${route}`, () => {
		expect(h1.length).toEqual(0);
	})

	test(`related resources is <h2/> ${route}`, () => {
		const relatedResources = headers.filter(x => x[2] === 'Related Resources')
		relatedResources.forEach(x => {
			expect(x[1].level).toEqual(2);
		})
	})
})



