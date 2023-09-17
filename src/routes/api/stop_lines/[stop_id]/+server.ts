import { options, url_stop } from "$lib/server/golem";
import type { RequestHandler } from "@sveltejs/kit";


export const GET:RequestHandler=(async ({params}) => {
    try {
        const url = url_stop+params.stop_id;
        const golem_res = await fetch(url,options);
        if(!golem_res.ok){
            return new Response(JSON.stringify({}),{status:golem_res.status});
        }
        const golem_body = await golem_res.json();
        const stop:stop={
            id: golem_body.properties.stop_id,
            name: golem_body.properties.stop_name,
            platform: golem_body.properties.platform_code,
            lat: golem_body.geometry.coordinates[0],
            lon: golem_body.geometry.coordinates[1],
        };
        return new Response(JSON.stringify(stop),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({}),{status:500});
    }
}) satisfies RequestHandler;