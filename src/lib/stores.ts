import { writable } from 'svelte/store';

export const found_stops = writable<stop[]>([]);
export const hover_stop = writable<string>('');
export const search_stop_name = writable<string>('');