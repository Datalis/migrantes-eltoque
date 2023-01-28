<script lang="ts">
	

	import Grid from '$lib/components/grid.svelte';
	import Map from '$lib/components/map.svelte';
	import Profile from '$lib/components/profile.svelte';
	import Article from '$lib/components/article.svelte';

	
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	import northAmericaMap from '@highcharts/map-collection/custom/north-america.topo.json';

	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Section_2 from '$lib/components/section-2.svelte';
	import Section_1 from '$lib/components/section-1.svelte';
	import Section_5 from '$lib/components/section-5.svelte';
	import Section_3 from '$lib/components/section-3.svelte';
	import Section_4 from '$lib/components/section-4.svelte';

	
	export let data: PageData;

	$: deceased = data?.deceased?.values || [];
	$: missing = data?.missing?.values || [];
	$: places = data?.places?.values?.slice(1) || [];

	let mapComponent: Map;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.to('#map-component', {
			scrollTrigger: {
				trigger: '.section-6',
				start: 'top top',
				endTrigger: '#map-text',
				end: 'bottom bottom',
				pin: '#map-component',
				pinSpacing: false,
				// markers: true,
				scrub: true
			}
		});

		gsap.utils.toArray('.place').forEach((e: any, i: number) => {
			gsap.to(e, {
				scrollTrigger: {
					trigger: e,
					start: 'top center',
					onEnter: () => {
						const place = places[i];
						mapComponent?.update([place]);
					},
					onLeaveBack: () => {
						if (i == 0) {
							mapComponent?.update(places);
						} else {
							mapComponent?.update([places[i - 1]]);
						}
					}
				}
			});
		});
	});
</script>

<main class="overflow-hidden">
	<Section_1></Section_1>
	<Section_2></Section_2>
	<Section_3></Section_3>
	<Section_4 data={deceased}></Section_4>
	<Section_5 data={missing}></Section_5>
	<section class="section-6 flex flex-col items-center bg-dark" id="section-map">
		<div class="grid md:grid-cols-2 flex-1 max-w-5xl md:px-0 gap-20">
			<div class="map h-screen flex flex-col px-10">
				<Map data={places} bind:this={mapComponent} />
			</div>
			<div id="map-text" class="block my-20 z-10">
				<div class="intro min-h-screen bg-black md:px-0">
					<h2 class="title">Rutas Migratorias</h2>
					<p class="text-gray">
						Cruzar por el mar las 90 millas —o un poco más dependiendo del punto de salida— que
						separa a Cuba de los Estados Unidos en balsas o embarcaciones rústicas es una vía usada
						desde hace muchos por cubanas y cubanos. Durante esta nueva oleada no ha dejado de
						utilizarse, a pesar de estar muy vigilado por las autoridades de ambas naciones y no
						tener ninguna garantía de éxito.
						<br /> <br />
						Sin embargo, las rutas terrestres cruzando el Darien o partiendo desde Nicaragua, país al
						que los cubanos pueden llegar sin necesidad de visado, y atravesando Centroamérica han resultado
						más efectivas en este nuevo contexto.
						<br /> <br />
						Hemos identificados las zonas más peligrosas de estos recorridos y dónde han ocurrido mayor
						cantidad de incidentes con migrantes cubanos.
					</p>
				</div>
				{#each places as p, index}
					<div id="place-{index}" class="place bg-black text-gray min-h-screen md:px-0">
						<div>
							<h2 class="title">{p[0]}</h2>
							<p>{p[1] || 'Some text'}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="section-6-decor" />
		<div class="max-w-3xl my-32">
			<p class="text-light">
				Entre enero de 2021 y noviembre de 2022 más de 8302 personas han sido repatriadas a Cuba:
				7158 desde Estados Unidos, 933 desde México, 16 desde Guatemala y 195 desde Bahamas. Han
				sido interceptados en el mar 619 y 208 rescatados por las autoridades marítimas.
				<br /><br />
				Aunque muchos consiguen llegar a su destino, la migración irregular no es una vía segura y muchas
				veces no tiene un final feliz.
			</p>
		</div>
	</section>
</main>

<style>
	
	.section-6 .section-6-decor {
		height: 500px;
		width: 100%;
		background-image: url(/src/lib/assets/images/rio.webp);
		background-size: cover;
		background-position: center;
	}

	.intro, .place div {
		@apply bg-opacity-70 backdrop-blur px-10 py-5;
	}
</style>
