import { options, url_departure_board } from "$lib/server/golem";
import { error, json, type RequestHandler } from "@sveltejs/kit";


export const GET = (async ({url, setHeaders, url: rurl}) => {
    const limit = Number(rurl.searchParams.get('limit'))?Number(rurl.searchParams.get('limit')):10
    const minutesOffset = Number(rurl.searchParams.get('minutesOffset'))?Number(rurl.searchParams.get('minutesOffset')):0
    const golem_params    = {
        names: url.searchParams.get('name') as string,
        mode: url.searchParams.get('mode')?url.searchParams.get('mode') as string:"departures",
        minutesAfter: "360" as string,
        limit: String(limit),
        timeFrom:(new Date(Date.now()+1000*60*minutesOffset)).toISOString()
    };

    const new_url = url_departure_board+"?"+new URLSearchParams(golem_params).toString();
    const golem_res = await fetch(new_url,options);
    if(golem_res && !golem_res.ok){
        throw error(golem_res.status);
    }
    const cache_control = golem_res.headers.get("cache-control")
    if(cache_control){
        setHeaders({"cache-control":cache_control});
    }
    const golem_body = await golem_res.json();
    const golem_departures=golem_body.departures;
    let departures : Array<departure> = [];
        golem_departures.forEach((golem_departure:golem_departure) => {
        departures=[...departures,{
            platform : golem_departure.stop.platform_code,
            stop_id  : golem_departure.stop.id,
            name     : golem_departure.route.short_name as string,
            headsign : golem_departure.trip.headsign as string,
            trip_id  : golem_departure.trip.id as string,
            predicted: new Date(golem_departure.departure_timestamp.predicted as string),
            scheduled: new Date(golem_departure.departure_timestamp.scheduled as string),
            minutes  : golem_departure.departure_timestamp.minutes as string,
            delay    : ((golem_departure.delay.seconds==null || golem_departure.delay.seconds<0) ? 0 : golem_departure.delay.seconds ) as number,
        }];
    });
    return json(departures);

}) satisfies RequestHandler