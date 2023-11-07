<script lang="ts">
  import { settings } from "$lib/stores";
  import { page } from "$app/stores";

  export let departure: departure;
  function delay_string(delay_seconds: number) {
    let string = "";
    if (Math.floor(delay_seconds / 60) != 0) {
      string += Math.floor(delay_seconds / 60).toString() + "'";
    }
    if (delay_seconds % 60 != 0) {
      string += string ? " " : "";
      string += (delay_seconds % 60).toString() + "''";
    }
    return string;
  }
  function hh_mm(time: Date) {
    const lts = new Date(time).toLocaleTimeString();
    const arr = lts.split(":", 2);
    const string = arr[0] + ":" + arr[1];
    return string;
  }
</script>

<tr class="even:backdrop-brightness-95">
  {#if departure.platform !== null}
    <td class="">
      <a
        class="block hover:bg-surface-300-600-token text-center p-3"
        href={"/station/" +
          $page.params.stop_name +
          "/" +
          departure.stop_id +
          "?limit=" +
          $settings.limit +
          "&minutesOffset=" +
          $settings.minutesOffset}
      >
            {departure.platform}    
      </a>

    </td>
  {/if}
  <td class="">
    <a
      class="block hover:bg-surface-300-600-token text-center p-3"
      href="/trip/{departure.trip_id}?stop_name={$page.params
        .stop_name}&stop_id={departure.stop_id}&stop={departure.platform===null}#{departure.stop_id}"
      >
        {departure.name}
      </a
    >
  </td>

  <td>
    <div class="block overflow-ellipsis overflow-hidden">
      {departure.headsign}
    </div>
  </td>
  <td>{hh_mm(departure.scheduled)}</td>
  <td class="hidden sm:table-cell text-on-error-token" style="color:red;"
    >{delay_string(departure.delay)}</td
  >
  <td class="hidden sm:table-cell">{departure.minutes}</td>
</tr>
