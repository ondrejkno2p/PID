import { options, url_departure_board } from "$lib/server/golem";
import {stops} from '$lib/server/get_all_stops'
import type { RequestHandler } from "@sveltejs/kit";

export const GET:RequestHandler=(async ({url, setHeaders}) => {
    setHeaders({"cache-control":"max-age=24*60*60"})
    let closest = stops[0];
    const lat = Number(url.searchParams.get('lat'))
    const lon = Number(url.searchParams.get('lon'))
    const scale = Math.cos(Math.PI*lat/180.0)
    stops.forEach((stop) => {
        const dist =(stop.lat-lat)*(stop.lat-lat)+scale*scale*(stop.lon-lon)*(stop.lon-lon);
        const dist0 = (closest.lat-lat)*(closest.lat-lat)+scale*scale*(closest.lon-lon)*(closest.lon-lon)
        if(dist < dist0){
            closest=stop
        }
    });
    return new Response(JSON.stringify(closest),{status:200});
}) satisfies RequestHandler;