import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";


export const load = (async ({params,fetch}) => {
    const stop_id=params.stop_id;
    const stop_name=params.stop_name;
    const [departures_res,arrivals_res] = await Promise.all([
        fetch("/api/departures/"+stop_id),
        fetch("/api/arrivals/"+stop_id),
    ])

    const [departures,arrivals] = await Promise.all([
        departures_res.json() as Promise<departure[]>,
        arrivals_res.json() as Promise<departure[]>,

    ])
    return {
        stop_id:stop_id,
        stop_name:stop_name,
        departures: departures,
        arrivals: arrivals,
    }
}) satisfies PageLoad;