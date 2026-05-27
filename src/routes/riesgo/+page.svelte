<script lang="ts">
	import type { PageData } from './$types';
	import RiskBadge from '$lib/components/risk/risk-badge.svelte';
	import RiskChart from '$lib/components/risk/risk-chart.svelte';
	import RiskFilters from '$lib/components/risk/risk-filters.svelte';
	import RiskImpact from '$lib/components/risk/risk-impact.svelte';
	import RiskBreakdown from '$lib/components/risk/risk-breakdown.svelte';
	import Map from '$lib/components/map.svelte';

	export let data: PageData;

	const { series, events, years, countries, current } = data;

	// Estado inicial: último mes con datos.
	const initial = current ? current.split('-').map(Number) : [years[0] ?? new Date().getFullYear(), 1];
	let selectedYear = initial[0];
	let selectedMonth = initial[1];
	let selectedCountry = '';

	// Los <select> pueden devolver el valor como string; coaccionamos a número
	// para comparar de forma fiable contra los datos.
	$: yr = Number(selectedYear);
	$: mo = Number(selectedMonth);

	$: selectedMonthData = series.find((m) => m.year === yr && m.month === mo) ?? null;
	$: selectedKey = selectedMonthData?.key ?? null;

	// Eventos del mes/país seleccionado para mapa e indicadores.
	$: monthEvents = events.filter(
		(e) =>
			e.year === yr &&
			e.month === mo &&
			(selectedCountry === '' || e.country === selectedCountry)
	);

	// Filas en el formato que espera map.svelte: [idx-falsy, nombre, "lat,lon"].
	$: mapRows = monthEvents
		.filter((e) => e.coordenates && e.coordenates.includes(','))
		.map((e) => [null, `${e.label}${e.eventType ? ` · ${e.eventType}` : ''}`, e.coordenates]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let mapComponent: any;
	$: if (mapComponent && mapRows.length) {
		mapComponent.update(mapRows, false);
	}
</script>

<svelte:head>
	<title>Índice de Riesgo Migratorio Cubano (IRMC) | La Travesía</title>
	<meta
		name="description"
		content="Índice mensual de riesgo migratorio cubano, basado en la frecuencia y severidad de los incidentes registrados en las rutas de salida."
	/>
</svelte:head>

<main class="bg-light min-h-screen text-dark">
	<div class="max-w-5xl mx-auto px-4 py-10 md:py-16">
		<header class="mb-10">
			<a href="/" class="text-accent text-sm font-semibold">← Volver al inicio</a>
			<h1 class="text-3xl md:text-4xl font-bold mt-4">Índice de Riesgo Migratorio Cubano</h1>
			<p class="text-dark/70 mt-3 max-w-2xl">
				El IRMC sintetiza, mes a mes, la intensidad del riesgo que enfrentan las personas
				migrantes cubanas, combinando la frecuencia relativa de cada tipo de incidente con un
				peso de severidad por su impacto humano. Se normaliza en un rango de 0 a 1 y se clasifica
				en cuatro niveles: bajo, moderado, alto y extremo.
			</p>
		</header>

		<section class="mb-8">
			<RiskFilters {series} {countries} {years} bind:selectedYear bind:selectedMonth bind:selectedCountry />
		</section>

		<section class="mb-10">
			<RiskBadge month={selectedMonthData} />
		</section>

		<section class="mb-12">
			<h2 class="text-xl font-bold mb-4">Evolución mensual del IRMC</h2>
			<div class="bg-white rounded-2xl p-4 shadow-sm">
				<RiskChart {series} {selectedKey} />
			</div>
		</section>

		<div class="grid md:grid-cols-2 gap-8 mb-12">
			<section>
				<h2 class="text-xl font-bold mb-4">Impacto humano · {selectedMonthData?.label ?? ''}</h2>
				<RiskImpact events={monthEvents} />
			</section>

			<section>
				<h2 class="text-xl font-bold mb-4">Cálculo del mes</h2>
				<RiskBreakdown month={selectedMonthData} />
			</section>
		</div>

		<section class="mb-12">
			<h2 class="text-xl font-bold mb-4">Concentración geográfica de incidentes</h2>
			<div class="map-wrapper rounded-2xl overflow-hidden">
				{#if mapRows.length}
					<Map bind:this={mapComponent} data={mapRows} />
				{:else}
					<div class="bg-gray text-dark h-full flex items-center justify-center">
						Sin coordenadas para este periodo.
					</div>
				{/if}
			</div>
		</section>

		<section class="text-sm text-dark/60 border-t border-gray pt-6">
			<h3 class="font-semibold text-dark mb-2">Nota metodológica</h3>
			<p class="mb-2">
				Pesos de severidad (juicio experto): <b>alta (3)</b> muerte, desaparición, naufragio;
				<b>media (2)</b> rescate, secuestro, detención, intercepción; <b>baja (1)</b> repatriación,
				deportación, expulsión, transferencia, llegada. Los incidentes sin tipo clasificable se
				excluyen del cálculo.
			</p>
			<p>
				Metodología propuesta por la Fundación 4Metrica (Elaine Acosta y Alejandra Lache). Datos
				de la herramienta <i>Incidentes de La Travesía</i>.
			</p>
		</section>
	</div>
</main>

<style>
	.map-wrapper {
		height: 480px;
		background-color: rgb(120, 86, 255);
	}
</style>
