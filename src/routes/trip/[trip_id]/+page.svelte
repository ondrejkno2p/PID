<script lang="ts">
  import Trip from "$lib/Trip.svelte";
  import type { PageData } from "./$types";
  import { last_page } from "$lib/stores";
  export let data: PageData;
  if (!data.stop_name || !data.stop_id) {
    $last_page = null;
  } else if (data.stop === "false") {
    $last_page = "/station/" + data.stop_name;
  } else {
    $last_page = "/station/" + data.stop_name + "/" + data.stop_id;
  }
</script>

<div class="flex justify-center">
  <Trip trip={data.trip} stop_id={data.stop_id} />
</div>
