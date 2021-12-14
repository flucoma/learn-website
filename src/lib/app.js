import { readable } from 'svelte/store';
import * as JsSearch from 'js-search';
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

let search = new JsSearch.Search('title');
search.addIndex('title');
search.addIndex('blurb');
search.addIndex('tags');
search.addIndex('url');
search.addDocuments(database.docs);

export const db = search;


