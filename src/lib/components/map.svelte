<script lang="ts">
    import * as HighCharts from "highcharts/highmaps";
    import * as MarkerClusters from "highcharts/modules/marker-clusters";
    import { onMount } from "svelte";

    interface Person extends HighCharts.SeriesMappointDataOptions {
        name: string;
        lat: number;
        lon: number;
    }
    let highcharts: HighCharts.MapChart;
    type MapType = (HighCharts.GeoJSON|HighCharts.TopoJSON|Array<any>)

    export let map: MapType; 
    export let data: Array<Person>;
    export function update_data(new_map: MapType, new_data: Array<Person>) {
        if (new_map) {
            // highcharts.series[0].setData(new_map)
            highcharts.series[0].update({data: [], mapData: new_map});
        }
        highcharts.series[1].setData(new_data, true, true)
    }
    

    onMount(() => {
        MarkerClusters(HighCharts)

        highcharts = HighCharts.mapChart('map-component', {
            chart: {
                backgroundColor: 'rgb(120, 86, 255)',
                map
            },
            title: {
                text: ''
            },
            mapNavigation: {
                enabled: false
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
                series: {
                    dataLabels: {
                        style: {
                            color: '#fff',
                            textOutline: '',
                            fontSize: '1rem',
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
                borderColor: 'rgb(120, 86, 255)',
                nullColor: 'rgb(76, 52, 164)',
                showInLegend: false
            }, {
                type: 'mappoint',
                enableMouseTracking: true,
                colorKey: 'clusterPointsAmount',
                name: 'Personas',
                showInLegend: false,
                data
            }]
        })
    })
</script>

<div id="map-component" class="map bg-accent w-full h-full rounded-2xl order-2 md:order-1 max-h-96">
</div>
