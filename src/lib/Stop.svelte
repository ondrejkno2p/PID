<script lang="ts">
    export let name:string;
    export let platform:string;
    export let id:string;
    import { hover_stop } from "./stores";
    const focus = ()=>{$hover_stop=id};
    const blur = ()=>{$hover_stop=''};
</script>
<li class={"w-full !rounded-none "+($hover_stop==id?" bg-primary-300-600-token":"")}>
    <a class="w-full" href={"/station/" + encodeURI(name) + "/" + id} on:blur={blur} on:mouseout={blur} on:focus={focus} on:mouseover={focus}>
        {name}{(platform?' ('+platform+')':'')}
    </a>
</li>


