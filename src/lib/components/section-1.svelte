<script lang="ts">
    import LuzImg from '$lib/assets/images/luz.svg?url';
	import Counter from './counter.svelte';
    export let totals: any;

</script>

<svelte:head>
    <link rel="preload" as="image" href={LuzImg}>
</svelte:head>

<section id="section-1" class="section-1 flex flex-col items-center justify-center bg-accent min-h-screen">
    <div class="section-1-wrapper -mt-40 w-full md:w-auto max-w-3xl text-center h-full flex flex-col justify-center">
        <div class="section-1-wrapper-bg" style="background-image: url({LuzImg});"></div>
        <h2
            class="flex flex-col md:flex-row justify-center items-center md:items-baseline font-sans font-bold  text-light"
        >
            <span class="text-accent-dark mr-2 font-extrabold text-6xl lg:text-7xl">
				<Counter amount={totals?.deceased} />
			</span>
            <span class="text-2xl md:text-4xl lg:text-5xl font-semibold">MUERTES</span>
        </h2>
        <h2
            class="flex flex-col md:flex-row justify-center items-center md:items-baseline font-sans font-bold  text-light mt-2 mb-4"
        >
            <span class="text-accent-dark mr-2 font-extrabold text-6xl lg:text-7xl">
				<Counter amount={totals?.missing} delay={50} threshold={80} />
			</span>
            <span class="text-2xl md:text-4xl lg:text-5xl font-semibold">DESAPARICIONES</span>
        </h2>
        <h2 class="font-sans font-semibold text-2xl lg:text-4xl text-light">
            En la travesía de Cuba <br /> a Estados Unidos
        </h2>
		<span class="font-sans font-semibold text-lg md:text-2xl text-accent-dark z-10 mt-2">desde 2021</span>
    </div>
</section>

<style>
    .section-1 .section-1-wrapper {
        height: 80vh;
		height: 80vmin;
        width: 80vw;
        position: relative;
	}
    .section-1 .section-1-wrapper h2 {
        z-index: 1;
    }
    .section-1 .section-1-wrapper .section-1-wrapper-bg {
        /* background-image: url(/src/lib/assets/images/luz.svg); */
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.6;
    }
    /* @media (max-width: 768px) {
        .section-1 .section-1-wrapper {
            height: unset;
        }
    } */
	
</style>