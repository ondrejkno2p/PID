import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load = (async ({params,fetch}) => {
    const stop_id=params.stop_id;
    const stop_name=params.stop_name;
    const stop_res       = await fetch("/api/stop/"+stop_id);
    const departures_res = await fetch("/api/departures/"+stop_id);
    const arrivals_res = await fetch("/api/arrivals/"+stop_id);

    if(!stop_res.ok){
        throw redirect(303, "/station/"+encodeURI(params.stop_name))
    }

    const stop:stop = await stop_res.json();    
    const departures:Array<departure> = departures_res.ok?(await departures_res.json()):[];
    const arrivals:Array<departure> = arrivals_res.ok?(await arrivals_res.json()):[];
    return {
        stop_id:stop_id,
        stop_name:stop_name,
        stop:stop,
        departures: departures,
        arrivals: arrivals,
    }
}) satisfies PageServerLoad;