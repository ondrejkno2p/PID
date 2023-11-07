import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, setHeaders, url: rurl }) => {
  const stop_name = params.stop_name;
  if (!stop_name) {
    throw error(400);
  }
  const limit = Number(rurl.searchParams.get("limit"))
    ? Number(rurl.searchParams.get("limit"))
    : 10;
  const minutesOffset = Number(rurl.searchParams.get("minutesOffset"))
    ? Number(rurl.searchParams.get("minutesOffset"))
    : 0;
  const response = await fetch(
    "/api/departures?name=" +
      encodeURI(stop_name) +
      "&mode=departures" +
      "&limit=" +
      String(limit) +
      "&minutesOffset=" +
      minutesOffset
  );
  const body = await response.json();
  setHeaders({ "cache-control": "max-age=15" });

  return {
    departures: body.departures,
    arrivals: body.arrivals,
    limit: limit,
    minutesOffset: minutesOffset,
  };
}) satisfies PageServerLoad;
