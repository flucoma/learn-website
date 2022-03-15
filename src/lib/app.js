import { readable, writable } from 'svelte/store';
import FuzzySearch from 'fuzzy-search';

import t from '../../static/tag.json';
import c from '../../static/crumbs.json';
import e from '../../static/edits.json';
import s from '../../static/structure.json';
import database from '../../static/db.json';
import commissions from '../../static/www-data/commissions.json';
import made_with from '../../static/www-data/made-with.json';

// interface state
export const nav_expanded = writable(false);
export const blur = writable(false);

export const tags = readable(t);
export const breadcrumbs = readable(c);
export const edits = readable(e);
export const structure = readable(s);

const installs = [
	{
		title : 'Max Installation',
		tags : [ 'install', 'max' ],
		blurb: 'Instructions to install the Max FluCoMa Package',
		url : '/installation/max'
	},
	{
		title : 'SuperCollider Installation',
		tags : [ 'install', 'supercollider' ],
		blurb: 'Instructions to install the SuperCollider FluCoMa Package',
		url : '/installation/sc',
	},
	{
		title : 'PureData Installation',
		tags : [ 'install', 'pd', 'puredata' ],
		blurb: 'Instructions to install the PureData FluCoMa Package',
		url : '/installation/pd',
	},
]

const docs = database.docs;
installs.forEach((i) => docs.push(i)); // add installation steps

const search = new FuzzySearch(docs, ['title', 'tags', 'flair', 'artist', 'blurb'], {
	caseSensitive: false,
	sort: true
});

const madewithdata = {}
madewithdata["commissions"] = commissions
madewithdata["pieces"] = made_with["music"]
madewithdata["software"] = made_with["software"]

const db = search;
export { db, docs, madewithdata };
