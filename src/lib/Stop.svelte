<script lang="ts">
  export let name: string;
  export let platform: string;
  export let id: string;
  import { hover_stop, settings } from "./stores";
  const focus = () => {
    $hover_stop = id;
  };
  const blur = () => {
    $hover_stop = "";
  };
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();
  import { page } from "$app/stores";
</script>

<li
  class={"!m-0 w-full !rounded-none " +
    ($hover_stop == id ? " bg-surface-300-600-token " : "") +
    ($page.params?.stop_id == id ? "!bg-primary-500 text-base-token" : "")}
>
  <a
    class="px-4 py-1 w-full"
    href={"/station/" +
      encodeURI(name) +
      "/" +
      id +
      "?limit=" +
      $settings.limit +
      "&minutesOffset=" +
      $settings.minutesOffset}
    on:blur={blur}
    on:mouseout={blur}
    on:focus={focus}
    on:mouseover={focus}
    on:click={() => {
      $hover_stop = "";
      drawerStore.close();
    }}
  >
    {name}{platform ? " (" + platform + ")" : ""}
  </a>
</li>
