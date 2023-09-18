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
        const departures_res  = await fetch("/api/departures/"+stop_id);
        const departures_body:Array<departure> = await departures_res.json();
        if(departures_res.ok) {
            return departures_body;
        }
        else{
            throw new Error("F");
        }
    };
    let interval: string | number | NodeJS.Timeout | undefined;
    onMount(()=>{
        interval=setInterval(()=>{
            new_departures=fetchDepartures().then((value)=>{departures=value;return value;},(reason)=>{return reason})
        },10000);
    });
    onDestroy(()=>{
        clearInterval(interval);
    })
</script>
<div class="card h-max shrink-0">
    <div class="table-container ">
        <div class="flex justify-between text-xl p-2">
                {stop.name} {#if stop.platform} ({stop.platform}) {/if}
            <SlideToggle name="checked" bind:checked={checked} />
        </div>
        <table class="table sm:table-fiexd table-auto max-w-xs md:max-w-xl table-hover table-compact max-h-xl overflow-hidden">
            <thead class=" ">
                <tr>
                    <th class="" scope="col">Linka</th>
                    <th class="" scope="col">Směr</th>
                    <th class="" scope="col">{checked?"Příjezd":"Odjezd"}</th>
                    <th class="hidden sm:table-cell" scope="col">Zpoždění</th>
                    <th class="hidden sm:table-cell" scope="col">Za</th>
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