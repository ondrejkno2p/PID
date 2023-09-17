<script lang="ts">
	import '../app.postcss';
	import FindStop from "$lib/FindStop.svelte";
	import Map from "$lib/Map.svelte";
	import Stops from "$lib/Stops.svelte";
	import { found_stops, search_stop_name } from "$lib/stores";
	import "../app.postcss";
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	$found_stops = [];
	$search_stop_name = "";	
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">PID</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="sidebarLeft">
		<FindStop />
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<h2>Data poskytnuta projektem Golem</h2>
	</svelte:fragment>
</AppShell>
