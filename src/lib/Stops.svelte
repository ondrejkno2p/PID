<script lang="ts">
    import Stop from "./Stop.svelte";
    import { found_stops, hover_stop } from "$lib/stores";
    import { onMount } from "svelte";
	import { page } from "$app/stores";
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
        <a class={"block px-4 py-1 w-full hover:bg-surface-300-600-token" + (!$page.params.stop_id?" !bg-primary-500 text-base-token":"")}  href={"/station/"+$found_stops[0].name}>
            {$found_stops[0].name}
        </a>
    <hr>
    <ol class="list w-full !m-0">
        {#each $found_stops as result (result.id)}
            <Stop id={result.id} name={result.name} platform={result.platform}/>
        {/each}
    </ol>
</div>

