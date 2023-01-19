<script>
    import HighCharts from "highcharts/highmaps";
    import { onMount } from "svelte";
    import map from "@highcharts/map-collection/custom/europe.geo.json"
    import peoples from "$lib/data/people.json"

    onMount(() => {
        HighCharts.mapChart('container', {
            chart: {
                map
            },
            title: {
                text: 'European Train Stations Near Airports'
            },
            subtitle: {
                text: 'Source: <a href="https://github.com/trainline-eu/stations">' +
                    'github.com/trainline-eu/stations</a>'
            },
            mapNavigation: {
                enabled: true
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<b>{point.name}</b>'
            },
            colorAxis: {
                min: 0,
                max: 20
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
                        }]
                    }
                }
            },
            series: [{
                name: 'Europe',
                accessibility: {
                    exposeAsGroupOnly: true
                },
                borderColor: '#A0A0A0',
                nullColor: 'rgba(177, 244, 177, .5)'
            }, {
                type: 'mappoint',
                enableMouseTracking: true,
                accessibility: {
                    point: {
                        descriptionFormatter: point => {
                            if (point.isCluster) {
                                return point.clusterPointsAmount + ' Personas';
                            }
                            return point.name;
                        }
                    }
                },
                colorKey: 'clusterPointsAmount',
                name: 'Personas',
                data: peoples,
                color: HighCharts.getOptions().colors[5],
                marker: {
                    lineWidth: 1,
                    lineColor: '#fff',
                    symbol: 'mapmarker',
                    radius: 8
                },
                dataLabels: {
                    verticalAlign: 'top'
                }
            }]
        })
    })
</script>

<div id="container" class="map bg-accent w-full h-full rounded-2xl order-2 md:order-1">
</div>
