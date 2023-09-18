import {options, url_stops} from '$lib/server/golem'
const golem_params1    = {
    limit:"10000"
};
const golem_params2    = {
    limit:"10000",
    offset:"10000"
};
const url1 = url_stops+"?"+new URLSearchParams(golem_params1).toString();
const url2 = url_stops+"?"+new URLSearchParams(golem_params2).toString();
const res1 = await fetch(url1,options);
const res2 = await fetch(url2,options);
const body1 = await res1.json();
const body2 = await res2.json();
const golem_stops:Array<golem_stop>=[...body1.features,...body2.features];
export let stop_names:Array<string>=[];
golem_stops.forEach((golem_stop:golem_stop)=>{
    let stop_name:string=golem_stop.properties.stop_name;
    if (stop_name!=null && !stop_names.includes(stop_name) && golem_stop.properties.stop_id.endsWith('P')){
        stop_names=[...stop_names,stop_name];
    }
});

