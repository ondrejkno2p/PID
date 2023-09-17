<script lang="ts">
    import { clickOutside } from 'svelte-use-click-outside';
    import { onMount,beforeUpdate, afterUpdate} from "svelte";
    import SearchResult from "./Stop.svelte";
    import {found_stops, search_stop_name} from "$lib/stores"
    import { goto } from "$app/navigation";
    let stop_name=$search_stop_name
    let results = Promise.resolve<stop[]>([]);
    let search_suggestions = Promise.resolve<string[]>([]);
    async function find_stop() {
        search_suggestions=Promise.resolve<string[]>([]);
        const url = "/api/find_stop?stop_name=" + encodeURI(stop_name);
        const response = await fetch(url);
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            throw new Error(String(response.status));
        }
    }
    async function get_suggestion(stop_name:string) {
        if(stop_name.length<=2){
            suggestions=[];
            return Promise.resolve<string[]>([])
        }
        const url = "/api/autofill?search_name=" + encodeURI(stop_name);
        const response = await fetch(url);
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            throw new Error(String(response.status));
        }
    }
    let mounted = false;
    onMount(() => {
        mounted = true;
    });
    let suggestions:Array<string>=[];
    const gotoStation=(value:Array<stop>)=>{$found_stops=value;goto("/station/"+stop_name,{replaceState:true})
}

</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="search" use:clickOutside={()=>{suggestions=[];}}>
    <form>
        <input placeholder={$search_stop_name} bind:value={stop_name}
        on:input={
                ()=>{
                    search_suggestions=get_suggestion(stop_name).then((value)=>{suggestions=value; return value})
                }
            }
        />
        <button
            on:click={() => {
                results = find_stop();
                results.then(gotoStation)
            }}
        >
        <i class="fa fa-search"></i>
        </button>
    </form>
    <div class="suggestions">
        <ul>
            {#if suggestions.length>0}
                {#each suggestions as search_suggestions}
                    <li
                    on:keydown={() => {
                        stop_name=search_suggestions;
                        results = find_stop();
                        suggestions = [];
                        results.then(gotoStation)}
                        
                    }
                    on:click={() => {
                        stop_name=search_suggestions;
                        results = find_stop();
                        suggestions = [];
                        results.then(gotoStation);
                    }
                    
                    } data-sveltekit-preload-data="hover"
                    >
                        {search_suggestions}
                    </li>
                {/each}
            {:else}
                {#if mounted}
                    {#await search_suggestions}
                    ...
                    {/await}
                {/if}
            {/if}
        </ul>
    </div>
</div>
<style>
    div.search {
        position: relative;
    }
    form {
        display: flex;
        width: 100%;
        border: solid 2px var(--grey);
        border-bottom: 0px;
        border-top-right-radius: 0.5em;
        border-top-left-radius: 0.5em;
        overflow: hidden;
    }
    form button {
        all:unset;
        font-size: x-large;
        width: 10%;
        background-color: var(--yellow);
        color: black;
        text-align: center;
        padding: 0.2em;
    }
    form button:hover {
        background-color: color-mix(in srgb,var(--yellow),white 15%);
    }
    form input {
        all:unset;
        font-size: x-large;
        width: 90%;
        background-color: white;
        color: black;
        padding: 0.2em;
    }
    div.suggestions {
        position: absolute;
        z-index: 90;
        display: block;
        margin: 0;    
        padding: 0;    
        max-height: 12em;
        overflow-y: scroll;
        width: 100%;
        border-bottom-left-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
        border-left: solid 2px var(--grey);
        border-right: solid 2px var(--grey);
        border-bottom: solid 2px var(--grey);;
    }
    div.suggestions ul {
        all:unset;
        background-color: white;
        color: black;
        font-size: x-large;
        display: block;
        width: 100%;
    }
    div.suggestions ul li {
        list-style: none;
        cursor: pointer;
        padding: 0.2em;
        border-top: 1px var(--grey) solid;
        background-color: white;
    }
    div.suggestions ul li:hover {
        background-color: var(--yellow);
    }
</style>
