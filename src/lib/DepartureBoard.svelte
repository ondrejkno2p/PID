<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { settings } from "$lib/stores";
  import Departure from "./Departure.svelte";
  import { faSpinner } from "@fortawesome/free-solid-svg-icons";

  export let departures: departure[] | null = [];
  export let arrivals: departure[] | null = [];
  export let name: string;
  export let stop_id: string | null = null;
  let loading: boolean = false;
  import { mode_arrival } from "$lib/stores";
  import { faL } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  let new_departures: Promise<departure[]>;
  async function fetchDepartures() {
    const response = await fetch(
      "/api/departures?name=" +
        encodeURI(name) +
        "&mode=departures" +
        "&limit=" +
        $settings.limit +
        "&minutesOffset=" +
        $settings.minutesOffset +
        (stop_id ? "&id=" + stop_id : "")
    );
    const body = (await response.json()) as {
      departures: departure[];
      arrivals: departure[];
    };
    if (response.ok) {
      return {
        departures: body.departures,
        arrivals: body.arrivals,
      };
    } else {
      throw new Error("F");
    }
  }
  let interval: string | number | NodeJS.Timeout | undefined;
  onMount(() => {
    interval = setInterval(() => {
      loading = true;
      new_departures = fetchDepartures().then(
        (value) => {
          departures = value.departures;
          arrivals = value.arrivals;
          loading = false;
          return value;
        },
        (reason) => {
          loading = false;
          return reason;
        }
      );
    }, 30000);
  });
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div
  class="card h-max shrink-0 sm:w-fit w-full rounded-none rounded-bl-container-token rounded-br-container-token"
>
  <div class="table-container">
    <table
      class="table-fixed max-w-[100vw] sm:max-w-2xl max-h-xl overflow-hidden rounded-none rounded-bl-container-token rounded-br-container-token"
    >
      <caption class="text-xl p-4 text-left">
        <div class="flex justify-between">
          {name}
          {#if loading}
            <Fa icon={faSpinner} rotate={true} />
          {/if}
        </div>
      </caption>
      <thead class=" bg-surface-200-700-token">
        <tr>
          {#if !stop_id}
            <th class="sm:w-8 w-8" scope="col">P</th>
          {/if}
          <th class="sm:w-20 w-20" scope="col">Linka</th>
          <th class="sm:w-52 overflow-ellipsis overflow-hidden" scope="col"
            >Směr</th
          >
          <th class="sm:w-24 w-24" scope="col"
            >{$mode_arrival ? "Příjezd" : "Odjezd"}</th
          >
          <th class="p-4 sm:w-28 hidden sm:table-cell" scope="col">Zpoždění</th>
          <th class="sm:w-16 hidden sm:table-cell" scope="col">Za</th>
        </tr>
      </thead>
      <tbody class="overflow-y-scroll">
        {#if $mode_arrival && arrivals}
          {#each arrivals as arrival ([arrival.trip_id, arrival.stop_id])}
            <Departure departure={arrival} />
          {/each}
        {:else if departures}
          {#each departures as departure ([departure.trip_id, departure.stop_id])}
            <Departure {departure} />
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>
