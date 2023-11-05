<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import Trip from "$lib/Trip.svelte";
  import type { PageData } from "./$types";
  import { last_page } from "$lib/stores";
  import { page } from "$app/stores";
  export let data: PageData;
  if (!$last_page) {
    if (!data.stop_name) {
      $last_page = null;
    } else if (!data.stop_id) {
      $last_page = "/station/" + data.stop_name;
    } else {
      $last_page = "/station/" + data.stop_name + "/" + data.stop_id;
    }
  }
</script>

<div class="flex justify-center">
  <Trip trip={data.trip} stop_id={data.stop_id} />
</div>
