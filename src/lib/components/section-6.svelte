<script lang="ts">
	import LinePath from '$lib/assets/images/section-2/line-full.svg?component';
	import LinePathSmall from '$lib/assets/images/section-2/line-small.svg?component';
	// @ts-ignore
	import Plane from '$lib/assets/images/section-2/plane1.webp?w=400&webp';
	// @ts-ignore
	import Volcano from '$lib/assets/images/section-2/volcano.webp?w=700&webp';
	// @ts-ignore
	import MapBackground from '$lib/assets/images/section-2/mapa.webp?webp';

	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import MotionPathPlugin from 'gsap/MotionPathPlugin';
	import { onMount } from 'svelte';
	import Map from './map.svelte';

	export let places: any[] = [];

	let mapComponent: Map;
	let windowWidth = 0;

	const getPlace = (index: number) => {
		let found = false;
		let results = [];
		for (let position = 0; position < places.length; position++) {
			if (found && !!places?.[position][0]) {
				break;
			}
			if (places?.[position][0] == index + 1) {
				found = true;
				continue;
			}
			if (!places?.[position][0] && found) {
				results.push(places?.[position]);
			}
		}
		return results;
	};

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

		gsap.to('#map-component', {
			scrollTrigger: {
				trigger: '.section-6',
				start: 'top top',
				// endTrigger: '#map-text',
				endTrigger: '.resume',
				end: 'bottom bottom',
				pinSpacing: false,
				pin: '#map-component',
				// pinSpacing: false,
				invalidateOnRefresh: true,
				// markers: true,
				scrub: true
			}
		});

		gsap.utils.toArray('.place').forEach((e: any, i: number) => {
			gsap.to(e, {
				scrollTrigger: {
					trigger: e,
					start: 'top 80%',
					invalidateOnRefresh: true,
					onEnter: () => {
						const place = getPlace(i);
						mapComponent?.update(place);
					},
					onLeaveBack: () => {
						if (i == 0) {
							mapComponent?.update(places, false);
						} else {
							mapComponent?.update(getPlace(i - 1));
						}
					}
				}
			});
		});

		gsap.to('.resume', {
			scrollTrigger: {
				trigger: '.resume',
				start: 'top 80%',
				onEnter: () => {
					mapComponent?.update(places, false);
				},
				onLeaveBack: () => {
					mapComponent?.update(getPlace(gsap.utils.toArray('.place').length - 1));
				}
			}
		});

		if (windowWidth >= 768) {
			gsap.registerPlugin(ScrollTrigger);
			gsap.registerPlugin(MotionPathPlugin);

			gsap.to('#plane', {
				scrollTrigger: {
					// markers: true,
					trigger: '.section-6-decor',
					scrub: 1
				},
				motionPath: {
					path: '#line path',
					align: '#line path',
					autoRotate: true,
					alignOrigin: [0.5, 0.5],
					start: 0.6,
					end: 0.5
				}
			});
		}
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section class="section-6 flex flex-col items-center bg-dark" id="section-map">
	<div class="container grid md:grid-cols-2 flex-1 md:px-0 gap-10">
		<div class="map h-screen flex flex-col">
			<Map data={places} bind:this={mapComponent} />
		</div>
		<div id="map-text" class="block my-20 z-10 text-lg">
			<div class="intro px-4 md:px-0 bg-black min-h-screen">
				<h2 class="title">Rutas Migratorias</h2>
				<p class="text-gray">
					Las rutas terrestres que cruzan el Darién o parten desde Nicaragua —país al que las
					cubanas y los cubanos pueden llegar sin necesidad de visado— y que atraviesan
					Centroamérica han resultado más efectivas en el nuevo contexto. Aunque esto podría
					cambiar.
					<br /><br />
					Cruzar por mar las 90 millas —o un poco más dependiendo del punto de salida— que separa a Cuba
					de los Estados Unidos en balsas o embarcaciones rústicas es una vía usada desde hace mucho
					tiempo. Durante la nueva oleada no ha dejado de utilizarse, a pesar de estar muy vigilada por
					las autoridades de ambas naciones y no tener ninguna garantía de éxito.
					<br /> <br />
					Estas han sido las zonas más peligrosas de los recorridos y donde ha ocurrido la mayor cantidad
					de incidentes con migrantes cubanos.
				</p>
			</div>
			<div class="space h-screen md:h-0" />
			{#each places.filter((place) => !!place[0]) as p, index}
				<div id="place-{index}" class="place bg-black text-gray px-4 md:px-0 min-h-screen">
					<div class="">
						<h2 class="title">{p[1]}</h2>
						<p>{@html p[3]}</p>
					</div>
				</div>
				<div class="space h-screen md:h-0" />
			{/each}
			<div class="resume text-gray gb-black px-4 md:px-0 min-h-screen">
				<p>
					Las rutas no son nuevas para los cubanos ni tampoco exclusiva de ellos; pero no por eso
					dejan de ser peligrosas. La inexperiencia de quienes se aventuran, sus condiciones previas
					de salud y los accidentes llevan muchas veces a finales trágicos y a la intervención de
					las autoridades migratorias en labores de rescate y devolución en distintos países de la
					región.
				</p>
			</div>
			<div class="space h-screen md:h-0" />
		</div>
	</div>
	<div class="section-6-decor">
		<!-- <img src={Flag} class="decor-flag" alt="" />
		<img src={Child} class="decor-child" alt="" /> -->

		<img class="decor-bg" src={MapBackground} alt="" loading="lazy" />
		<LinePath id="line" class="decor-line w-full hidden md:block" />
		<LinePathSmall id="line" class="decor-line w-full md:hidden" />
		<img id="plane" class="decor-plane" src={Plane} alt="" loading="lazy" />
		<img id="volcano" class="decor-volcano" src={Volcano} alt="" loading="lazy" />
	</div>
</section>

<style >
	.section-6 .section-6-decor {
		height: 600px;
		width: 100%;
		background-size: cover;
		background-position: center;
		position: relative;
	}

	.section-6 .section-6-decor .decor-bg {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		object-fit: cover;
		object-position: center;
		z-index: 1;
		height: 600px;
	}

	:global(.section-6 .section-6-decor .decor-line) {
		z-index: 2;
		position: relative;
	}
	.section-6 .section-6-decor .decor-plane {
		position: absolute;
		width: 400px;
		height: 400px;
		object-fit: contain;
		object-position: center;
		z-index: 9999;
	}
	.section-6 .section-6-decor .decor-volcano {
		position: absolute;
		width: 50%;
		top: 30%;
		left: 20%;
		z-index: 4;
		max-width: 800px;
	}

	@media (max-width: 768px) {
		.section-6 .section-6-decor .decor-bg {
			height: 736px;
		}

		.section-6 .section-6-decor .decor-volcano {
			width: 100%;
		}

		.section-6 .section-6-decor .decor-plane {
			width: 300px;
			height: 300px;
			transform: rotate(-130deg);
			left: calc(50% - 200px);
			bottom: calc(50% - 250px);
		}
	}

	.intro,
	.place div,
	.resume {
		@apply bg-opacity-90 backdrop-blur;
	}
</style>
