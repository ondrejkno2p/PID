<script lang="ts">
    export let name:string;
    export let platform:string;
    export let id:string;
    import { hover_stop } from "./stores";
    const focus = ()=>{$hover_stop=id};
    const blur = ()=>{$hover_stop=''};
</script>
    <div style="background-color:{$hover_stop==id?"var(--yellow)":"white"}">
        <a href={"/station/" + encodeURI(name) + "/" + id} on:blur={blur} on:mouseout={blur} on:focus={focus} on:mouseover={focus}>
            {name}{(platform?' ('+platform+')':'')}
        </a>

    </div>
<style>
    div {
        all:unset;
        font-size:x-large;
        background-color: white;
        color:black;
        border-top: 2px solid var(--grey);
        padding: 0.2em;
        display: block;
    }
    a {
        display: block;
    }
</style>