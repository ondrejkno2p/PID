import { options, url_trip } from "$lib/server/golem";
import type { PageServerLoad } from "./$types";

export const load = (async ({url,params,fetch}) => {
    const trip_id=params.trip_id;
    const trip = await(await fetch("/api/trip/"+trip_id)).json()
    const stop_id = url.searchParams.get('stop_id')
    console.log(url)
    return {
        stop_id:stop_id,
        trip:trip as trip
    }
}) satisfies PageServerLoad;