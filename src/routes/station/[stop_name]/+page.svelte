<script lang="ts">
	import DepartureBoard from "$lib/DepartureBoard.svelte";
    import {title, settings} from '$lib/stores'
    export let data;
    $:departures = data.departures as departure[]
    $:arrivals = data.arrivals as departure[]
    $:name=data.stop_name as string
    $:$title=name;
    $settings.limit = data.limit
    $: $settings.limit = data.limit
    $settings.minutesOffset = data.minutesOffset
    $: $settings.minutesOffset = data.minutesOffset
</script>
<DepartureBoard arrivals={arrivals} departures={departures} name={name}/>