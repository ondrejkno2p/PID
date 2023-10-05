<script lang="ts">
	import '../app.postcss';
	import FindStop from "$lib/FindStop.svelte";
	import {faBars, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
	import Map from "$lib/Map.svelte";
	import Stops from "$lib/Stops.svelte";
	import { found_stops, hover_stop, search_stop_name, title } from "$lib/stores";
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
	const drawerStore = getDrawerStore();
	import {page} from '$app/stores'
	import { afterNavigate, beforeNavigate, goto, onNavigate } from '$app/navigation';
	import {last_page} from '$lib/stores'
	$last_page = null;
	import {Fa} from 'svelte-fa/src'
	import NearMe from '$lib/NearMe.svelte';
	
	afterNavigate((navigation)=>{
		$last_page = navigation?.from?.url?.href?navigation.from.url.href:null
	})

	afterNavigate((params: any) => {
		if(!$page.url.hash){
			const isNewPage: boolean = params.from && params.to && params.from.route.id !== params.to.route.id;
			const elemPage = document.querySelector('#page');
			if (isNewPage && elemPage !== null) {
				elemPage.scrollTop = 0;
			}
		}
	});
</script>
<svelte:head>
	<title>
		{$title}
	</title>
</svelte:head>
<AppShell >
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-[60px_auto_0px] sm:grid-cols-[60px_auto_60px]">
			<svelte:fragment slot="lead">
				<!-- <strong class="hidden lg:block text-3xl uppercase"><a href="/">PID</a></strong> -->
				{#if ($page.route.id=="/station/[stop_name]" || $page.route.id=="/station/[stop_name]/[stop_id]") && $page.params.stop_name}
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
					<strong class="hidden lg:block text-3xl uppercase"><a href="/">PID</a></strong>
					
				{:else if ($last_page && $page.route.id=="/trip/[trip_id]" && $page.params.trip_id) || ($page.url.searchParams.get('stop_name'))}
					<a href="{$last_page}" data-sveltekit-preload-data>
						<button class="btn-icon variant-filled-primary">
							<Fa icon={faArrowLeft}/>
						</button>
					</a>
				{:else}
					<strong class="text-3xl uppercase"><a href="/">PID</a></strong>
				{/if}
			</svelte:fragment>
			<div class="self-center justify-center flex h-[43px]">
				<FindStop/>
				<div class='px-2'>
					<NearMe/>
				</div>
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
		<hr>
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
		{/if}
	</Drawer>
</AppShell>

