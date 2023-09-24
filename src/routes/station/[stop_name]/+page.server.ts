import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({params,fetch, setHeaders}) => {
    const stop_name=params.stop_name;
    if(!stop_name) {
        throw error(400)
    }
    const [departures_res,arrivals_res]=await Promise.all([
        fetch("/api/station/departures?name="+encodeURI(stop_name)),
        fetch("/api/station/departures?name="+encodeURI(stop_name)+"&mode="+encodeURI("arrivals"))
    ])

    const [departures,arrivals]= await Promise.all([
        departures_res.json() as Promise<departure[]>,
        arrivals_res.json() as Promise<departure[]>,
    ]);

    return {departures:departures, arrivals:arrivals}
}) satisfies PageServerLoad;