<script lang="ts">
	import Counter from './counter.svelte';

	export let totals: any;
	export let deceased: any[] = [];

	let withPic = deceased?.filter(e => e[1] == 'Sí' || e[1] == 'Si');

	$: male = withPic?.filter((e) => e[5] == 'M')?.length || 0;
	$: female = withPic?.filter((e) => e[5] == 'F')?.length || 0;
</script>

<section class="section-3 flex flex-col items-center justify-center bg-dark h-min-screen py-20">
	<div class="container mx-auto max-w-3xl px-10 md:px-0">
		<h2 class="font-sans font-extrabold text-6xl md:text-7xl text-accent">
			<Counter amount={totals?.deceased} delay={100} />
		</h2>
		<h2 class="font-sans font-semibold text-2xl md:text-4xl text-light my-4">Personas fallecidas</h2>
		<p class="text-gray mt-10">
			Al menos {totals?.deceased} cubanas y cubanos han fallecido en el intento de migrar a Estados Unidos, 
			desde enero de 2021. Hasta el momento, hemos podido
			identificar a {withPic?.length} personas de ese total: {female} mujeres y {male} hombres. Tenemos
			la esperanza de conocer la identidad de otros fallecidos con la colaboración de sus familiares,
			amigos y organizaciones sensibles a esta tragedia.
			<br /><br />
			Los datos sobre la edad de quienes han fallecido en la travesía confirman que la mayoría
			son jóvenes y las dos principales causas de muerte han sido naufragio y ahogamiento, como
			resultado de las formas en las que se trasladan los migrantes de un punto a otro.
		</p>
	</div>
</section>
