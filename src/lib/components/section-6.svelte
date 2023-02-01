<script lang="ts">
    import Flag from '$lib/assets/images/section-6/flag1.png';
    // import Sign from '$lib/assets/images/section-6/sign.png';
    import Child from '$lib/assets/images/section-6/child.png';
    
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';
	import Map from './map.svelte';

	export let places: any[];

	let mapComponent: Map;

	const getPlace = (index: number) => {
		let found = false;
		let results = [];
		for (let position = 0; position < places.length; position++) {
			if (found && !!places[position][0]) {
				break;
			}
			if (places[position][0] == index + 1) {
				found = true;
				continue;
			}
			if (!places[position][0] && found) {
				results.push(places[position]);
			}
		}
		return results;
	};

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
					start: 'top bottom',
					onEnter: () => {
						const place = getPlace(i);
						mapComponent?.update(place);
					},
					onLeaveBack: () => {
						if (i == 0) {
							mapComponent?.update(places);
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
				start: 'top bottom',
				onEnter: () => {
					mapComponent?.update(places);
				},
				onLeaveBack: () => {
					mapComponent?.update(getPlace(gsap.utils.toArray('.place').length - 1));
				}
			}
		});
	});
</script>

<section class="section-6 flex flex-col items-center bg-dark" id="section-map">
	<div class="grid md:grid-cols-2 flex-1 max-w-5xl md:px-0 gap-20">
		<div class="map h-screen flex flex-col px-5 md:px-10">
			<Map data={places} bind:this={mapComponent} />
		</div>
		<div id="map-text" class="block my-20 z-10">
			<div class="intro bg-black md:px-0">
				<h2 class="title">Rutas Migratorias</h2>
				<p class="text-gray">
					Cruzar por el mar las 90 millas —o un poco más dependiendo del punto de salida— que separa
					a Cuba de los Estados Unidos en balsas o embarcaciones rústicas es una vía usada desde
					hace muchos por cubanas y cubanos. Durante esta nueva oleada no ha dejado de utilizarse, a
					pesar de estar muy vigilado por las autoridades de ambas naciones y no tener ninguna
					garantía de éxito.
					<br /> <br />
					Sin embargo, las rutas terrestres que cruzan el Darien o parten desde Nicaragua, país al que
					los cubanos pueden llegar sin necesidad de visado, y que atraviesan Centroamérica han resultado
					más efectivas en este nuevo contexto. Esto puede cambiar.
					<br /> <br />
					Estas son las zonas más peligrosas de los recorridos y dónde ha ocurrido la mayor cantidad
					de incidentes con migrantes cubanos.
				</p>
			</div>
			<div class="space h-screen md:h-0" />
			{#each places.filter((place) => !!place[0]) as p, index}
				<div id="place-{index}" class="place bg-black text-gray md:px-0">
					<div>
						<h2 class="title">{p[1]}</h2>
						<p>{p[3] || 'Some text'}</p>
					</div>
				</div>
				<div class="space h-screen md:h-0" />
			{/each}
			<div class="resume text-gray gb-black md:px-0">
				<p>
					Estas rutas no son nuevas para los cubanos, ni tampoco exclusiva de ellos; pero no por eso
					dejan de ser peligrosas. La inexperiencia de quienes las transitan —tanto en tierra como
					el mar—, las condiciones previas de salud y los accidentes llevan muchas veces a finales
					trágicos y la intervención de las autoridades migratorias en labores de rescates y
					devolución en distintos países de la región.
				</p>
			</div>
			<div class="space h-screen md:h-0" />
		</div>
	</div>
	<div class="section-6-decor">
        <img src={Flag} class="decor-flag" alt="">
        <!-- <img src={Sign} class="decor-sign" alt=""> -->
        <img src={Child} class="decor-child" alt="">
    </div>
	<div class="max-w-3xl my-10 md:my-32 px-10">
		<p class="text-light">
			Entre enero de 2021 y noviembre de 2022 más de 8302 personas han sido repatriadas a Cuba: 7158
			desde Estados Unidos, 933 desde México, 16 desde Guatemala y 195 desde Bahamas. Han sido
			interceptados en el mar 619 y 208 rescatados por las autoridades marítimas.
			<br /><br />
			Aunque muchos consiguen llegar a su destino, la migración irregular no es una vía segura y muchas
			veces no tiene un final feliz.
		</p>
	</div>
</section>
<style>
    .section-6 .section-6-decor {
		height: 600px;
		width: 100%;
		background-image: url(/src/lib/assets/images/rio.webp);
		background-size: cover;
		background-position: center;
        position: relative;
	}
    .section-6 .section-6-decor .decor-flag,
    /* .section-6 .section-6-decor .decor-sign, */
    .section-6 .section-6-decor .decor-child {
        position: absolute
    }

    .section-6 .section-6-decor .decor-flag {
        height: 500px;
        top: calc(50% - 250px);
        left: calc(50% - 500px);
        z-index: 2;
    }

    /* .section-6 .section-6-decor .decor-sign {
        width: 160px;
    } */

    .section-6 .section-6-decor .decor-child {
        width: 530px;
        left: calc(50% - 175px);
        top: calc(50% - 160px);
        transform: rotate(-15deg)
    }

	.intro, .place div, .resume {
		@apply bg-opacity-70 backdrop-blur px-10 py-5;
	}

    @media (max-width: 768px) {
        .section-6 .section-6-decor .decor-child {
            left: -50px;
            top: calc(50% - 125px);
        }
        .section-6 .section-6-decor .decor-flag {
            top: 5%;
            height: 300px;
            left: unset;
            right: 5%;
        }
    }
</style>