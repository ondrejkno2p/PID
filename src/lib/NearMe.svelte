<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    faLocationDot,
    faSpinner,
    faX,
  } from "@fortawesome/free-solid-svg-icons";
  import { onMount } from "svelte";
  import Fa from "svelte-fa";
  let waiting = false;
  let error = false;
  const onClick = () => {
    waiting = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          fetch(
            "/api/nearme?lat=" +
              pos.coords.latitude +
              "&lon=" +
              pos.coords.longitude
          )
            .then((res) => {
              return res.json();
            })
            .then((body) => {
              waiting = false;
              const stop = body as stop;
              goto("/station/" + stop.name);
            })
            .catch(() => {
              waiting = false;
              error = true;
            });
        },
        () => {
          waiting = false;
          error = true;
        }
      );
    }
  };
  let mounted = false;
  onMount(() => {
    mounted = true;
  });
</script>

{#if !error}
  <button
    aria-label="Najít nejbližší zastávku"
    class="btn-icon variant-filled-primary"
    disabled={!mounted || !navigator.geolocation}
    on:click={onClick}
  >
    {#if !waiting}
      <Fa icon={faLocationDot} />
    {:else}
      <Fa spin={true} icon={faSpinner} />
    {/if}
  </button>
{:else}
  <button
    class="btn-icon variant-filled-error"
    on:click={() => {
      error = false;
    }}
  >
    <Fa icon={faX} />
  </button>
{/if}
