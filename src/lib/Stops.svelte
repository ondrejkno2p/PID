<script lang="ts">
  import Stop from "./Stop.svelte";
  import { found_stops, settings } from "$lib/stores";
  import { page } from "$app/stores";
</script>

{#if $found_stops.length > 0}
  <div
    class="card max-w-sm w-full overflow-hidden max-h-screen overflow-y-auto !rounded-none !rounded-br-container-token"
  >
    <a
      class={"block px-4 py-1 w-full hover:bg-surface-300-600-token" +
        (!$page.params.stop_id ? " !bg-primary-500 text-base-token" : "")}
      href={"/station/" +
        $found_stops[0].name +
        "?limit=" +
        $settings.limit +
        "&minutesOffset=" +
        $settings.minutesOffset}
    >
      {$found_stops[0].name}
    </a>
    <hr />
    <ol class="list w-full !m-0">
      {#each $found_stops as result (result.id)}
        <Stop id={result.id} name={result.name} platform={result.platform} />
      {/each}
    </ol>
  </div>
{/if}
