<script lang="ts">
    import type { PageData } from "./$types";
    import StopDepartureBoard from "$lib/StopDepartureBoard.svelte";
    import {title, settings} from '$lib/stores'

    export let data:PageData;
    
    $: stop = data.stops.find((value)=>{return value.id==stop_id})
    $: stop_id = data.stop_id;
    $: departures = data.departures;
    $: arrivals =data.arrivals;
    $: name=data.stop_name as string
    $: $title=name;
    $settings.limit = data.limit
    $: $settings.limit = data.limit
    $settings.minutesOffset = data.minutesOffset
    $: $settings.minutesOffset = data.minutesOffset
</script>
{#if stop}
    <StopDepartureBoard stop_id={stop_id} stop={stop} departures={departures} arrivals={arrivals}/>
{/if}
