<script lang="ts">
    import * as HighCharts from "highcharts/highmaps";
    import * as MarkerClusters from "highcharts/modules/marker-clusters";
    import * as map from "@highcharts/map-collection/custom/world.topo.json"
    import { onMount } from "svelte";
    import peoples from "$lib/data/people.json"
    

    onMount(() => {
        MarkerClusters(HighCharts)

        HighCharts.mapChart('container', {
            chart: {
                map
            },
            title: {
                text: 'Rutas migratorias'
            },
            subtitle: {
                text: 'Fuente: <a href="https://eltoque.com">' +
                    'El Toque</a>'
            },
            mapNavigation: {
                enabled: true
            },
            tooltip: {
                formatter: function () {
                    if (this.point.clusteredData) {
						return this.point.clusterPointsAmount + ' personas';
					}
					return this.point.name + '<br> lat: ' + this.point.lat;
				}
            },
            plotOptions: {
                mappoint: {
                    cluster: {
                        enabled: true,
                        allowOverlap: false,
                        animation: {
                            duration: 450
                        },
                        layoutAlgorithm: {
                            type: 'grid',
                            gridSize: 70
                        },
                        zones: [{
                            from: 1,
                            to: 4,
                            marker: {
                                radius: 13
                            }
                        }, {
                            from: 5,
                            to: 9,
                            marker: {
                                radius: 15
                            }
                        }, {
                            from: 10,
                            to: 14,
                            marker: {
                                radius: 18
                            }
                        }, {
                            from: 15,
                            to: 99,
                            marker: {
                                radius: 20
                            }
                        }]
                    }
                }
            },
            series: [{
                name: 'Europe',
                type: 'map',
                accessibility: {
                    exposeAsGroupOnly: true
                },
                borderColor: '#A0A0A0',
                nullColor: 'rgba(177, 244, 177, .5)',
                showInLegend: false
            }, {
                type: 'mappoint',
                enableMouseTracking: true,
				colorKey: 'clusterPointsAmount',
                name: 'Personas',
                data: peoples
            }]
        })
    })
</script>

<div id="container" class="map bg-accent w-full h-full rounded-2xl order-2 md:order-1">
</div>
