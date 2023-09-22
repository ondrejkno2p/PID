<script lang="ts">
    import Trip from "$lib/Trip.svelte";
import type {  PageData } from "./$types";

    export let data:PageData
</script>
<div class="flex justify-center">
    <Trip trip={data.trip} stop_id={data.stop_id}/>
</div>
