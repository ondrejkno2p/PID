import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
export const ssr = true;

export const load = (async ({ params, fetch, setHeaders }) => {
  const stop_name = params.stop_name;
  if (!stop_name) {
    throw error(400);
  }
  const stops_res = await fetch("/api/find_stop" + "?stop_name=" + stop_name);

  if (!stops_res.ok) {
    throw error(404);
  }
  const stops = (await stops_res.json()) as stop[];

  return { stops: stops, stop_name: stop_name };
}) satisfies LayoutServerLoad;
