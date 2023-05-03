<script lang="ts">
	import gsap from 'gsap';
	import ScrollToPlugin from 'gsap/ScrollToPlugin';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';
	import TimelineEvents from './timeline-events.svelte';
	import TimelineModal from './timeline-modal.svelte';
	import TimelineSwiper from './timeline-swiper.svelte';
	import TimeLine from './timeline.svelte';
	import TimelineEventModal from './timeline-event-modal.svelte';
	import TimelineModalContent from './timeline-modal-content.svelte';

	export let events: any[] = [];
	let years: number[] = [];
	let timeline: any;
	let timelineSwiper: any;
	let counter: number = 0;
	let isDisabled: boolean = true;
	let showModal: boolean = false;
	let windowWidth = 0;
	let modal: any;
	let showEndScroll: boolean = false;

	let swiperIndex = 0;
	let eventIndex = 0;
	$: selected = featureds[swiperIndex];

	const emptyToNull = (value: string): string | null => (value === '' ? null : value);

	const stringToDate = (value: string): Date | NaN => {
		try {
			const [day, month, year] = value.split('/');
			return new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12));
		} catch (error) {
			return NaN;
		}
	};
	const dataToObject = (data: any[][]) => {
		let values: any[] = data.map((value: any[]) => {
			const date = stringToDate(value[1]);

			if (isNaN(date)) {
				return { date };
			}

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
		years = [...new Set(years)].reverse().filter((value) => value);
		return values
			.filter((value) => !isNaN(value.date))
			.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
	};
	events = dataToObject(events);
	let featureds = events.filter((event) => event.isFeature);

	const show_event = (event: any) => {
		const index = featureds.findIndex((value) => value.id == event.id);
		swiperIndex = index + 1 - 1;
		timeline.changeSelected(featureds[index]);
		if (windowWidth <= 768) {
			isDisabled = false;
			modal?.update(featureds[index].id);
			showModal = true;
		} else {
			selected = featureds[swiperIndex];
		}
	};

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(ScrollToPlugin);
		const tl = gsap.timeline();

		timeline.changeSelected(featureds[eventIndex], isDisabled);

		if (windowWidth >= 768) {
			// desktop
			tl.to('#eventos', {
				scrollTrigger: {
					trigger: '#eventos',
					start: 'top top',
					pin: '#eventos',
					end: '+=10000',
					// markers: true,
					onUpdate: (self) => {
						const endPercents = 80;
						const progress = parseFloat(self.progress.toFixed(2)) * 100;
						const value = parseFloat((endPercents / featureds.length).toFixed(0));

						if (!isDisabled) {
							self.disable();
							showEndScroll = false;
							gsap.to(window, { transition: 1, scrollTo: '#eventos' });
							return;
						}
						if (progress >= 95) {
							console.log('entro')
							isDisabled = false;
							return;
						} else if (progress >= endPercents) {
							if (isDisabled) {
								featureds = events;
								swiperIndex = featureds.length - 1;
								eventIndex = swiperIndex;
								timeline.changeSelected(featureds[eventIndex]);
								timeline.resetFilter();
							}
							showEndScroll = true;
							return;
						} else if (progress >= counter && progress < value + counter) {
						} else if (progress > counter) {
							counter += value;
							if (swiperIndex >= featureds.length) {
								swiperIndex = featureds.length - 1;
							} else {
								swiperIndex += 1;
							}
							eventIndex = events.indexOf(featureds[swiperIndex]);
							if (eventIndex === -1) {
							} else {
								timeline.changeSelected(events[eventIndex], isDisabled);
							}
						} else if (progress < counter) {
							counter -= value;
							if (swiperIndex >= featureds.length) {
								swiperIndex = featureds.length - 1;
							} else {
								swiperIndex -= 1;
							}
							eventIndex = events.indexOf(featureds[swiperIndex]);
							timeline.changeSelected(events[eventIndex], isDisabled);
						}
						featureds = events.filter((event) => event.isFeature);
						if (swiperIndex != -1) {
							selected = featureds[swiperIndex];
						}
					},
				}
			});
		} else {
			// mobile view
			const eventsDivs = gsap.utils.toArray('.event-info');
			tl.to(eventsDivs, {
				xPercent: -100 * (eventsDivs.length - 1),
				ease: 'none',
				scrollTrigger: {
					trigger: '#eventos',
					pin: true,
					scrub: 1,
					snap: 1 / (eventsDivs.length - 1),
					end: () => '+=7000', // + document.querySelector('#event-container').offsetWidth
					onLeave: () => {
						isDisabled = false;
						featureds = events;
						// showEndScroll = true;
					}
				}
			});
			// isDisabled = false;
			featureds = events;
			swiperIndex = featureds.length - 1;
			eventIndex = swiperIndex;
			timeline.changeSelected(featureds[eventIndex]);
			timeline.resetFilter();
		}
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section
	id="section-timeline"
	class="flex flex-col items-center relative section-timeline bg-dark md:pb-20"
>
	{#if showModal}
		<TimelineModal
			bind:this={modal}
			on:close={() => (showModal = false)}
			event={featureds[swiperIndex]}
		/>
	{/if}
	{#if showEndScroll}
		<TimelineEventModal on:close={() => (showEndScroll = false)} />
	{/if}
	<div class="container">
		<div class="flex flex-col justify-center items-center pt-10 md:pt-32">
			<div class="max-w-3xl md:mb-10 px-10">
				<h2 class="font-sans font-extrabold text-5xl md:text-5xl text-light mb-7">
					El final
					<span class="text-accent">"infeliz"</span>
					<br />
					del camino
				</h2>
				<p class="text-light">
					Hasta el momento hemos identificado {events.length} incidentes que han ocurrido desde enero
					de 2021 que involucran a migrantes cubanos en diferentes zonas geográficas. Los eventos dramáticos
					que involucran a migrantes incluyen una serie de hechos como deportaciones, rescates, intercepciones
					en el mar, detenidos por las autoridades de los países donde se encuentra, devueltos o repatriados.
					En estos casos, si bien no siempre terminan con la vida de las personas, frustran sus planes
					y las ponen en una situación de vulnerabilidad. Algunas de ellas invirtieron todos sus ahorros,
					vendieron sus pertenencias o renunciaron a sus trabajos y no tienen otras alternativas legales
					para migrar.
				</p>

				<p class="text-light mt-2">
					Por ejemplo, desde octubre de 2020 hasta enero de 2023, la Guardia Costera de los Estados
					Unidos
					<a
						href="https://www.news.uscg.mil/Press-Releases/Article/3265898/coast-guard-repatriates-177-people-to-cuba/"
						class="underline"
						target="_blank"
						rel="noreferrer">interceptó</a
					>
					a 11 937 migrantes cubanos en el mar cuando intentaban llegar a territorio estadounidense.
					La mayoría de ellos fueron repatriados a la isla. Según los datos recopilados por nuestro equipo
					durante ese período, las autoridades nacionales regresaron a Cuba al menos a 8 643 personas
					desde Estados Unidos, 5 902 desde México, 16 desde Guatemala y 195 desde Bahamas.
				</p>

				<p class="text-light mt-2">
					En esta línea de tiempo se pueden consultar todos los eventos que hemos identificado y que
					involucran a cubanos.
				</p>
			</div>
		</div>
		<div
			id="eventos"
			class="flex flex-col mt-3 md:mt-0 md:flex-row panel-container py-0 md:py-10 md:h-screen"
		>
			<div
				class="h-screen shrink-0 md:shrink md:h-full md:w-1/3 md:pb-20 relative bg-accent md:rounded-xl text-light {windowWidth >=
				768
					? 'flex justify-center'
					: ''}"
			>
				{#if windowWidth >= 768}
					<TimelineSwiper
						events={featureds}
						{selected}
						{timeline}
						{isDisabled}
						{swiperIndex}
						bind:this={timelineSwiper}
					/>
				{:else}
					<TimelineEvents events={events.filter((event) => event.isFeature)} />
				{/if}
			</div>
			{#if windowWidth < 780}
				<div class="bg-dark px-3 h-screen text-light flex items-center">
					<TimelineModalContent />
				</div>
			{/if}
			<div class="w-full md:w-2/3 ml-2 mt-5 md:mt-0">
				<div class="h-4/5 md:h-full">
					<TimeLine bind:this={timeline} {events} {years} {isDisabled} {show_event} />
				</div>
			</div>
		</div>

		<div class="flex flex-col justify-center items-center pt-10 md:pt-32">
			<div class="max-w-3xl mb-10 px-10">
				<p class="text-light">
					La migración es una elección personal; pero sobre todo es el reflejo de la falta de
					oportunidades en la isla y una expresión clara de inconformidad con la realidad que viven
					en Cuba. Es una decisión económica y también política. Cuando alguien, a pesar de todos
					los riesgos, opta por salir de manera irregular —porque no tiene otra opción— sus
					motivaciones van más allá de los peligros. Toma una decisión de vida, que también puede
					llevarle a la muerte.
				</p>
			</div>
		</div>
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
