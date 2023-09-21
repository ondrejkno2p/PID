<script lang="ts">
	import '../app.postcss';
	import FindStop from "$lib/FindStop.svelte";
	import {faBars, faMapLocationDot} from '@fortawesome/free-solid-svg-icons'
	import Map from "$lib/Map.svelte";
	import Stops from "$lib/Stops.svelte";
	import { found_stops, hover_stop, search_stop_name } from "$lib/stores";
	import "../app.postcss";
	import { AppBar, AppRail, AppRailAnchor, AppRailTile, AppShell, Drawer } from '@skeletonlabs/skeleton';
	$found_stops = [];
	import { LightSwitch } from '@skeletonlabs/skeleton';
	$search_stop_name = "";	
	import Stop from "$lib/Stop.svelte";
	import { onMount } from "svelte";
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
	import { getDrawerStore } from "@skeletonlabs/skeleton";
	import Fa from 'svelte-fa/src/fa.svelte';
	const drawerStore = getDrawerStore();
</script>

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="hidden lg:block text-3xl uppercase"><a href="/">PID</a></strong>
				<button class="lg:hidden btn-icon variant-filled-primary"
				on:click={()=>{
					$hover_stop=''
					drawerStore.open({
						id:"stops",
						position:"left",
						rounded:"!rounded-none"
					})}}>
					<Fa icon={faBars}/>
				</button>
				<!-- <button class="xl:hidden btn-icon variant-filled-primary"
				on:click={()=>{
					$hover_stop=''
					drawerStore.open({
						id:"map",
						position:"right"
					})}}>
					<Fa icon={faMapLocationDot}/>
				</button> -->
			</svelte:fragment>
			<div class="self-center justify-center flex">
				<FindStop/>
			</div>
			<svelte:fragment slot="trail">
				<div class="hidden sm:block">
					<LightSwitch/>
				</div>
			</svelte:fragment>
		</AppBar>
		<hr>

	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
		<div class="flex justify-between p-2">
			<h2>Data poskytnuta Golem.io</h2>
			<div class="sm:hidden">
				<LightSwitch/>
			</div>
		</div>

	</svelte:fragment>

	<Drawer
	width="w-fit"
	height="h-fit"
	padding='p-0'
	rounded='!rounded-none'
	bgDrawer='bg-transparent'
	>
		{#if $drawerStore.id === 'stops'}
			<Stops/>
		<!-- {:else if $drawerStore.id === 'map'}
			<Map/> -->
		{/if}
	</Drawer>
</AppShell>

