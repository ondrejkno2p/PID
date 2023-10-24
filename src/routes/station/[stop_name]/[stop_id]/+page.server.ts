import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load = (async ({params,fetch, setHeaders, url: rurl}) => {
    const stop_id=params.stop_id;
    const stop_name=params.stop_name;
    const limit = Number(rurl.searchParams.get('limit'))?Number(rurl.searchParams.get('limit')):10
    const [departures_res,arrivals_res] = await Promise.all([
        fetch("/api/departures/"+stop_id+"?limit="+limit),
        fetch("/api/arrivals/"+stop_id+"?limit="+ limit),
    ])

    const [departures,arrivals] = await Promise.all([
        departures_res.json() as Promise<departure[]>,
        arrivals_res.json() as Promise<departure[]>,
    ])
    setHeaders({"cache-control":"max-age=0"})
    return {
        stop_id:stop_id,
        stop_name:stop_name,
        departures: departures,
        arrivals: arrivals,
        limit: limit,
    }
}) satisfies PageServerLoad;