<script lang="ts">
    import type {  PageData } from "./$types";

    export let data:PageData;
    $: name = data.trip.name
    $: headsign = data.trip.headsign
    $: stop_times = data.trip.stop_times
    $: last_stop = stop_times[stop_times.length-1]
    function hh_mm(time:string){
        const arr = time.split(':',2);
        const string = arr[0]+':'+arr[1];
        return string;
    };
</script>
<div class="card h-max">
    
    <h4>{name} směr
        <a href={"/station/" + encodeURI(last_stop.stop_name) + "/" + last_stop.stop_id}>
            {last_stop.stop_name} {#if last_stop.platform} ({last_stop.platform}) {/if}
        </a>
    </h4>
    <div class="table-container !w-fit">

    <table class="table table-hover table-compact min-w-full overflow-y-scroll">
        <thead>
            <td class="w-64">
                Zastávka
            </td>
            <td class="w-32">
                Příjezd
            </td>
            <td class="w-32">
                Odjezd
            </td>
        </thead>
        <tbody >
        {#each stop_times as stop_time}
            <tr>
                <td>
                    <a href={"/station/" + encodeURI(stop_time.stop_name) + "/" + stop_time.stop_id}> 
                        {stop_time.stop_name} {#if stop_time.platform} ({stop_time.platform}) {/if}
                    </a>
                </td>
                <td>
                    {#if stop_time.departure!=stop_time.arrival}
                    {stop_time.arrival}
                    {/if}
                </td>
                <td>
                    {stop_time.departure}
                </td>
            </tr>
        {/each}
    </tbody>
            
    </table>
</div>

</div>

