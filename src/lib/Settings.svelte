<script lang="ts">
  import { settings } from "$lib/stores";
  import { page } from "$app/stores";
  let limit = $settings.limit;
  $: limit = $settings.limit;
  let minutesOffset = $settings.minutesOffset;
  $: minutesOffset = $settings.minutesOffset;
</script>

<div class="h-fit card p-2 rounded-t-none">
  <div class="grid grid-cols-[43px,10rem,43px]">
    <button
      class="btn-icon variant-filled-primary rounded-r-none"
      on:click={() => {
        minutesOffset = minutesOffset - 5;
      }}
    >
      -5
    </button>
    <button
      class="flex justify-center items-center border-solid border-2 border-primary-500"
      on:click={() => {
        minutesOffset = 0;
      }}
    >
      <div class="w-fit h-fit">
        {minutesOffset > 0 ? "+" : ""}{Math.floor(minutesOffset / 60) > 0
          ? Math.floor(minutesOffset / 60) + " h"
          : ""}{minutesOffset % 60} min.
      </div>
    </button>
    <button
      class="btn-icon variant-filled-primary rounded-l-none"
      on:click={() => {
        minutesOffset = minutesOffset + 5;
      }}
    >
      +5
    </button>
  </div>

  <br />
  <a
    class="btn-icon variant-filled-primary"
    href="{$page.url.href.split(
      '?'
    )[0]}?limit={limit}&minutesOffset={minutesOffset}"
  >
    set
  </a>
</div>
