import { options, url_trip } from "$lib/server/golem";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({url,params,fetch}) => {
    const trip_id=params.trip_id;
    const trip_res = await fetch("/api/trip/"+trip_id)
    if(!trip_res.ok){
        throw error(404)
    }
    const trip=await trip_res.json();
    const stop_id = url.searchParams.get('stop_id')
    const stop_name = url.searchParams.get('stop_name');
    return {
        stop_name:stop_name,
        stop_id:stop_id,
        trip:trip as trip
    }
}) satisfies PageServerLoad;