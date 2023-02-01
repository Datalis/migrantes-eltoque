<script lang="ts">
    import DecorVela from '$lib/assets/images/vela1.svg?component';

    export let deceased: any[] = [];
    export let missing: any[] = [];

</script>

<section class="section-1 flex flex-col items-center justify-center bg-accent min-h-screen">
    <div class="section-1-wrapper w-full md:w-auto max-w-3xl text-center h-full flex flex-col justify-center">
        <h2
            class="flex flex-col md:flex-row justify-center items-center md:items-baseline font-sans font-bold  text-light"
        >
            <span class="text-accent-dark md:mr-4 font-extrabold text-7xl">+{deceased?.length || 0}</span>
            <span class="text-2xl md:text-6xl font-bold">MUERTOS</span>
        </h2>
        <h2
            class="flex flex-col md:flex-row justify-center items-center md:items-baseline font-sans font-bold  text-light mt-4 mb-10"
        >
            <span class="text-accent-dark md:mr-4 font-extrabold text-7xl">+{missing?.length || 0}</span>
            <span class="text-2xl md:text-6xl font-bold">DESAPARECIDOS</span>
        </h2>
        <h2 class="font-sans font-bold text-2xl md:text-4xl text-light">
            En la travesía de Cuba <br /> a Estados Unidos
        </h2>
    </div>
    <div class="section-1-decor w-full">
        <div class="flex justify-center items-center">
            <DecorVela height="180px" width="180px" />
            <DecorVela height="300px" width="300px" />
            <DecorVela height="180px" width="180px" />
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
	}
</style>