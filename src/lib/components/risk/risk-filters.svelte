<script lang="ts">
	import type { MonthlyIrmc } from '$lib/data/irmc';

	export let series: MonthlyIrmc[] = [];
	export let countries: string[] = [];
	export let years: number[] = [];

	export let selectedYear: number;
	export let selectedMonth: number; // 1–12
	export let selectedCountry: string = '';

	const MONTH_NAMES = [
		'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
		'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
	];

	// Meses con datos dentro del año seleccionado (los <select> pueden devolver
	// string, por eso comparamos coaccionando a número).
	$: monthsForYear = series
		.filter((m) => m.year === Number(selectedYear))
		.map((m) => m.month)
		.sort((a, b) => a - b);

	// Si al cambiar de año el mes ya no existe, salta al último disponible.
	$: if (monthsForYear.length && !monthsForYear.includes(Number(selectedMonth))) {
		selectedMonth = monthsForYear[monthsForYear.length - 1];
	}
</script>

<div class="flex flex-wrap gap-4 items-end">
	<label class="flex flex-col text-sm text-dark">
		<span class="font-semibold mb-1">Año</span>
		<select bind:value={selectedYear} class="rounded-lg border-gray text-dark">
			{#each years as y}
				<option value={y}>{y}</option>
			{/each}
		</select>
	</label>

	<label class="flex flex-col text-sm text-dark">
		<span class="font-semibold mb-1">Mes</span>
		<select bind:value={selectedMonth} class="rounded-lg border-gray text-dark">
			{#each monthsForYear as m}
				<option value={m}>{MONTH_NAMES[m - 1]}</option>
			{/each}
		</select>
	</label>

	<!-- Filtro de país oculto por ahora; se mantiene la lógica (selectedCountry = '' => todos). -->
</div>
