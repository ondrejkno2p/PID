<script lang="ts">
    import type { PageData } from "./$types";
    import DepartureBoard from "$lib/DepartureBoard.svelte";
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
    <DepartureBoard name={name} stop_id={stop_id} departures={departures} arrivals={arrivals}/>
{/if}
