<script lang="ts">
    export let departure:departure;
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
</script>

<tr>
    <td><a href="/trip/{departure.trip_id}">{departure.name}</a></td>
    <td>{departure.headsign}</td>
    <td>{hh_mm(departure.scheduled)}</td>
    <td style="color:red;">{delay_string(departure.delay)}</td>
    <td>{departure.minutes}</td>
</tr>