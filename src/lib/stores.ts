import { writable } from "svelte/store";

export const found_stops = writable<stop[]>([]);
export const search_stop_name = writable<string>("");
export const last_page = writable<string | null>(null);
export const mode_arrival = writable<boolean>(false);
export const title = writable<string>("Co mi jede?");
export const settings = writable<{ minutesOffset: number; limit: number }>({
  minutesOffset: 0,
  limit: 10,
});
