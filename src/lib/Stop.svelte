<script lang="ts">
  export let name: string;
  export let platform: string;
  export let id: string;
  import { settings } from "./stores";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();
  import { page } from "$app/stores";
</script>

<li
  class={"!m-0 w-full !rounded-none " +
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
  >
    {name}{platform ? " (" + platform + ")" : ""}
  </a>
</li>
