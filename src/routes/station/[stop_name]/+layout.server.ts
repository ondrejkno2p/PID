import { options, url_trip } from "$lib/server/golem";
import type { LayoutServerLoad } from "./$types";


export const load = (async ({params,fetch}) => {
    const stop_name=params.stop_name;
    // console.log("Layout")
    if(stop_name==undefined) {
        return {stops: new Array<stop>(), stop_name:undefined}
    }
    const stops_res = await fetch("/api/find_stop"+"?stop_name="+stop_name);
    if(!stops_res.ok){
        return {stops:[], stop_name:stop_name, departures:[], arrivals:[]}
    }
    const departures_res = await fetch("/api/station/departures?name="+encodeURI(stop_name));
    const departures:Array<departure> = departures_res.ok?(await departures_res.json()):[];
    const stops:Array<stop> = await stops_res.json();
    return {stops:stops, stop_name:stop_name, departures:departures, arrivals:departures}
}) satisfies LayoutServerLoad;