<script lang="ts">
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import ArrowRightIcon from '$lib/assets/images/arrow-right.svg?component';
	import ArrowLeftIcon from '$lib/assets/images/arrow-left.svg?component';
	import TimeLine from './timeline.svelte';

	export let events: any[] = [];
	let years: number[] = [];
	let timeline: any;
	let counter: number = 0;
	let isDisabled: boolean = true;

	let swiperIndex = 0;
	let swiper: {
		[x: string]: any;
		activeIndex: number;
	};

	function onSwiper(e: any) {
		swiper = e.detail[0];
	}

	function onSlideNext(e: any) {
		swiperIndex !== featureds.length && ++swiperIndex;
		timeline.changeSelected(featureds[swiperIndex], true);
	}

	function onSlidePrev(e: any) {
		swiperIndex !== 0 && --swiperIndex;
		timeline.changeSelected(featureds[swiperIndex]);
	}

	function onSwiperNext(e: any, allowToSweep: boolean | null = null) {
		if (allowToSweep) {
			swiper.slideNext();
		} else if (!isDisabled) {
			console.log(isDisabled, allowToSweep)
			swiper.slideNext();
		}
	}

	function onSwiperPrev(e: any, allowToSweep: boolean | null = null) {
		if (allowToSweep) {
			swiper.slidePrev();
		} else if (!isDisabled) {
			swiper.slidePrev();
		}
	}

	const emptyToNull = (value: string): string | null => (value === '' ? null : value);

	const stringToDate = (value: string): Date => {
		const [day, month, year] = value.split('/');
		return new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12));
	};
	const dataToObject = (data: any[][]) => {
		let values: any[] = data.map((value: any[]) => {
			const date = stringToDate(value[1]);
			if (years.length == 0 || years[years.length - 1] != date.getFullYear()) {
				years.push(date.getFullYear());
			}

			return {
				id: parseInt(value[0]),
				date,
				name: emptyToNull(value[2]),
				description: emptyToNull(value[3]),
				eventType: emptyToNull(value[4]),
				migrationType: emptyToNull(value[5]),
				country: emptyToNull(value[6]),
				location: emptyToNull(value[7]),
				coordenates: emptyToNull(value[8]),
				names: emptyToNull(value[9]),
				personsNo: emptyToNull(value[10]) || 0,
				womenNo: emptyToNull(value[11]) || 0,
				menNo: emptyToNull(value[12]) || 0,
				childrenNo: emptyToNull(value[13]) || 0,
				deaths: emptyToNull(value[14]) || 0,
				missingsNo: emptyToNull(value[15]) || 0,
				history: emptyToNull(value[16]),
				source: emptyToNull(value[17]),
				multimedia: emptyToNull(value[18]),
				links: emptyToNull(value[19]),
				isFeature: emptyToNull(value[20])
			};
		});
		years.reverse();
		return values.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
	};
	events = dataToObject(events);
	const featureds = events.filter((event) => event.isFeature);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.to('#events', {
			scrollTrigger: {
				trigger: '#events',
				start: 'top top',
				// pinSpacing: false,
				pin: '#events',
				end: '+=3000',
				markers: true,
				onUpdate: (self) => {
					const progress = parseFloat(self.progress.toFixed(1));
					if (progress > counter) {
						counter = progress;
						onSwiperNext(null, true);
					} else if (progress < counter) {
						counter = progress;
						onSwiperPrev(null, true);
					}
				}
			}
		});
	});

</script>

