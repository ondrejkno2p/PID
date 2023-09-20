<script lang="ts">
    import {found_stops,hover_stop,search_stop_name} from '$lib/stores';
    const map_api_key='b634dae013b649629110c39cfe7d4c6a';
    const url_static_maps='https://maps.geoapify.com/v1/staticmap';
    const blur = ()=>{$hover_stop=''};
    import {page} from '$app/stores'
	import { onMount } from 'svelte';
    $: center = get_center($found_stops)
    $: zoom = get_bounds(center,$found_stops)
    $: geoapify_params = {
            style:"toner",
            scaleFactor:"1",
            height:"500",
            width:"500",
            zoom:String(zoom),
            center:"lonlat:"+String(center.lon)+","+String(center.lat),
            apiKey:map_api_key,
    };
    $: url = url_static_maps +"?"+new URLSearchParams(geoapify_params).toString();
    const get_center=(stops:Array<stop>) => {
        let lon=0;
        let lat=0;
        const n = stops.length;
        for (let i = 0; i < n; i++) {
            lat += stops[i].lat;
            lon += stops[i].lon;
        }
        lat = lat/n;
        lon = lon/n;
        return {lat, lon}
    }
    const get_bounds = (center:{lat:number,lon:number},stops:Array<stop>) => {
        let dlon=0;
        let dlat=0;
        const n = stops.length;
        if(n<=1) {
            return 16.5;
        }
        else {
            for (let i = 0; i < n; i++) {
                if(Math.abs(stops[i].lat-center.lat)>dlat) {
                    dlat=Math.abs(stops[i].lat-center.lat);
                }
                if(Math.abs(stops[i].lon-center.lon)>dlon) {
                    dlon=Math.abs(stops[i].lon-center.lon);
                }
            }
            dlon=1.2*dlon;
            dlat=1.2*dlat;
            let z=Math.log2(180/Math.max(dlon,dlat/Math.cos(Math.PI*center.lat/180.0)));
            return Math.min(z,16.5);
        }
    }
    $: dx=360/(Math.pow(2,zoom));
    $: dy=dx*Math.cos(Math.PI*center.lat/180.0);
    onMount(async () =>{
        preloaded_image=preload(url);
    })
    let preloaded_image:Promise<string>;
    const preload = async (src:string) => {
        const resp = await fetch(src);
        const blob = await resp.blob();

        return new Promise<string>(function (resolve) {
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject('Error: ', error);
        });
    };

    function reject(arg0: string, error: ProgressEvent<FileReader>): any {
        throw new Error('Function not implemented.');
    }
</script>
<div class="card h-fit m-0 overflow-hidden">
<div class="relative m-0 w-[600px]">
    <svg viewBox="0 0 100 100" class="absolute h-full w-full m-0 ">
        {#each $found_stops as stop}
            <a href={"/station/" + encodeURI(stop.name) + "/" + stop.id} on:blur={blur} on:mouseout={blur} on:focus={()=>{$hover_stop=stop.id}} on:mouseover={()=>{$hover_stop=stop.id}}>
                <circle class={"dark:fill-surface-500 fill-surface-400 "+($hover_stop==stop.id?"  ":"") + ($page.params?.stop_id==stop.id?"!fill-primary-500":"")} cx={(stop.lon-center.lon+dx/2)*100/dx} cy={-(stop.lat-center.lat-dy/2)*100/dy} r={stop.id==$hover_stop?3:2} />
            </a>
        {/each}
    </svg>
    <div class="h-fit">
        {#await preloaded_image}
        <img 
            class="w-full m-0 p-0"
            width="600" 
            height="600" 
            alt={"Mapa "+$search_stop_name}
        />
    {:then base64}
        <img
            class="w-full m-0 p-0"
            src="{base64}"
            width="600" 
            height="600" 
            alt={"Mapa "+$search_stop_name}
        />
    {/await}
    </div>

</div>
</div>
