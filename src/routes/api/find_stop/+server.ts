import { options, url_departure_board, url_stops } from "$lib/server/golem";
import { json, type RequestHandler } from "@sveltejs/kit";
import { redis_client } from "$lib/server/redis";

export const GET:RequestHandler=(async ({url, setHeaders}) => {
    const stop_name = url.searchParams.get('stop_name') as string;
    if(stop_name=='' || stop_name == null){
        return new Response(JSON.stringify({}),{status:400});
    }
    try {
        const cache = await redis_client.get("stops/"+stop_name);
        if(cache){
            setHeaders({"cache-control":"max-age=86400"})
            return json(JSON.parse(cache));
        }
        const golem_params    = {
            names: stop_name as string,
        };
        const url = url_stops+"?"+new URLSearchParams(golem_params).toString();
        const golem_res = await fetch(url,options);
        if(!golem_res.ok){
            return new Response(JSON.stringify({}),{status:golem_res.status});
        }
        const golem_body = await golem_res.json();

        const golem_stops=golem_body.features;
        if(golem_stops.length==0){
            return new Response(JSON.stringify({}),{status:404});
        }
        let stops : Array<stop> = [];
        golem_stops.forEach((golem_stop:golem_stop) => {
            if(golem_stop.properties.location_type==0 && golem_stop.properties.stop_id.endsWith('P')){
                stops=[...stops,{
                    id       : golem_stop.properties.stop_id as string,
                    name     : golem_stop.properties.stop_name as string,
                    platform : golem_stop.properties.platform_code as string,
                    lat      : golem_stop.geometry.coordinates[1] as number,
                    lon      : golem_stop.geometry.coordinates[0] as number,
                }];
            }
        });
        setHeaders({"cache-control":"max-age=86400"})
        await redis_client.set("stops/"+stop_name,JSON.stringify(stops), "EX", 86400);
        return new Response(JSON.stringify(stops),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({}),{status:500});
    }
}) satisfies RequestHandler;