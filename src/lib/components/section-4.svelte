<script>

	import Grid from "./grid.svelte";

    /**
	 * @type {any[]}
	 */
     export let data = [];

</script>
<section class="section-4 bg-dark min-h-screen">
    <!-- <div class="container mx-auto">
        <Grid />
    </div> -->
    <Grid data={data} />
</section>