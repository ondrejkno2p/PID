import { options, url_trip } from "$lib/server/golem";
import type { LayoutServerLoad } from "./$types";


export const load = (async ({params,fetch}) => {
    const stop_name=params.stop_name;
    // console.log("Layout")
    if(stop_name==undefined) {
        return {stops: new Array<stop>(), stop_name:undefined}
    }

    const [stops_res,departures_res,arrivals_res]=await Promise.all([
        fetch("/api/find_stop"+"?stop_name="+stop_name),
        fetch("/api/station/departures?name="+encodeURI(stop_name)),
        fetch("/api/station/departures?name="+encodeURI(stop_name)+"&mode="+encodeURI("arrivals"))
    ])

    if(!stops_res.ok){
        return {stops:[], stop_name:stop_name, departures:[], arrivals:[]}
    }

    const [stops,departures,arrivals]= await Promise.all([
        stops_res.json() as Promise<stop[]>,
        departures_res.json() as Promise<departure[]>,
        arrivals_res.json() as Promise<departure[]>,
    ]);

    return {stops:stops, stop_name:stop_name, departures:departures, arrivals:arrivals}
}) satisfies LayoutServerLoad;