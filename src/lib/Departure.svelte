<script lang="ts">
    export let departure:departure;
    import {settings} from '$lib/stores'
    function delay_string(delay_seconds:number){
        let string="";
        if(Math.floor(delay_seconds/60)!=0){
            string+=Math.floor(delay_seconds/60).toString()+'\''
        }
        if(delay_seconds%60!=0){
            string+=string?" ":""
            string+=(delay_seconds%60).toString()+'\'\''
        }
        return string;
    };
    function hh_mm(time:Date){
        const lts = (new Date(time)).toLocaleTimeString();
        const arr = lts.split(':',2);
        const string = arr[0]+':'+arr[1];
        return string;
    };
    import {navigating, page} from '$app/stores'
</script>

<tr>
    {#if departure.platform!==null}
        <td class="!p-0">
            <a class="block px-3" href={"/station/"+$page.params.stop_name+"/"+departure.stop_id+"?limit="+$settings.limit+"&minutesOffset="+$settings.minutesOffset}>
                {departure.platform}
            </a>
        </td> 
    {/if}
    <td><a href="/trip/{departure.trip_id}?stop_name={$page.params.stop_name}&stop_id={departure.stop_id}#{departure.stop_id}">{departure.name}</a></td>
    <td>
        <div class="block overflow-ellipsis overflow-hidden">
            {departure.headsign}
        </div>
    </td>
    <td>{hh_mm(departure.scheduled)}</td>
    <td class="hidden sm:table-cell text-on-error-token" style="color:red;">{delay_string(departure.delay)}</td>
    <td class="hidden sm:table-cell">{departure.minutes}</td>
</tr>