import { readable, writable } from 'svelte/store';
import FuzzySearch from 'fuzzy-search';

import metadata from '../../static/meta/metadata.json';
import config from '../../static/meta/config.json';

// interface state
const nav_expanded = writable(false);
const blur = writable(false);

const installs = [
	{
		title: 'Max Installation',
		tags: ['install', 'max'],
		blurb: 'Instructions to install the Max FluCoMa Package',
		url: '/installation/max'
	},
	{
		title: 'SuperCollider Installation',
		tags: ['install', 'supercollider'],
		blurb: 'Instructions to install the SuperCollider FluCoMa Package',
		url: '/installation/sc'
	},
	{
		title: 'PureData Installation',
		tags: ['install', 'pd', 'puredata'],
		blurb: 'Instructions to install the PureData FluCoMa Package',
		url: '/installation/pd'
	}
];

installs.forEach(i => metadata.db.push(i)); // add installation steps

const search = new FuzzySearch(metadata.db, ['title', 'tags', 'flair', 'artist', 'blurb'], {
	caseSensitive: false,
	sort: true
});

const edits = metadata.edits;
const structure = metadata.structure;
const db = metadata.db;
const crumbs = metadata.crumbs;
const related = metadata.related;

export { crumbs, structure, db, related, edits, search, config, nav_expanded, blur };
