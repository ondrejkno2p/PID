<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import {search_stop_name} from '$lib/stores'
    import Departure from "$lib/Departure.svelte";
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { mode_arrival } from "$lib/stores";
    let checked:boolean=false;
    export let stop:stop;
    export let departures:departure[]=[];
    export let arrivals:departure[]=[];
    export let stop_id:string;
    $search_stop_name=stop.name

    let new_departures  : Promise<departure[]>;
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
            new_departures=fetchDepartures().then((value)=>{
                departures=value.departures;
                arrivals=value.arrivals;
                return value;
            },(reason)=>{return reason})
        },30000);
    });
    onDestroy(()=>{
        clearInterval(interval);
    })
</script>
<div class="card h-max shrink-0 sm:w-fit w-full rounded-none rounded-bl-container-token rounded-br-container-token">
    <div class="table-container ">
        <div class="flex justify-between text-xl p-2 overflow-ellipsis overflow-hidden">
                {stop.name} {#if stop.platform} ({stop.platform}) {/if}
            <SlideToggle name="checked" bind:checked={$mode_arrival} />
        </div>
        <table class="table table-fixed max-w-[100vw] sm:max-w-2xl table-hover table-compact max-h-xl overflow-hidden rounded-none rounded-bl-container-token rounded-br-container-token">
            <thead class=" ">
                <tr>
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
                    <Departure departure={arrival}/>
                {/each}
            {:else if departures}
                {#each departures as departure ([departure.trip_id,departure.stop_id])}
                    <Departure departure={departure}/>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>
</div>