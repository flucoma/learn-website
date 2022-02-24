import { readable } from 'svelte/store';
import FuzzySearch from 'fuzzy-search';

import t from '../../static/tag.json';
import c from '../../static/crumbs.json';
import e from '../../static/edits.json';
import s from '../../static/structure.json';
import database from '../../static/db.json';
import f from '../../static/featured.json';

export const tags = readable(t);
export const breadcrumbs = readable(c);
export const edits = readable(e);
export const structure = readable(s);

const docs = database.docs;
const featured = f;

const search = new FuzzySearch(docs, ['title', 'tags', 'flair', 'artist', 'blurb'], {
	caseSensitive: false,
	sort: true
});

const db = search;
export { db, docs, featured };
