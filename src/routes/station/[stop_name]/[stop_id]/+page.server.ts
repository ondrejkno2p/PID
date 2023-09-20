import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load = (async ({params,fetch}) => {
    const stop_id=params.stop_id;
    const stop_name=params.stop_name;
    const [stop_res,departures_res,arrivals_res] = await Promise.all([
        fetch("/api/stop/"+stop_id),
        fetch("/api/departures/"+stop_id),
        fetch("/api/arrivals/"+stop_id),
    ])

    if(!stop_res.ok){
        throw error(500)
    }
    const [stop,departures,arrivals] = await Promise.all([
        stop_res.json() as Promise<stop>,
        departures_res.json() as Promise<departure[]>,
        arrivals_res.json() as Promise<departure[]>,

    ])
    return {
        stop_id:stop_id,
        stop_name:stop_name,
        stop:stop,
        departures: departures,
        arrivals: arrivals,
    }
}) satisfies PageServerLoad;