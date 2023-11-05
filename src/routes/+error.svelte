<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { last_page } from "$lib/stores";
  import { onMount } from "svelte";
  onMount(() => {
    goto("/");
  });
</script>

{$page.error?.message}
