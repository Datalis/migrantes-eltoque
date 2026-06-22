<script lang="ts">
	import type { MonthlyIrmc } from '$lib/data/irmc';

	export let month: MonthlyIrmc | null = null;

	const SEV_LABEL: Record<number, string> = { 1: 'Baja', 2: 'Media', 3: 'Alta' };
</script>

{#if month && month.byType.length}
	<div class="overflow-x-auto">
		<table class="w-full text-sm border-collapse">
			<thead>
				<tr class="text-left border-b border-gray">
					<th class="py-2 pr-4">Tipo de evento</th>
					<th class="py-2 px-2 text-right" title="Número de eventos">nᵢ</th>
					<th class="py-2 px-2 text-right" title="Frecuencia relativa = nᵢ / N">fᵢ</th>
					<th class="py-2 px-2 text-right" title="Peso de severidad">Sᵢ</th>
					<th class="py-2 pl-2 text-right" title="Contribución = fᵢ × Sᵢ">Cᵢ</th>
				</tr>
			</thead>
			<tbody>
				{#each month.byType as row}
					<tr class="border-b border-gray/50">
						<td class="py-2 pr-4 capitalize">
							{row.type}
							<span class="text-dark/50 ml-1">· {SEV_LABEL[row.s]}</span>
						</td>
						<td class="py-2 px-2 text-right">{row.n}</td>
						<td class="py-2 px-2 text-right">{row.f.toFixed(2)}</td>
						<td class="py-2 px-2 text-right">{row.s}</td>
						<td class="py-2 pl-2 text-right font-semibold">{row.c.toFixed(2)}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr class="border-t-2 border-dark font-semibold">
					<td class="py-2 pr-4">Total</td>
					<td class="py-2 px-2 text-right">{month.n}</td>
					<td class="py-2 px-2 text-right">1,00</td>
					<td class="py-2 px-2 text-right">—</td>
					<td class="py-2 pl-2 text-right">{month.irmcBruto.toFixed(2)}</td>
				</tr>
			</tfoot>
		</table>
	</div>
	<p class="text-sm text-dark/70 mt-3">
		IRMC = IRMC bruto / 3 = {month.irmcBruto.toFixed(2)} / 3 =
		<b>{month.irmc.toFixed(2)}</b> → riesgo <b>{month.classification.label}</b>.
	</p>
{:else}
	<p class="text-dark/60 text-sm">No hay eventos clasificables para este mes.</p>
{/if}
