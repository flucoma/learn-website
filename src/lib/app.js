import { readable, writable } from 'svelte/store';
import FuzzySearch from 'fuzzy-search';

import t from '$lib/data/tag.json';
import c from '$lib/data/crumbs.json';
import e from '$lib/data/edits.json';
import s from '$lib/data/structure.json';
import database from '$lib/data/db.json';
import manual from '$lib/data/manual_config.json';

// interface state
export const nav_expanded = writable(false);
export const blur = writable(false);

export const tags = readable(t);
export const breadcrumbs = readable(c);
export const edits = readable(e);
export const structure = readable(s);

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

const docs = database.docs;
installs.forEach(i => docs.push(i)); // add installation steps

const manual_config = manual;
const search = new FuzzySearch(docs, ['title', 'tags', 'flair', 'artist', 'blurb'], {
	caseSensitive: false,
	sort: true
});

const db = search;
export { db, docs, manual_config };
