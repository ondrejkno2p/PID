<script lang="ts">
    import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import { last_page } from "./stores";
    import Fa from "svelte-fa";
</script>
<a href={$last_page}>
    <button
      aria-label="Zpět k odjezdům"
      class="btn-icon variant-filled-primary"
    >
      <Fa icon={faArrowLeft} />
    </button>
</a>