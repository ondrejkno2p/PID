<script lang="ts">
    import Stop from "./Stop.svelte";
    import { found_stops } from "$lib/stores";
    import { onMount } from "svelte";
    // let mounted=false;
    // onMount(()=>{
    //     mounted=true;
    // })
</script>
<div class="card h-fit max-w-sm overflow-hidden">
    <ol class="list w-full p-2">
        {#each $found_stops as result (result.id)}
            <Stop id={result.id} name={result.name} platform={result.platform}/>
        {/each}
    </ol>
</div>

