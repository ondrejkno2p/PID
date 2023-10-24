import { writable } from 'svelte/store';

export const found_stops = writable<stop[]>([]);
export const hover_stop = writable<string>('');
export const search_stop_name = writable<string>('');
export const last_page = writable<string | null>(null);
export const mode_arrival = writable<boolean>(false);
export const title = writable<string>('PID');
export const settings = writable<{time:Date | null, limit:number}>({
    time:null,
    limit:10,
})