<section id="section-timeline" class="relative section-timeline bg-dark md:pb-20 px-10">
	<div class="flex flex-col justify-center items-center pt-10 md:pt-32">
		<div class="max-w-3xl md:mb-10 px-10">
			<h2 class="font-sans font-extrabold text-5xl md:text-5xl text-light mb-7">
				El final
				<span class="text-accent">"infeliz"</span>
				<br />
				del camino
			</h2>
			<p class="text-light">
				Hasta el momento hemos identificado más de 580 incidentes que han ocurrido desde enero de
				2021 que involucran a migrantes cubanos en diferentes zonas geográficas. Las historias no
				solo reflejan la tragedia que significa que alguien muera o desaparezca, también han sido
				rescatados o interceptados en el mar, detenidos por las autoridades de los países donde se
				encuentra, devueltos o repatriados.
			</p>
		</div>
	</div>
	<div id="events" class="flex panel-container py-10 h-screen">
		<div class="w-1/3 relative bg-accent rounded-xl flex flex-col justify-center text-light">
			<Swiper
				on:swiper={onSwiper}
				on:slideNextTransitionStart={onSlideNext}
				on:slidePrevTransitionStart={onSlidePrev}
				autoHeight={true}
				preloadImages={false}
				lazy={{
					loadPrevNext: true,
					loadPrevNextAmount: 2
				}}
				slidesPerView={1}
				spaceBetween={50}
				centeredSlides={true}
			>
				{#each featureds as featured}
					<SwiperSlide>
						<p class="px-10">{featured.description}</p>
						<p class="px-10 mt-2">
							<span class="font-bold uppercase">Fuente:</span>
							<a
								class="underline underline-offset-2"
								href={featured.links}
								target="_blank"
								rel="noreferrer">{featured.source}</a
							>
						</p>
					</SwiperSlide>
				{/each}
			</Swiper>
			<div class="swiper-controls absolute bottom-3 w-full justify-center hidden md:flex ml-auto">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click={onSwiperPrev}>
					<ArrowLeftIcon
						class="control mr-4 {swiperIndex == 0 || isDisabled ? 'control-disabled' : ''}"
						width="48"
						height="48"
					/>
				</span>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click={onSwiperNext}>
					<ArrowRightIcon
						class="control {swiperIndex == featureds?.length - 1 || isDisabled ? 'control-disabled' : ''}"
						width="48"
						height="48"
					/>
				</span>
			</div>
		</div>
		<div class="w-2/3 ml-2">
			<TimeLine bind:this={timeline} {events} {years} selected={featureds[swiperIndex]} />
		</div>
	</div>

	<div class="max-w-3xl px-10">
		<p class="text-light">
			Desde octubre de 2020 hasta enero de 2023, la Guardia Costera de los Estados Unidos <a
				class="underline"
				target="_blank"
				rel="noreferrer"
				href="https://www.news.uscg.mil/Press-Releases/Article/3265898/coast-guard-repatriates-177-people-to-cuba/"
				>interceptó</a
			>
			a 11 937 migrantes cubanos en el mar cuando intentaban llegar a territorio estadounidense. La mayoría
			de ellos fueron repatriados a la isla. Según los datos recopilados por nuestro equipo durante ese
			período, las autoridades nacionales regresaron a Cuba al menos a 8 643 personas desde Estados Unidos,
			<a
				class="underline"
				target="_blank"
				rel="noreferrer"
				href="http://www.politicamigratoria.gob.mx/es/PoliticaMigratoria/Boletines_Estadisticos"
				>5 902</a
			>
			desde México, 16 desde Guatemala y 195 desde Bahamas.
			<br /><br />
			Los eventos dramáticos que involucran a migrantes incluyen una serie de hechos como deportaciones,
			rescates, que, si bien no siempre terminan con la vida de las personas, frustran sus planes y las
			ponen en una situación de vulnerabilidad. Algunas de ellas invirtieron todos sus ahorros, vendieron
			sus pertenencias o renunciaron a sus trabajos y no tienen otras alternativas legales para migrar.
			<br /><br />
			La migración es una elección personal; pero sobre todo es el reflejo de la falta de oportunidades
			en la isla y una expresión clara de inconformidad con la realidad que viven en Cuba. Es una decisión
			económica y también política. Cuando alguien, a pesar de todos los riesgos, opta por salir de manera
			irregular —porque no tiene otra opción— sus motivaciones van más allá de los peligros. Toma una
			decisión de vida, que también puede llevarle a la muerte.
		</p>
	</div>
</section>

<style>
	:global(.section-timeline .swiper) {
		width: 100%;
	}

	:global(.section-timeline .swiper-controls .control) {
		cursor: pointer;
	}
	:global(.section-timeline .swiper-controls .control g) {
		@apply stroke-light;
	}
	:global(.section-timeline .swiper-controls .control.control-disabled) {
		opacity: 0.4;
		@apply cursor-auto;
	}
</style>
