import { readable } from 'svelte/store';
import { stemmer } from 'stemmer';
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

// let search = new JsSearch.Search('tags');
// search.tokenizer = new JsSearch.StemmingTokenizer(stemmer, new JsSearch.SimpleTokenizer());
// search.searchIndex = new JsSearch.TfIdfSearchIndex();
// search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();

// search.addIndex('title');
// search.addIndex('blurb');
// search.addIndex('tags');
// search.addIndex('flair');
// search.addDocuments(database.docs);

import FuzzySearch from 'fuzzy-search';

const docs = database.docs;

const search = new FuzzySearch(docs, ['title', 'tags', 'flair'], {
    caseSensitive: false
});

export const db = search;


