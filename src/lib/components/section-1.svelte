<script lang="ts">
   
    export let totals: any;

</script>

<section id="section-1" class="section-1 flex flex-col items-center justify-center bg-accent min-h-screen">
    <div class="section-1-wrapper -mt-20 w-full md:w-auto max-w-3xl text-center h-full flex flex-col justify-center">
        <h2
            class="flex flex-col md:flex-row justify-center items-center md:items-baseline font-sans font-bold  text-light"
        >
            <span class="text-accent-dark md:mr-4 font-extrabold text-6xl lg:text-7xl">+{totals?.deceased}</span>
            <span class="text-2xl md:text-4xl lg:text-6xl font-bold">MUERTOS</span>
        </h2>
        <h2
            class="flex flex-col md:flex-row justify-center items-center md:items-baseline font-sans font-bold  text-light mt-4 mb-8"
        >
            <span class="text-accent-dark md:mr-4 font-extrabold text-6xl lg:text-7xl">+{totals?.missing}</span>
            <span class="text-2xl md:text-4xl lg:text-6xl font-bold">DESAPARECIDOS</span>
        </h2>
        <h2 class="font-sans font-bold text-2xl lg:text-4xl text-light">
            En la travesía de Cuba <br /> a Estados Unidos
        </h2>
    </div>
</section>

<style>
    .section-1 .section-1-wrapper {
		background-image: url(/src/lib/assets/images/luz.svg);
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		height: 90vh;
	}
    @media (max-width: 768px) {
        .section-1 .section-1-wrapper {
            height: unset;
        }
    }
	
</style>