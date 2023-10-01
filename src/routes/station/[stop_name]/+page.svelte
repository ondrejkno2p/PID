<script lang="ts">
	import StationDepartureBoard from "$lib/StationDepartureBoard.svelte";
    import {title} from '$lib/stores'
    export let data;
    $:departures = data.departures as departure[]
    $:arrivals = data.arrivals as departure[]
    $:name=data.stop_name as string
    $:$title=name;
</script>
<StationDepartureBoard arrivals={arrivals} departures={departures} name={name}/>