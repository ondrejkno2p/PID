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
const [res1,res2] = await Promise.all([fetch(url1,options),fetch(url2,options)]);
const [body1, body2] = await Promise.all([res1.json(),res2.json()]);
// console.log(body1.features[0])
const golem_stops:Array<golem_stop>=[...body1.features,...body2.features];
export let stops:Array<{name:string,lat:number,lon:number}>=[];
golem_stops.forEach((golem_stop:golem_stop)=>{
    let stop_name:string=golem_stop.properties.stop_name;
    if (stop_name!=null && !stops.flatMap((value)=>{return value.name}).includes(stop_name) && golem_stop.properties.stop_id.endsWith('P')){
        stops=[...stops,{name:stop_name,lat:golem_stop.geometry.coordinates[1],lon:golem_stop.geometry.coordinates[0]}];
    }
});

