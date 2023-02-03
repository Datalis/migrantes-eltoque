<script>
	import MapBackground from '$lib/assets/images/section-2/mapa.webp';
	import LinePath from '$lib/assets/images/section-2/line-full.svg?component';
	import LinePathSmall from '$lib/assets/images/section-2/line-small.svg?component';
	import Plane from '$lib/assets/images/section-2/plane.webp';
	import Volcano from '$lib/assets/images/section-2/volcano.webp';
	import gsap from 'gsap';
	import MotionPathPlugin from 'gsap/MotionPathPlugin';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';

	let windowWidth = 0;

	onMount(() => {
		if (windowWidth >= 768) {
			gsap.registerPlugin(ScrollTrigger);
			gsap.registerPlugin(MotionPathPlugin);

			gsap.to('#plane', {
				scrollTrigger: {
					// markers: true,
					trigger: '.section-2-decor',
					scrub: 1
				},
				motionPath: {
					path: '#line path',
					align: '#line path',
					autoRotate: true,
					alignOrigin: [0.5, 0.5],
					start: 0.7,
					end: 0.6
				}
			});
		}
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section class="section-2 flex flex-col items-center justify-center bg-dark min-h-screen">
	<div class="container mx-auto px-10 md:px-0 max-w-3xl">
		<h2 class="font-sans font-bold text-4xl md:text-6xl text-light my-4 text-center">MIGRAR:</h2>
		<h2 class="font-sans font-bold text-2xl md:text-4xl text-accent text-center">
			Una decisión de vida y muerte
		</h2>
		<p class="text-gray md:mx-20 mt-20">
			Cuba experimenta la ola migratoria más grande en los últimos 60 años. Entre enero de 2021 y
			diciembre de 2022, 368 326 cubanos llegaron de manera irregular a los Estados Unidos, según
			datos de la <a
				class="underline"
				href="https://www.cbp.gov/newsroom/stats/nationwide-encounters?1649206653428"
				target="_blank"
				rel="noreferrer">Oficina de Aduanas y Protección Fronteriza norteamericana</a
			>, y los números siguen en aumento. 
			<br><br>
			Llegar a Estados Unidos es la primera opción migratoria
			para quienes quieren salir de Cuba, aunque no la única. A pesar de la cercanía geográfica, el
			problema está en cómo hacerlo, pues las vías legales para obtener un visado han sido muy
			limitadas. El cierre de la Embajada en La Habana en 2017, la pandemia y, sobre todo, la
			profunda crisis que se vive en Cuba han empujado a los migrantes a buscar vías alternativas
			—peligrosas e irregulares— para salir de la isla rumbo al norte. 
			<br><br>
			Aunque la mayoría de las
			personas llegan a su destino; para lograrlo emprenden vías costosas e inseguras, con
			incidentes violentos o peligros naturales. Se exponen a ser interceptados por las autoridades
			locales y pueden, en el camino, perderlo todo, incluso la vida.
		</p>
	</div>
	<div class="section-2-decor">
		<img class="decor-bg" src={MapBackground} alt="" />
		<LinePath id="line" class="decor-line w-full hidden md:block" />
		<LinePathSmall id="line" class="decor-line w-full md:hidden" />
		<img id="plane" class="decor-plane" src={Plane} alt="" />
		<img id="volcano" class="decor-volcano" src={Volcano} alt="" />
	</div>
</section>

<style>
	.section-2 {
		padding-top: 200px;
	}
	.section-2 .section-2-decor {
		position: relative;
		margin-top: 5rem;
		width: 100%;
		height: 736px;
	}
	.section-2 .section-2-decor .decor-bg {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		object-fit: cover;
		object-position: center;
		z-index: 1;
		height: 600px;
	}

	:global(.section-2 .section-2-decor .decor-line) {
		z-index: 2;
		position: relative;
	}
	.section-2 .section-2-decor .decor-plane {
		position: absolute;
		width: 400px;
		height: 400px;
		object-fit: contain;
		object-position: center;
		z-index: 9999;
	}
	.section-2 .section-2-decor .decor-volcano {
		position: absolute;
		width: 50%;
		top: 30%;
		left: 20%;
		z-index: 4;
	}

	@media (max-width: 768px) {
		.section-2 .section-2-decor .decor-bg {
			height: 736px;
		}

		.section-2 .section-2-decor .decor-volcano {
			width: 100%;
		}

		.section-2 .section-2-decor .decor-plane {
			width: 300px;
			height: 300px;
			transform: rotate(-130deg);
			left: calc(50% - 200px);
			bottom: calc(50% - 250px);
		}
	}
</style>
