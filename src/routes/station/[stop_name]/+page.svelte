<script lang="ts">
  import DepartureBoard from "$lib/DepartureBoard.svelte";
  import { title, settings } from "$lib/stores";
  export let data;
  let departures = data.departures;
  $: departures = data.departures;
  let arrivals = data.arrivals;
  $: arrivals = data.arrivals;
  let name = data.stop_name;
  $: name = data.stop_name;
  $title = name;
  $: $title = name;
  $settings.limit = data.limit;
  $: $settings.limit = data.limit;
  $settings.minutesOffset = data.minutesOffset;
  $: $settings.minutesOffset = data.minutesOffset;
</script>

<DepartureBoard {arrivals} {departures} {name} />
