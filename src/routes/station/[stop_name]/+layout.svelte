<script lang="ts">
    import FindStop from "$lib/FindStop.svelte";
    import Map from "$lib/Map.svelte";
    import Stops from "$lib/Stops.svelte";
    import { found_stops, search_stop_name } from "$lib/stores";
    import type { PageData } from "./$types";
    export let data:PageData;
    $: $found_stops=data.stops;
    $: $search_stop_name=data.stop_name as string;
</script>
<svelte:head>
    <title>{$search_stop_name}</title> 
</svelte:head>
<div>
<div class="stops">
<Stops/>
</div>
<div class="map">
<Map/>
</div>
<div class="slot">
<slot/>
</div>
</div>
<style>
    div{
        display: flex;
        justify-content: baseline;
        padding: 1em;
    }
    div.stops{
        width: 25%;
        padding: 0;
    }
    div.map{
        width: 40%;
        padding: 0;
        flex-shrink: 0;
        justify-content: center;
    }
    div.slot{
        width: 35%;
        padding: 0;
    }
</style> 