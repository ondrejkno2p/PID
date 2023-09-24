import { options, url_departure_board } from "$lib/server/golem";
import type { RequestHandler } from "@sveltejs/kit";


export const GET:RequestHandler=(async ({params,setHeaders}) => {
    try {
        const golem_params    = {
            ids: params.stop_id as string,
            minutesAfter: "360" as string,
            limit: "10" as string,
        };
        const url = url_departure_board+"?"+new URLSearchParams(golem_params).toString();
        const golem_res = await fetch(url,options);
        if(!golem_res.ok){
            return new Response(JSON.stringify({}),{status:golem_res.status});
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
        return new Response(JSON.stringify(departures),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({}),{status:500});
    }
}) satisfies RequestHandler;