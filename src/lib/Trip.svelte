<script lang="ts">
    export let trip:trip;
    export let stop_id:string|null;
    $: name=trip.name;
    $: headsign = trip.headsign;
    $: stop_times = trip.stop_times;
    $: last_stop = stop_times[stop_times.length-1];
    function hh_mm(time:string){
        const arr = time.split(':',2);
        const string = arr[0]+':'+arr[1];
        return string;
    };
    const scrollToBottom = async (node:HTMLElement) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    };
</script>
<div class="relative card max-h-full w-full rounded-none rounded-br-container-token rounded-bl-container-token max-w-md">

    <div class="text-xl p-2 overflow-ellipsis overflow-hidden">
        Linka {name} směr
        <a href={"/station/" + encodeURI(last_stop.stop_name) + "/" + last_stop.stop_id}>
            {last_stop.stop_name} {#if last_stop.platform} ({last_stop.platform}) {/if}
        </a>
    </div>
    <div class="table-container rounded-none rounded-br-container-token rounded-bl-container-token ">

    <table class="table table-hover table-compact min-w-full rounded-none rounded-br-container-token rounded-bl-container-token ">
        <thead>
            <th class="text-left">
                Zastávka
            </th>
            <th class="text-left">
                Odjezd
            </th>
        </thead>
        <tbody >
        {#each stop_times as stop_time (stop_time.stop_id)}
            <tr id={stop_time.stop_id} class={stop_id&&stop_id===stop_time.stop_id?"!variant-filled-primary":""}>
                <td>
                    <a href={"/station/" + encodeURI(stop_time.stop_name) + "/" + stop_time.stop_id}> 
                        {stop_time.stop_name} {#if stop_time.platform} ({stop_time.platform}) {/if}
                    </a>
                </td>
                <td>
                    {hh_mm(stop_time.departure)}
                </td>
            </tr>
        {/each}
    </tbody>
            
    </table>
</div>
</div>
