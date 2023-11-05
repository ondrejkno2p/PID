import { options, url_departure_board } from "$lib/server/golem";
import { error, json, type RequestHandler } from "@sveltejs/kit";
type modes = "departures" | "arrivals" | "all";

const GolemDepartureToPlatDeparture = (golemDeparture: golem_departure) => {
  return {
    platform: golemDeparture.stop.platform_code,
    stop_id: golemDeparture.stop.id,
    name: golemDeparture.route.short_name as string,
    headsign: golemDeparture.trip.headsign as string,
    trip_id: golemDeparture.trip.id as string,
    predicted: new Date(golemDeparture.departure_timestamp.predicted as string),
    scheduled: new Date(golemDeparture.departure_timestamp.scheduled as string),
    minutes: golemDeparture.departure_timestamp.minutes as string,
    delay: (golemDeparture.delay.seconds == null ||
    golemDeparture.delay.seconds < 0
      ? 0
      : golemDeparture.delay.seconds) as number,
  } as departure;
};

const GolemDepartureToDeparture = (golemDeparture: golem_departure) => {
  return {
    platform: null,
    stop_id: golemDeparture.stop.id,
    name: golemDeparture.route.short_name as string,
    headsign: golemDeparture.trip.headsign as string,
    trip_id: golemDeparture.trip.id as string,
    predicted: new Date(golemDeparture.departure_timestamp.predicted as string),
    scheduled: new Date(golemDeparture.departure_timestamp.scheduled as string),
    minutes: golemDeparture.departure_timestamp.minutes as string,
    delay: (golemDeparture.delay.seconds == null ||
    golemDeparture.delay.seconds < 0
      ? 0
      : golemDeparture.delay.seconds) as number,
  } as departure;
};

export const GET = (async ({ url, setHeaders, url: rurl }) => {
  const limit = Number(rurl.searchParams.get("limit"))
    ? Number(rurl.searchParams.get("limit"))
    : 10;
  const minutesOffset = Number(rurl.searchParams.get("minutesOffset"))
    ? Number(rurl.searchParams.get("minutesOffset"))
    : 0;
  const mode = url.searchParams.get("mode")
    ? (url.searchParams.get("mode") as modes)
    : "departures";
  const id = url.searchParams.get("id");
  const name = url.searchParams.get("name");
  const golemParams = new URLSearchParams([
    ["limit", String(limit)],
    [
      "timeFrom",
      new Date(Date.now() + 1000 * 60 * minutesOffset).toISOString(),
    ],
    ["minutesAfter", "360"],
  ]);
  if (id !== null) {
    golemParams.append("ids", id);
  } else if (name !== null) {
    golemParams.append("names", name);
  } else {
    throw error(400);
  }
  if (mode != "all") {
    golemParams.append("mode", mode);
    const new_url =
      url_departure_board + "?" + new URLSearchParams(golemParams).toString();
    const golem_res = await fetch(new_url, options);
    if (golem_res && !golem_res.ok) {
      throw error(golem_res.status);
    }
    const cache_control = golem_res.headers.get("cache-control");
    if (cache_control) {
      setHeaders({ "cache-control": cache_control });
    }
    const golem_body = await golem_res.json();
    const golem_departures = golem_body.departures;
    let departures: Array<departure> = [];
    if (id != null) {
      golem_departures.forEach((golemDeparture: golem_departure) => {
        departures = [...departures, GolemDepartureToDeparture(golemDeparture)];
      });
    } else {
      golem_departures.forEach((golemDeparture: golem_departure) => {
        departures = [
          ...departures,
          GolemDepartureToPlatDeparture(golemDeparture),
        ];
      });
    }
    return json({
      departures: mode == "departures" ? departures : null,
      arrivals: mode == "arrivals" ? departures : null,
    });
  } else if (mode == "all") {
    golemParams.append("mode", "departures");
    const departuresUrl =
      url_departure_board + "?" + new URLSearchParams(golemParams).toString();
    golemParams.set("mode", "arrivals");
    const arrivalsUrl =
      url_departure_board + "?" + new URLSearchParams(golemParams).toString();
    const [golemDeparturesResponse, golemArrivalsResponse] = await Promise.all([
      fetch(departuresUrl, options),
      fetch(arrivalsUrl, options),
    ]);
    if (!golemDeparturesResponse.ok) {
      throw error(golemDeparturesResponse.status);
    }
    if (!golemArrivalsResponse.ok) {
      throw error(golemArrivalsResponse.status);
    }
    const cache_control = golemDeparturesResponse.headers.get("cache-control");
    if (cache_control) {
      setHeaders({ "cache-control": cache_control });
    }
    const [golemDeparturesBody, golemArrivalsBody] = await Promise.all([
      golemDeparturesResponse.json(),
      golemArrivalsResponse.json(),
    ]);
    const [golemDepartures, golemArrivals] = [
      golemDeparturesBody.departures,
      golemArrivalsBody.departures,
    ];
    let departures: Array<departure> = [];
    let arrivals: Array<departure> = [];
    if (id != null) {
      golemDepartures.forEach((golemDeparture: golem_departure) => {
        departures = [...departures, GolemDepartureToDeparture(golemDeparture)];
      });
      golemArrivals.forEach((golemDeparture: golem_departure) => {
        arrivals = [...arrivals, GolemDepartureToDeparture(golemDeparture)];
      });
    } else {
      golemDepartures.forEach((golemDeparture: golem_departure) => {
        departures = [
          ...departures,
          GolemDepartureToPlatDeparture(golemDeparture),
        ];
      });
      golemArrivals.forEach((golemDeparture: golem_departure) => {
        arrivals = [...arrivals, GolemDepartureToPlatDeparture(golemDeparture)];
      });
    }
    return json({ departures: departures, arrivals: arrivals });
  } else {
    throw error(500);
  }
}) satisfies RequestHandler;
