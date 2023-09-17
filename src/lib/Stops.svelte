<script lang="ts">
    import Stop from "./Stop.svelte";
    import { found_stops } from "$lib/stores";
    import { onMount } from "svelte";
    // let mounted=false;
    // onMount(()=>{
    //     mounted=true;
    // })
</script>
<div class="stops">
    {#each $found_stops as result (result.id)}
        <Stop id={result.id} name={result.name} platform={result.platform}/>
    {/each}
</div>
<style>
    div.stops {
        display: flex;
        flex-direction: column;
        font-size: x-large;
        border: 2px solid var(--grey);
        border-top: 0px;
        border-radius: 0.5em;
        overflow: hidden;
        height: fit-content;
        width: auto;
    }
</style>