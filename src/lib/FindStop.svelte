<script lang="ts">
  import { clickOutside } from "svelte-use-click-outside";
  import { onMount } from "svelte";
  import { found_stops, search_stop_name } from "$lib/stores";
  import { goto } from "$app/navigation";
  let stop_name = $search_stop_name;
  let search_suggestions = Promise.resolve<string[]>([]);
  import Fa from "svelte-fa";
  import {
    faMagnifyingGlass,
    faSpinner,
  } from "@fortawesome/free-solid-svg-icons";
  import { Autocomplete } from "@skeletonlabs/skeleton";
  import { navigating } from "$app/stores";
  async function get_suggestion(stop_name: string) {
    if (stop_name.length <= 2) {
      suggestions = [];
      return Promise.resolve<string[]>([]);
    }
    const url = "/api/autofill?search_name=" + encodeURI(stop_name);
    const response = await fetch(url);
    if (response.ok) {
      const body = await response.json();
      return body;
    } else {
      throw new Error(String(response.status));
    }
  }
  let suggestions: Array<string> = [];
</script>

<div
  use:clickOutside={() => {
    suggestions = [];
  }}
  class="max-w-full lg:max-w-sm relative"
>
  <div class="flex input-group w-full">
    <input
      type="search"
      placeholder="Najdi Zastávku..."
      bind:value={stop_name}
      class="w-full p-2 rounded-bl-full rounded-tl-full"
      on:input={() => {
        search_suggestions = get_suggestion(stop_name)
          .then((value) => {
            suggestions = value;
            return value;
          })
          .catch(() => {});
      }}
    />
    <button
      aria-label="Najít zastávku"
      class="btn variant-filled-primary rounded-tl-none rounded-bl-none min-w-fit"
      disabled={!!$navigating || stop_name.length == 0}
      on:click={() => {
        goto("/station/" + stop_name);
      }}
    >
      {#if !$navigating}
        <Fa icon={faMagnifyingGlass} />
      {:else}
        <Fa spin={true} icon={faSpinner} />
      {/if}
    </button>
  </div>
  {#if suggestions.length != 0}
    <div
      class="absolute z-10 card w-full min-w-sm max-h-48 p-0 overflow-y-scroll overflow-x-hidden"
    >
      <Autocomplete
        transitions={false}
        on:selection={(event) => {
          suggestions = [];
          stop_name = event.detail.label;
          goto("/station/" + stop_name);
        }}
        options={suggestions.flatMap((value) => {
          return {
            value: value,
            label: value,
          };
        })}
      />
    </div>
  {/if}
</div>
