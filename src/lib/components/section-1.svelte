<script lang="ts">
    import Vela from '$lib/assets/images/section-1/vela1.svg?component';
    import Plano from '$lib/assets/images/section-1/plano.svg?component';

    export let totals: any;

</script>

<section class="section-1 flex flex-col items-center justify-center bg-accent min-h-screen">
    <div class="section-1-wrapper w-full md:w-auto max-w-3xl text-center h-full flex flex-col justify-center">
        <h2
            class="flex flex-col md:flex-row justify-center items-center md:items-baseline font-sans font-bold  text-light"
        >
            <span class="text-accent-dark md:mr-4 font-extrabold text-7xl">+{totals?.deceased}</span>
            <span class="text-2xl md:text-6xl font-bold">MUERTOS</span>
        </h2>
        <h2
            class="flex flex-col md:flex-row justify-center items-center md:items-baseline font-sans font-bold  text-light mt-4 mb-10"
        >
            <span class="text-accent-dark md:mr-4 font-extrabold text-7xl">+{totals?.missing}</span>
            <span class="text-2xl md:text-6xl font-bold">DESAPARECIDOS</span>
        </h2>
        <h2 class="font-sans font-bold text-2xl md:text-4xl text-light">
            En la travesía de Cuba <br /> a Estados Unidos
        </h2>
    </div>
    <div class="section-1-decor w-full">
        <Plano class="decor-plano"></Plano>
        <div class="decor-candles flex justify-center items-center">
            <Vela height="180px" width="180px" />
            <Vela height="300px" width="300px" />
            <Vela height="180px" width="180px" />
        </div>
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
	.section-1 .section-1-decor {
		bottom: -120px;
		position: absolute;
        overflow: hidden;
	}
    .section-1 .section-1-decor .decor-candles {
        z-index: 2;
        position: relative;
    }
    :global(.section-1 .section-1-decor .decor-plano) {
        position: absolute;
        z-index: 1;
        bottom: -36px;
    }
</style>