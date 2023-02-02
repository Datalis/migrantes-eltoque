<script>

	import Grid from "./grid.svelte";

    /**
	 * @type {any[]}
	 */
     export let deceased = [];

</script>
<section class="section-4 bg-dark min-h-screen">
    <!-- <div class="container mx-auto">
        <Grid />
    </div> -->
    <Grid data={deceased} />
</section>