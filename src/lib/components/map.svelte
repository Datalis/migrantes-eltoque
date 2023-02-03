<script lang="ts">
	import Highcharts from 'highcharts/highmaps';
  
	import { onMount } from 'svelte';

	export let data: any[] = [];

    let highcharts: Highcharts.MapChart;

    export const update = (data: any[]) => {
        highcharts?.series[1].update({
			data: mapData(data),
			type: 'mappoint'
		}, true);
        if (data.length == 1) {
            // Zoom to point
            const item = mapData(data)[0];
            let point = highcharts?.fromLatLonToPoint({ lat: item?.lat, lon: item?.lon });
            highcharts?.mapZoom(1, point.x, point.y);
        }
    }

    const mapData = (data: any[]) => {
		let results: any[] = []
		for(let i = 0; i < data.length; i++) {
			if (!data[i][0]) {
				results.push({
					name: data[i][1],
					lat: parseFloat(data[i][2].split(',')[0].trim()),
					lon: parseFloat(data[i][2].split(',')[1].trim()),
				})
			}
		}
		return results
	}

	onMount(() => {
		// Lazy load GeoJson data & library setup
		import('@highcharts/map-collection/custom/world.topo.json').then((geoMap) => {

			highcharts = Highcharts.mapChart({
				chart: {
					renderTo: 'map-component',
					backgroundColor: 'rgb(120, 86, 255)',
					map: geoMap
				},
				title: {
					text: ''
				},
				mapNavigation: {
					enabled: false,
				},
                mapView: {
                    zoom: 4,
                    center: [-88.58134373081575, 24.750755309124187],
                },
				plotOptions: {
					series: {
						dataLabels: {
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
                            layoutAlgorithm: {
                                type: 'grid',
                                gridSize: 70
                            }
                        }
						
					}
				},
				series: [
					{
						name: 'Basemap',
						type: 'map',
						borderColor: 'rgb(120, 86, 255)',
						nullColor: 'rgb(76, 52, 164)',
						showInLegend: false,
					},
					{
						name: 'Lugares',
						type: 'mappoint',
						enableMouseTracking: true,
						colorKey: 'clusterPointsAmount',
						showInLegend: false,
						data: mapData(data)
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
