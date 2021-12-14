import { readable } from 'svelte/store';
import FuzzySearch from 'fuzzy-search';
import i from '../../static/info.json';
import t from '../../static/tag.json';
import c from '../../static/crumbs.json';
import e from '../../static/edits.json';
import s from '../../static/structure.json';
import database from '../../static/db.json';

export const info = readable(i);
export const tags = readable(t);
export const breadcrumbs = readable(c);
export const edits = readable(e);
export const structure = readable(s);


const docs = database.docs;

const search = new FuzzySearch(
    docs, 
    ['title', 'tags', 'flair', 'artist', 'blurb'], 
    {caseSensitive: false}
);

export const db = search;


