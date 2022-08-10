import { readable, writable } from 'svelte/store';
import metadata from '$lib/data/metadata.json';
import config from '$lib/data/config.json';
import Fuse from 'fuse.js';

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

const edits = metadata.edits;
const structure = metadata.structure;
const db = metadata.db;
const crumbs = metadata.crumbs;
const related = metadata.related;

const fuse = new Fuse(db, {
	keys: [
		{ name: 'title', weight: 1.0 },
		{ name: 'artist', weight: 0.8 },
		{ name: 'blurb', weight: 0.4 },
		{ name: 'tags', weight: 0.4 },
		{ name: 'author', weight: 0.2 }
	]
});

export { crumbs, structure, db, related, edits, fuse, config, nav_expanded, blur };
