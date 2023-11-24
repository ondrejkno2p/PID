<script lang="ts">
  import { page } from "$app/stores";
</script>

{#if $page.error?.message}
  <div class="flex justify-center w-full h-full p-4">
    <h1 class="text-2xl">Zastávka nenalezena</h1>
  </div>
{/if}
