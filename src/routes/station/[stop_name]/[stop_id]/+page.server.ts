import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load = (async ({params,fetch, setHeaders, url: rurl}) => {
    const stop_id=params.stop_id;
    const stop_name=params.stop_name;
    const limit = Number(rurl.searchParams.get('limit'))?Number(rurl.searchParams.get('limit')):10
    const minutesOffset = Number(rurl.searchParams.get('minutesOffset'))?Number(rurl.searchParams.get('minutesOffset')):0
    const response =  await fetch("/api/departures?id="+stop_id+"&mode=all"+"&limit="+String(limit)+"&minutesOffset="+minutesOffset)
    const body = await response.json()
    setHeaders({"cache-control":"max-age=0"})
    return {
        stop_id:stop_id,
        stop_name:stop_name,
        departures: body.departures,
        arrivals: body.arrivals,
        limit: limit,
        minutesOffset:minutesOffset,
    }
}) satisfies PageServerLoad;