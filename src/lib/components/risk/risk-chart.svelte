<script lang="ts">
	import Highcharts from 'highcharts';
	import { onMount } from 'svelte';
	import { classify, type MonthlyIrmc } from '$lib/data/irmc';

	export let series: MonthlyIrmc[] = [];
	export let selectedKey: string | null = null;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let chart: any;
	let container: HTMLDivElement;

	const buildData = () =>
		series.map((m) => ({
			y: parseFloat(m.irmc.toFixed(4)),
			name: m.label,
			key: m.key,
			marker: {
				radius: m.key === selectedKey ? 7 : 4,
				fillColor: m.classification.color,
				lineColor: '#201f25',
				lineWidth: m.key === selectedKey ? 2 : 1
			}
		}));

	const plotBands = [
		{ from: 0, to: 0.25, color: 'rgba(120,86,255,0.04)', label: { text: 'Bajo', style: { color: '#9b95c9' } } },
		{ from: 0.25, to: 0.5, color: 'rgba(245,197,24,0.12)', label: { text: 'Moderado', style: { color: '#b08a00' } } },
		{ from: 0.5, to: 0.75, color: 'rgba(226,59,59,0.10)', label: { text: 'Alto', style: { color: '#c0392b' } } },
		{ from: 0.75, to: 1, color: 'rgba(59,91,219,0.12)', label: { text: 'Extremo', style: { color: '#3b5bdb' } } }
	];

	onMount(() => {
		chart = Highcharts.chart({
			chart: { renderTo: container, backgroundColor: 'transparent', spacingTop: 16 },
			title: { text: '' },
			credits: { enabled: false },
			legend: { enabled: false },
			xAxis: {
				categories: series.map((m) => m.label),
				labels: {
					rotation: -45,
					step: 1,
					style: { fontFamily: 'Inter', fontSize: '11px' },
					// Con muchos meses se muestra solo el año (en enero) para evitar
					// que las etiquetas se amontonen; con pocos meses se muestran todas.
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					formatter: function (this: any) {
						const [mm, yyyy] = String(this.value).split('/');
						if (series.length <= 18) return this.value;
						return mm === '01' ? yyyy : '';
					}
				}
			},
			yAxis: {
				title: { text: 'IRMC' },
				min: 0,
				max: 1,
				tickInterval: 0.25,
				plotBands
			},
			tooltip: {
				useHTML: true,
				style: { fontFamily: 'Inter' },
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				formatter: function (this: any) {
					const c = classify(this.y);
					return `<b>${this.point.name}</b><br/>IRMC: <b>${this.y.toFixed(2)}</b><br/>Nivel: <b>${c.label}</b>`;
				}
			},
			plotOptions: {
				series: {
					color: '#7856ff',
					lineWidth: 2,
					states: { hover: { lineWidth: 3 } }
				}
			},
			series: [{ type: 'line', name: 'IRMC', data: buildData() }]
		});
	});

	// Re-render de marcadores al cambiar la serie o el mes seleccionado.
	$: if (chart && series) {
		chart.xAxis[0].setCategories(series.map((m) => m.label), false);
		chart.series[0].setData(buildData(), true);
	}
</script>

<div bind:this={container} class="risk-chart w-full" />

<style>
	.risk-chart {
		height: 360px;
	}
</style>
