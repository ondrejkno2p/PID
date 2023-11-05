import { options, url_trip } from "$lib/server/golem";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = (async ({ params }) => {
  try {
    const golem_params = {
      includeStops: "true" as string,
      includeStopTimes: "true" as string,
      includeRoute: "true" as string,
    };
    const url =
      url_trip +
      params.trip_id +
      "?" +
      new URLSearchParams(golem_params).toString();
    const golem_res = await fetch(url, options);
    if (!golem_res.ok) {
      return new Response(JSON.stringify({}), { status: golem_res.status });
    }
    const golem_body = await golem_res.json();
    let stop_times: Array<stop_time> = [];
    golem_body.stop_times.forEach((stop_time: golem_stop_time) => {
      stop_times = [
        ...stop_times,
        {
          departure: stop_time.departure_time,
          arrival: stop_time.arrival_time,
          stop_id: stop_time.stop_id,
          stop_name: stop_time.stop.properties.stop_name,
          sequence: stop_time.stop_sequence,
          platform: stop_time.stop.properties.platform_code,
        },
      ];
    });
    const trip = {
      trip_id: golem_body.trip_id,
      headsign: golem_body.trip_headsign,
      name: golem_body.route.route_short_name,
      stop_times: stop_times,
    };
    return new Response(JSON.stringify(trip), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({}), { status: 500 });
  }
}) satisfies RequestHandler;
