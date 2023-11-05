import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({params,fetch, setHeaders, url:rurl}) => {
    const stop_name=params.stop_name;
    if(!stop_name) {
        throw error(400)
    }
    const limit = Number(rurl.searchParams.get('limit'))?Number(rurl.searchParams.get('limit')):10
    const minutesOffset = Number(rurl.searchParams.get('minutesOffset'))?Number(rurl.searchParams.get('minutesOffset')):0
    const [departures_res,arrivals_res]=await Promise.all([
        fetch("/api/departures?name="+encodeURI(stop_name)+"&limit="+String(limit)+"&minutesOffset="+minutesOffset),
        fetch("/api/departures?name="+encodeURI(stop_name)+"&mode="+encodeURI("arrivals")+"&limit="+String(limit)+"&minutesOffset="+minutesOffset)
    ])
    setHeaders({"cache-control":"max-age=15"})

    const [departures,arrivals]= await Promise.all([
        departures_res.json() as Promise<departure[]>,
        arrivals_res.json() as Promise<departure[]>,
    ]);

    return {
        departures  :departures,
        arrivals    :arrivals,
        limit       :limit,
        minutesOffset: minutesOffset,
    }
}) satisfies PageServerLoad;