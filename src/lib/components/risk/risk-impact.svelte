<script lang="ts">
	import type { RiskEvent } from '../../../routes/riesgo/+page.server';

	export let events: RiskEvent[] = [];

	$: totals = events.reduce(
		(acc, e) => {
			acc.incidents += 1;
			acc.persons += e.personsNo;
			acc.women += e.womenNo;
			acc.men += e.menNo;
			acc.children += e.childrenNo;
			acc.deaths += e.deaths;
			acc.missing += e.missingsNo;
			if (e.country) acc.countries.add(e.country);
			if (e.eventType) acc.types.add(e.eventType);
			return acc;
		},
		{
			incidents: 0,
			persons: 0,
			women: 0,
			men: 0,
			children: 0,
			deaths: 0,
			missing: 0,
			countries: new Set<string>(),
			types: new Set<string>()
		}
	);

	$: cards = [
		{ label: 'Incidentes', value: totals.incidents },
		{ label: 'Personas involucradas', value: totals.persons },
		{ label: 'Mujeres', value: totals.women },
		{ label: 'Hombres', value: totals.men },
		{ label: 'Menores de edad', value: totals.children },
		{ label: 'Fallecidos', value: totals.deaths, accent: true },
		{ label: 'Desaparecidos', value: totals.missing, accent: true },
		{ label: 'Países', value: totals.countries.size },
		{ label: 'Tipos de evento', value: totals.types.size }
	];
</script>

<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
	{#each cards as card}
		<div
			class="rounded-xl p-4 text-center"
			class:bg-light={!card.accent}
			class:bg-accent={card.accent}
			class:text-light={card.accent}
		>
			<p class="text-3xl font-bold">{card.value}</p>
			<p class="text-xs uppercase tracking-wide opacity-70 mt-1">{card.label}</p>
		</div>
	{/each}
</div>
