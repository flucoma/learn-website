import { readable } from 'svelte/store';
import s from '../../static/structure.json';
import t from '../../static/tag.json';
import c from '../../static/crumbs.json';
import e from '../../static/edits.json';

export const structure = readable(s);
export const tags = readable(t);
export const edits = readable(e);