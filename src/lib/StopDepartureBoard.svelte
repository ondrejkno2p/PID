<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import {search_stop_name} from '$lib/stores'
    import Departure from "$lib/Departure.svelte";
    import Slider from "$lib/Slider.svelte";
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
    let interval:number;
    onMount(()=>{
        interval=setInterval(()=>{
            new_departures=fetchDepartures().then((value)=>{departures=value;return value;},(reason)=>{return reason})
        },10000);
    });
    onDestroy(()=>{
        clearInterval(interval);
    })
</script>
<div class="stop">
    <div class="departure_board">
        <div class=departure_board_header>
            <h2>
                {stop.name} {#if stop.platform} ({stop.platform}) {/if}
            </h2>
            <Slider bind:checked={checked}/>
        </div>
        <table>
            <thead>
                <tr>
                    <th style="width:5em;" scope="col">Linka</th>
                    <th style="width:14em;" scope="col">Směr</th>
                    <th style="width:5em;" scope="col">{checked?"Příjezd":"Odjezd"}</th>
                    <th style="width:6em;" scope="col">Zpoždění</th>
                    <th style="width:5em;" scope="col">Za</th>
                </tr>
            </thead>
            <tbody>
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
<style>
    div.departure_board{
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 0.5em;
        padding: 1em;
        height: fit-content;
        border: 2px var(--grey) solid;
    }
    table th {
        text-align: left;
    }
    div.departure_board_header {
        display: flex;
        justify-content: space-between;
        border-bottom: var(--grey) solid 0.1em;
        margin-bottom: 1em;
    }
    div.stop {
        display: block;
        flex-direction: row;
        max-width: fit-content;
    }
</style>