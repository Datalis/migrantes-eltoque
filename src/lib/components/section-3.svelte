<script lang="ts">
	export let totals: any;
	export let deceased: any[] = [];

	$: male = deceased?.filter((e) => e[4] == 'M')?.length || 0;
	$: female = deceased?.filter((e) => e[4] == 'F')?.length || 0;
</script>

<section class="section-3 flex flex-col items-center justify-center bg-dark h-min-screen py-20">
	<div class="container mx-auto max-w-3xl px-10 md:px-0">
		<h2 class="font-sans font-extrabold text-6xl md:text-7xl text-accent">+{totals?.deceased}</h2>
		<h2 class="font-sans font-bold text-2xl md:text-4xl text-light my-4">Personas fallecidas</h2>
		<p class="text-gray mt-10">
			Han sido contabilizados {totals?.deceased} cubanas y cubanos fallecidos en el intento de migrar
			hacia otro país, la mayoría con destino a los Estados Unidos. Se conoce la identidad de {deceased?.length}
			personas:
			{female}
			mujeres y {male} hombres. El resto de los migrantes se mantiene en el anonimato.
			<br />
			<br />
			Los datos recopilados sobre la edad de quienes han fallecido en la travesía confirma que la mayoría
			que decide migrar son jóvenes y se encuentran en edad laboral. Nueve son menores de 20 años, incluidos
			tres niños pequeños.
			<br />
			<br />
			Las dos principales causas de muerte han sido naufragio y ahogamiento, un resultado coherente con
			los tipos de migración y las formas en las que se trasladan los migrantes de un punto a otro. Durante
			un naufragio pueden ocurrir diferentes circunstancias y las causas de muertes han estado asociadas
			a cortes, quemaduras, deshidratación o ahogamiento. La última es la más probable. La tercera causa
			más común de los decesos son los accidentes de tránsito. Además, se identifican fallecimientos
			provocados por infartos, asesinato u otros tipos de incidentes.
			<br />
			<br />
			En el caso de los ahogamientos, hay dos áreas potencialmente mortales: el Río Bravo, en la frontera
			México-Estados Unidos, sobre todo, por el cruce fronterizo ubicado en Piedras Negras, Coahuila
			y por el área de Tijuana, en Baja California; y las costas que rodean los Cayos de Florida, específicamente
			en las cercanías de Little Torch Key, Stock Island y Faro Fowey Rocks. La mayoría de los accidentes
			de tránsito sucedieron en el territorio mexicano en autopistas o carreteras centrales que conectan
			unos estados con otros.
		</p>
	</div>
</section>
