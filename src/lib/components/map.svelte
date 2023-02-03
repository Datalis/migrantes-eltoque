<script lang="ts">
	import Highcharts from 'highcharts/highmaps';
	import type { MapChart } from 'highcharts/highmaps';

	import { onMount } from 'svelte';

	export let data: any[] = [];

	let highcharts: MapChart;

	export const update = (data: any[]) => {
		highcharts?.series[1].update(
			{
				data: mapData(data),
				type: 'mappoint'
			},
			true
		);
		if (data.length == 1) {
			// Zoom to point
			const item = mapData(data)[0];
			// let point = highcharts?.fromLatLonToPoint({ lat: item?.lat, lon: item?.lon });
			// highcharts?.series[1]?.points[0]?.zoomTo();
		}
	};

	const mapData = (data: any[]) => {
		let results: any[] = [];
		for (let i = 0; i < data.length; i++) {
			if (!data[i][0]) {
				results.push({
					name: data[i][1],
					lat: parseFloat(data[i][2].split(',')[0].trim()),
					lon: parseFloat(data[i][2].split(',')[1].trim())
				});
			}
		}
		return results;
	};

	onMount(() => {
		// Lazy load GeoJson data & library setup
		import('@highcharts/map-collection/custom/world.topo.json').then((geoMap) => {
			highcharts = Highcharts.mapChart({
				chart: {
					renderTo: 'map-component',
					backgroundColor: 'rgb(120, 86, 255)',
					map: geoMap,
					borderWidth: 0
				},
				title: {
					text: ''
				},
				mapNavigation: {
					enabled: false
				},
				xAxis: {},
				tooltip: {
					headerFormat: '',
					pointFormat: '{point.name}'
				},
				mapView: {
					zoom: 4,
					insetOptions: {
						padding: 0
					},
					center: [-88.58134373081575, 24.750755309124187]
				},
				plotOptions: {
					series: {
						dataLabels: {
							enabled: false,
							style: {
								color: '#fff',
								textOutline: '',
								fontSize: '.8rem',
								textDecoration: 'underline'
							}
						}
					},
					mappoint: {
						color: 'rgb(180, 180, 180)',
						dataLabels: {
							style: {
								color: '#fff'
							}
						},
						cluster: {
							enabled: true,
							allowOverlap: false,
							animation: {
								duration: 450,
							},
							layoutAlgorithm: {
								type: 'grid',
								gridSize: 70
							},
							zones: [
								{
									from: 1,
									to: 4,
									marker: {
										radius: 13
									}
								},
								{
									from: 5,
									to: 9,
									marker: {
										radius: 15
									}
								},
								{
									from: 10,
									to: 15,
									marker: {
										radius: 17
									}
								},
								{
									from: 16,
									to: 20,
									marker: {
										radius: 19
									}
								},
								{
									from: 21,
									to: 100,
									marker: {
										radius: 21
									}
								}
							]
						}
					}
				},
				series: [
					{
						name: 'Basemap',
						type: 'map',
						borderColor: 'rgb(120, 86, 255)',
						borderWidth: 0,
						nullColor: 'rgb(76, 52, 164)',
						showInLegend: false
					},
					{
						name: 'Lugares',
						type: 'mappoint',
						enableMouseTracking: true,
						colorKey: 'clusterPointsAmount',
						showInLegend: false,
						data: mapData(data),
						accessibility: {
							point: {
								descriptionFormatter: function (point) {
									if (point.isCluster) {
										return point.clusterPointsAmount + ' puntos.';
									}
									return point.name;
								}
							}
						}
					}
				]
			});

			// MarkerClusters(Highcharts);
		});
	});
</script>

<div id="map-component" class="w-full rounded-2xl z-0" />

<style>
	#map-component {
		height: 90%;
		margin: auto;
	}
</style>
