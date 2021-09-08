import { readable } from 'svelte/store';
import s from '../../static/structure.json'

export const structure = readable(s);