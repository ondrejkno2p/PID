<script lang="ts">
    import Stop from "./Stop.svelte";
    import { found_stops, hover_stop } from "$lib/stores";
    import { onMount } from "svelte";
    // let mounted=false;
    // onMount(()=>{
    //     mounted=true;
    // })
    $hover_stop=''
    onMount(()=>{
        $hover_stop=''
    })
</script>
<div class="card max-w-sm w-full overflow-hidden">
        <a class="block px-4 py-2 w-full"  href={"/station/"+$found_stops[0].name}>
            {$found_stops[0].name}
        </a>

    <ol class="list w-full !m-0">
        {#each $found_stops as result (result.id)}
            <Stop id={result.id} name={result.name} platform={result.platform}/>
        {/each}
    </ol>
</div>

