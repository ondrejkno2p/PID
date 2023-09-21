<script lang="ts">
    import { clickOutside } from 'svelte-use-click-outside';
    import { onMount,beforeUpdate, afterUpdate} from "svelte";
    import SearchResult from "./Stop.svelte";
    import {found_stops, search_stop_name} from "$lib/stores"
    import { goto } from "$app/navigation";
    let stop_name=$search_stop_name
    let results = Promise.resolve<stop[]>([]);
    let search_suggestions = Promise.resolve<string[]>([]);
    import Fa from 'svelte-fa/src/fa.svelte'
    import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
	import { Autocomplete } from '@skeletonlabs/skeleton';
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
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div use:clickOutside={()=>{suggestions=[];}} class="max-w-full lg:max-w-xs relative">
    <div class="flex input-group">
        <input type="search" placeholder="Najdi Zastávku..." bind:value={stop_name} class="w-full p-2 rounded-bl-full rounded-tl-full"
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
            class="btn variant-filled-primary rounded-tl-none rounded-bl-none min-w-fit"
        >
        <Fa icon={faMagnifyingGlass}>
        </Fa>
        </button>
    </div>
    {#if suggestions.length!=0}
    <div class="absolute z-10 card w-full max-w-sm max-h-48 p-0 overflow-y-auto">
            <Autocomplete
                transitions={false}
                on:selection={(event)=>{
                    stop_name=event.detail.label
                    results = find_stop();
                    suggestions = [];
                    results.then(gotoStation);
                }}
                bind:input={stop_name}
                options={suggestions.flatMap((value)=>{
                    return {
                        value:value,
                        label:value,
                    }
                })}
            />
    </div>
    {/if}


</div>