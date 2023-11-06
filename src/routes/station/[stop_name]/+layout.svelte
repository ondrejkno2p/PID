<script lang="ts">
  import FindStop from "$lib/FindStop.svelte";
  import Map from "$lib/Map.svelte";
  import Stops from "$lib/Stops.svelte";
  import { found_stops, search_stop_name } from "$lib/stores";
  import { page } from "$app/stores";
  import { AppShell } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  export let data: PageData;
  $: $found_stops = data.stops;
  $: $search_stop_name = data.stop_name as string;
  import { navigating } from "$app/stores";
  import Settings from "$lib/Settings.svelte";
</script>

<svelte:head>
  <meta name="description" content={data.stop_name} />
</svelte:head>

<div class="flex justify-center w-full h-full">
  <div class="relative lg:justify-between justify-center flex h-full w-full">
    <div
      class="lg:flex w-fit pr-1 hidden justify-start flex-shrink-0 flex-grow basis-1 justify-self-start min-w-fit"
    >
      <div class="lg:block hidden shrink-0 min-w-fit">
        <Stops />
      </div>
    </div>
    <div class="flex justify-center sm:min-w-fit px-1">
      <slot />
    </div>
    <!-- <div>
            <Settings/>
        </div> -->
    <!-- <span class="divider-vertical h-full mx-2 xl:block hidden" /> -->
    <!-- <div class="hidden xl:block shrink-0">
            <Map/>
        </div> -->
    <!-- <span class="divider-vertical h-full mx-2 hidden xl:block " /> -->
    <div class="lg:flex w-fit hidden flex-shrink flex-grow basis-1 relative" />
  </div>
</div>
