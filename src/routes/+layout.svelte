<script lang="ts">
	import '../app.postcss';
	import FindStop from "$lib/FindStop.svelte";
	import Map from "$lib/Map.svelte";
	import Stops from "$lib/Stops.svelte";
	import { found_stops, search_stop_name } from "$lib/stores";
	import "../app.postcss";
	import { AppBar, AppRail, AppRailAnchor, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	$found_stops = [];
	import { LightSwitch } from '@skeletonlabs/skeleton';
	$search_stop_name = "";	
	import Stop from "$lib/Stop.svelte";
	import { onMount } from "svelte";

</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-3xl uppercase">PID</strong>
			</svelte:fragment>
			<div class="self-center justify-center flex">
				<FindStop/>
			</div>
			<svelte:fragment slot="trail">
				<LightSwitch/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="footer">
		<h2>Data poskytnuta projektem Golem</h2>
	</svelte:fragment>
</AppShell>
