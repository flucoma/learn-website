import { readable } from 'svelte/store';
import s from '../../static/structure.json';
import t from '../../static/tag.json';

export const structure = readable(s);
export const tags = readable(t);
