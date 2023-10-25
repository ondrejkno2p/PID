<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import {search_stop_name, hover_stop, settings} from '$lib/stores'
    import PlatDeparture from "./PlatDeparture.svelte";
    import { SlideToggle } from '@skeletonlabs/skeleton';
    
    export let departures:departure[]=[];
    export let arrivals:departure[]=[];
    export let name:string;
    import { mode_arrival } from "$lib/stores";
    let new_departures  : Promise<departure[]>;
    async function fetchDepartures() {
        const [departures_res,arrivals_res ]  = await Promise.all([
            fetch("/api/station/departures?name="+encodeURI(name)                               +"&limit="+$settings.limit+"&minutesOffset="+$settings.minutesOffset),
            fetch("/api/station/departures?name="+encodeURI(name)+"&mode="+encodeURI('arrivals')+"&limit="+$settings.limit+"&minutesOffset="+$settings.minutesOffset),
        ])
        const [departures_body,arrivals_body]=await Promise.all([
            departures_res.json() as Promise<departure[]>,
            arrivals_res.json() as Promise<departure[]>,
        ])
        if(departures_res.ok && arrivals_res.ok) {
            return {
                    departures:departures_body,
                    arrivals:arrivals_body,
                };
        }
        else{
            throw new Error("F");
        }
    };
    let interval: string | number | NodeJS.Timeout | undefined;
    onMount(()=>{
        interval=setInterval(()=>{
            new_departures=fetchDepartures().then((value)=>{departures=value.departures; arrivals=value.arrivals;return value;},(reason)=>{return reason})
        },30000);
    });
    onDestroy(()=>{
        clearInterval(interval);
    })
</script>
<div class="card h-max shrink-0 sm:w-fit w-full rounded-none rounded-bl-container-token rounded-br-container-token ">
    <div class="table-container ">
        <div class="flex justify-between text-xl p-2">
                {name}
            <SlideToggle name="checked" bind:checked={$mode_arrival} />
        </div>
        <table class="table table-fixed max-w-[100vw] sm:max-w-2xl table-hover table-compact max-h-xl overflow-hidden rounded-none rounded-bl-container-token rounded-br-container-token">
            <thead class=" ">
                <tr>
                    <th class="sm:w-8 w-8" scope="col">P</th>
                    <th class="sm:w-20 w-20" scope="col">Linka</th>
                    <th class="sm:w-52 overflow-ellipsis overflow-hidden" scope="col">Směr</th>
                    <th class="sm:w-24 w-24" scope="col">{$mode_arrival?"Příjezd":"Odjezd"}</th>
                    <th class="sm:w-28 hidden sm:table-cell" scope="col">Zpoždění</th>
                    <th class="sm:w-16 hidden sm:table-cell" scope="col">Za</th>
                </tr>
            </thead>
            <tbody class="overflow-y-scroll">
            {#if $mode_arrival && arrivals}
                {#each arrivals as arrival ([arrival.trip_id,arrival.stop_id])}
                    <PlatDeparture departure={arrival}/>
                {/each}
            {:else if departures}
                {#each departures as departure ([departure.trip_id,departure.stop_id])}
                    <PlatDeparture departure={departure}/>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>
</div>