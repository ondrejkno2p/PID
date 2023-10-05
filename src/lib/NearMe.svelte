<script lang="ts">
	import { goto } from "$app/navigation";
	import { faLocationDot, faSpinner } from "@fortawesome/free-solid-svg-icons";
	import { onMount } from "svelte";
	import Fa from "svelte-fa";
    let waiting = false;
    const onClick = ()=>{
        waiting=true;
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async (pos)=>{
                const stop = await (await fetch('/api/nearme?lat='+pos.coords.latitude+'&lon='+pos.coords.longitude)).json()
                waiting=false;
                goto('/station/'+stop.name)
            })
        }
    }
    let mounted = false;
    onMount(()=>{
        mounted = true
    })
    
</script>
<button class='btn-icon variant-filled-primary' disabled={!mounted || !navigator.geolocation} on:click={onClick}>
    {#if !waiting}
        <Fa icon={faLocationDot}/>
    {:else}
        <Fa spin={true} icon={faSpinner}/>
    {/if}
</button>
