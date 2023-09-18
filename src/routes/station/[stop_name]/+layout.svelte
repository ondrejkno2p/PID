<script lang="ts">
    import FindStop from "$lib/FindStop.svelte";
    import Map from "$lib/Map.svelte";
    import Stops from "$lib/Stops.svelte";
    import { found_stops, search_stop_name } from "$lib/stores";
	import { AppShell } from "@skeletonlabs/skeleton";
    import type { PageData } from "./$types";
    export let data:PageData;
    $: $found_stops=data.stops;
    $: $search_stop_name=data.stop_name as string;
    import { navigating } from "$app/stores";
</script>
<svelte:head>
    <title>{$search_stop_name}</title>
</svelte:head>

<div class="flex justify-center w-full h-full">
    <div class="relative justify-center flex h-full w-5/6 ">
        <Stops/>
        <span class="divider-vertical h-full mx-2 lg:block hidden" />
        <Map/>
        <span class="divider-vertical h-full mx-2 hidden 2xl:block " />
        <slot/>
    </div>
</div>




