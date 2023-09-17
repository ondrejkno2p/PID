import { options, url_trip } from "$lib/server/golem";
import type { PageServerLoad } from "./$types";

export const load = (async ({params,fetch}) => {
    const trip_id=params.trip_id;
    const trip = await(await fetch("/api/trip/"+trip_id)).json()
    return {
        trip:trip as trip
    }
}) satisfies PageServerLoad;