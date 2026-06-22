<script lang="ts">
	import type { MonthlyIrmc } from '$lib/data/irmc';

	export let month: MonthlyIrmc | null = null;

	// Umbral por debajo del cual el índice se considera poco representativo:
	// con muy pocos eventos, un único incidente grave dispara el IRMC.
	const LOW_N = 5;

	// Texto sobre el color del semáforo: oscuro para fondos claros (bajo/moderado),
	// claro para fondos saturados (alto/extremo).
	$: onLight = month?.classification.level === 'bajo' || month?.classification.level === 'moderado';
	$: lowSample = !!month && month.n > 0 && month.n < LOW_N;
</script>

{#if month}
	<div
		class="risk-badge rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
		style="background-color: {month.classification.color}; color: {onLight ? '#201f25' : '#ffffff'}"
		class:bordered={month.classification.level === 'bajo'}
	>
		<div class="text-center md:text-left flex-1">
			<p class="uppercase tracking-wide text-sm opacity-70">Nivel de riesgo · {month.label}</p>
			<p class="text-4xl md:text-5xl font-bold mt-1">{month.classification.label}</p>
		</div>
		<div class="text-center">
			<p class="text-5xl md:text-6xl font-extrabold leading-none">
				{month.irmc.toFixed(2)}
			</p>
			<p class="text-xs uppercase tracking-wide opacity-70 mt-1">IRMC (0–1)</p>
		</div>
		<div class="text-center md:text-right text-sm opacity-80">
			<p>{month.n} incidentes</p>
			<p>{month.byType.length} tipos de evento</p>
			{#if month.excludedCount > 0}
				<p class="opacity-60">{month.excludedCount} sin clasificar</p>
			{/if}
		</div>
	</div>

	{#if lowSample}
		<div
			class="low-sample mt-3 rounded-xl px-4 py-3 flex items-start gap-2 text-sm"
			role="note"
		>
			<span aria-hidden="true">⚠️</span>
			<span>
				<b>Muestra reducida (n = {month.n}).</b> Con tan pocos eventos el índice es muy sensible:
				un único incidente grave puede elevar el nivel de riesgo. Interpretar con cautela.
			</span>
		</div>
	{/if}
{:else}
	<div class="rounded-2xl p-8 bg-gray text-dark text-center">Sin datos para este periodo.</div>
{/if}

<style>
	.risk-badge.bordered {
		border: 1px solid #d6d3ec;
	}
	.low-sample {
		background-color: #fff7e0;
		border: 1px solid #f0d27a;
		color: #6b5300;
	}
</style>
