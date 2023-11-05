import { stops } from "$lib/server/get_all_stops";
import type { RequestHandler } from "@sveltejs/kit";
import { error, json } from "@sveltejs/kit";
const praha = {
  lon: 14.411191,
  lat: 50.076528,
};

const beroun = {
  lon: 14.0609852,
  lat: 49.9570686,
};

const scale = Math.cos((Math.PI * praha.lat) / 180.0);

const getDistance = (
  s: { lon: number; lat: number },
  e: { lon: number; lat: number }
) => {
  return (
    (s.lat - e.lat) * (s.lat - e.lat) +
    scale * scale * (s.lon - e.lon) * (s.lon - e.lon)
  );
};

export const GET: RequestHandler = (async ({ url, setHeaders }) => {
  setHeaders({ "cache-control": "max-age=24*60*60" });
  let closest = stops[0];
  const lat = Number(url.searchParams.get("lat")?.slice(0, 7));
  const lon = Number(url.searchParams.get("lon")?.slice(0, 7));
  const user = { lat: lat, lon: lon };
  if (getDistance(user, praha) > getDistance(praha, beroun)) {
    throw error(400);
  }

  stops.forEach((stop) => {
    if (getDistance(user, stop) < getDistance(user, closest)) {
      closest = stop;
    }
  });
  return json(closest);
}) satisfies RequestHandler;
