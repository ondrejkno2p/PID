<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import {search_stop_name} from '$lib/stores'
    import Departure from "$lib/Departure.svelte";
    import { SlideToggle } from '@skeletonlabs/skeleton';
    let checked:boolean=false;
    export let stop:stop;
    export let departures:Array<departure>;
    export let arrivals:Array<departure>;
    export let stop_id:string;
    $search_stop_name=stop.name

    let new_departures  : Promise<Array<departure>>;
        async function fetchDepartures() {
        const [departures_res,arrivals_res ]  = await Promise.all([
            fetch("/api/departures/"+stop_id),
            fetch("/api/arrivals/"+stop_id),
        ])
        const [departures_body,arrivals_body]=await Promise.all([
            departures_res.json() as Promise<departure[]>,
            arrivals_res.json() as Promise<departure[]>,
        ])
        if(departures_res.ok && arrivals_res) {
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
        },10000);
    });
    onDestroy(()=>{
        clearInterval(interval);
    })
</script>
<div class="card h-max shrink-0 sm:w-fit w-full">
    <div class="table-container ">
        <div class="flex justify-between text-xl p-2">
                {stop.name} {#if stop.platform} ({stop.platform}) {/if}
            <SlideToggle name="checked" bind:checked={checked} />
        </div>
        <table class="table sm:table-fixed table-auto max-w-full sm:max-w-2xl table-hover table-compact max-h-xl overflow-hidden">
            <thead class=" ">
                <tr>
                    <th class="w-20" scope="col">Linka</th>
                    <th class="w-52" scope="col">Směr</th>
                    <th class="w-28" scope="col">{checked?"Příjezd":"Odjezd"}</th>
                    <th class="w-28 hidden sm:table-cell" scope="col">Zpoždění</th>
                    <th class="w-16 hidden sm:table-cell" scope="col">Za</th>
                </tr>
            </thead>
            <tbody class="overflow-y-scroll">
            {#if checked}
                {#each arrivals?arrivals:[] as arrival (arrival.trip_id)}
                    <Departure departure={arrival}/>
                {/each}
            {:else}
                {#each departures?departures:[] as departure (departure.trip_id)}
                    <Departure departure={departure}/>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>
</div>