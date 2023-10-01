<script lang="ts">
    import type { PageData } from "./$types";
    import StopDepartureBoard from "$lib/StopDepartureBoard.svelte";
    export let data:PageData;
    $: stop = data.stops.find((value)=>{return value.id==stop_id})
    $: stop_id = data.stop_id;
    $: departures = data.departures;
    $: arrivals =data.arrivals;
    import {title} from '$lib/stores'
    $:name=data.stop_name as string
    $:$title=name;
</script>
{#if stop}
    <StopDepartureBoard stop_id={stop_id} stop={stop} departures={departures} arrivals={arrivals}/>
{/if}
