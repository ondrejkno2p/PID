<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import {search_stop_name} from '$lib/stores'
    import Departure from "$lib/Departure.svelte";
    import Slider from "$lib/Slider.svelte";
    import Map from "$lib/Map.svelte";
    import StopDepartureBoard from "$lib/StopDepartureBoard.svelte";
    import FindStop from "$lib/FindStop.svelte";
    export let data:PageData;
    let checked:boolean=false;
    // let results = Promise.resolve<stop[]>([]);
    // results = Promise.reject();
    $search_stop_name=data.stop.name
    $: stop_id = data.stop_id;
    $: stop = data.stop;
    $: departures = data.departures?data.departures:[];
    $: arrivals = data.arrivals?data.arrivals:[];

    let new_departures  : Promise<Array<departure>>;
</script>
<StopDepartureBoard stop_id={stop_id} stop={stop} departures={departures} arrivals={arrivals}/>
