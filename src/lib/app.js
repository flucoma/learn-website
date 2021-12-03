import { readable } from 'svelte/store';
import i from '../../static/info.json';
import t from '../../static/tag.json';
import c from '../../static/crumbs.json';
import e from '../../static/edits.json';
import s from '../../static/structure.json';

export const info = readable(i);
export const tags = readable(t);
export const breadcrumbs = readable(c);
export const edits = readable(e);
export const structure = readable(s);
