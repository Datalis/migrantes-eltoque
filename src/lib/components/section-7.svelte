<script lang="ts">
	import { ArrayChunks, emptyToNull, stringToDate } from '$lib/utils';
	import { onMount } from 'svelte';
	import ArrowRightIcon from '$lib/assets/images/arrow-right.svg?component';
	import ArrowLeftIcon from '$lib/assets/images/arrow-left.svg?component';
	import ArrowDown from '$lib/assets/images/scrollDown.svg?component';

	// @ts-ignore
	import DetencionImg from '$lib/assets/images/section-timeline/detencion.png?w=400&webp';
	// @ts-ignore
	import MuerteImg from '$lib/assets/images/section-timeline/muerte.png?w=400&webp';
	// @ts-ignore
	import RepatriacionImg from '$lib/assets/images/section-timeline/repatriacion.png?w=400&webp';
	// @ts-ignore
	import RescateImg from '$lib/assets/images/section-timeline/rescates.png?w=400&webp';
	// @ts-ignore
	import DesaparicionImg from '$lib/assets/images/section-timeline/desaparicion.png?w=400&webp';
	// @ts-ignore
	import ExpulsionImg from '$lib/assets/images/section-timeline/expulsion.png?w=400&webp';
	// @ts-ignore
	import IntercepcionImg from '$lib/assets/images/section-timeline/intercepcion.png?w=400&webp';
	// @ts-ignore
	import TransferenciaImg from '$lib/assets/images/section-timeline/transferencia.png?w=400&webp';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

	const MONTHS = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	];

	const MAX_EVENTS_PER_MONTH = 16;

	export let events: any[][] = [];

	const flattenEvents = (events: string[][]) => {
		const values = events.map((event) => {
			return {
				id: parseInt(event[0]),
				date: stringToDate(event[1]),
				name: emptyToNull(event[2]),
				description: emptyToNull(event[3]),
				eventType: emptyToNull(event[4]),
				migrationType: emptyToNull(event[5]),
				country: emptyToNull(event[6]),
				location: emptyToNull(event[7]),
				coordenates: emptyToNull(event[8]),
				names: emptyToNull(event[9]),
				personsNo: emptyToNull(event[10]) || 0,
				womenNo: emptyToNull(event[11]) || 0,
				menNo: emptyToNull(event[12]) || 0,
				childrenNo: emptyToNull(event[13]) || 0,
				deaths: emptyToNull(event[14]) || 0,
				missingsNo: emptyToNull(event[15]) || 0,
				history: emptyToNull(event[16]),
				source: emptyToNull(event[17]),
				multimedia: emptyToNull(event[18]),
				links: emptyToNull(event[19]),
				isFeature: emptyToNull(event[20])
			};
		});
		return values.reverse();
	};

	$: _events = flattenEvents(events);

	$: _featuredEvents = _events.filter((event) => event.isFeature);

	$: _years = _events
		.filter((event) => event.date !== undefined)
		.map((event) => event.date?.getFullYear())
		.reduce((acc: number[], year) => {
			if (!year) return acc;
			if (!acc.includes(year)) acc.push(year);
			return acc;
		}, []);

	$: _selected = _featuredEvents?.[0];
	$: _selectedIndex = _events?.findIndex((e) => e?.id == _selected?.id);

	$: _reversedMonths = [...MONTHS].reverse();

	let selectedFilter: string = '';
	let isDisabled = true;

	const activateFilter = () => {};

	const getMonthData = (events: Record<string, any>[], month: string, year: number): any[][] => {
		const monthIndex = MONTHS.indexOf(month);
		const monthEvents = events.filter((event: any) => {
			return event.date?.getMonth() === monthIndex && event.date?.getFullYear() === year;
		});
		if (monthEvents.length > MAX_EVENTS_PER_MONTH) {
			return ArrayChunks(monthEvents, MAX_EVENTS_PER_MONTH);
		} else {
			return [monthEvents];
		}
	};

	const getImageFromEvent = (event: any) => {
		switch (event.eventType) {
			case 'repatriación':
				return RepatriacionImg;
			case 'detención':
				return DetencionImg;
			case 'muerte':
				return MuerteImg;
			case 'rescates':
				return RescateImg;
			case 'desaparición':
				return DesaparicionImg;
			case 'rescate':
				return RescateImg;
			case 'intercepción':
				return IntercepcionImg;
			case 'transferencia':
				return TransferenciaImg;
			case 'expulsión':
				return ExpulsionImg;
			default:
				return RepatriacionImg; // TODO: add other images
		}
	};

	const handlePrev = () => {
		_selected = _events[_selectedIndex - 1];
	};
	const handleNext = () => {
		_selected = _events[_selectedIndex + 1];
	};

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
		const timeline = document.getElementById('timeline');
		const modal = document.getElementById('modal');
		const mm = gsap.matchMedia();
		mm.add('(min-width: 768px)', () => {
			ScrollTrigger.create({
				trigger: '#events',
				start: 'center center',
				end: () => `+=${_featuredEvents.length + 1 * 100}}%`,
				scrub: true,
				pin: true,
				anticipatePin: 1,
				// markers: true,
				invalidateOnRefresh: true,
				onLeave: (self) => {
					self.scroll(self.start);
					self.disable();
					self?.animation?.progress(1);
				},
				onUpdate: (self) => {
					const progress = +self.progress.toFixed(2);

					const index = Math.floor(progress * (_featuredEvents.length + 1));
					if (index < _featuredEvents.length) {
						if (_selected?.id !== _featuredEvents[index]?.id) {
							_selected = _featuredEvents[index];
							const ball = document.getElementById(`ball-${_selected.id}`);
							if (ball && timeline) {
								gsap.to(timeline, {
									scrollTo: {
										x: ball,
										offsetX: timeline.clientWidth / 2 - ball.clientWidth
									}
								});
							}
						}
					} else if (index == _featuredEvents.length && isDisabled) {
						document.body.style.overflow = 'hidden';
						gsap.to(modal, {
							opacity: 1,
							duration: 0.5,
							zIndex: 100,
							onComplete: () => {
								self.scroll(self.start);
								self.disable();
								self.animation?.progress(1);
							}
						});
					}
				}
			});
		});
		mm.add('(max-width: 767px)', () => {
			const eventsDivs = gsap.utils.toArray('.event-info');
			gsap.to(eventsDivs, {
				xPercent: -100 * (eventsDivs.length - 1),
				ease: 'none',
				scrollTrigger: {
					trigger: '#events',
					pin: true,
					scrub: 1,
					anticipatePin: 1,
					snap: 1 / (eventsDivs.length - 1),
					end: () => '+=7000', // + document.querySelector('#event-container').offsetWidth
					onLeave: () => {
						isDisabled = false;
						// featureds = events;
						// showEndScroll = true;
					}
				}
			});
		});

		return () => {
			mm.kill();
		};
	});

	const resumeScroll = () => {
		const timeline = document.getElementById('timeline');
		const modal = document.getElementById('modal');
		gsap.to(modal, {
			opacity: 0,
			duration: 0.5,
			zIndex: -10,
			onComplete: () => {
				isDisabled = false;
				document.body.style.overflow = 'auto';
				_selected = _events[0];
				const ball = document.getElementById(`ball-${_selected.id}`);
				if (ball && timeline) {
					gsap.to(timeline, {
						scrollTo: {
							x: ball,
							offsetX: timeline.clientWidth / 2 - ball.clientWidth
						}
					});
				}
			}
		});
	};
</script>

<section id="eventos" class="section-timeline">
	<div class="bg-dark pt-20 pb-20">
		<div class="container mx-auto flex">
			<div class="max-w-3xl mx-auto md:mb-10 px-10">
				<h2 class="font-sans font-extrabold text-5xl md:text-5xl text-light mb-7">
					El final
					<span class="text-accent">"infeliz"</span>
					<br />
					del camino
				</h2>
				<p class="text-light">
					Hasta el momento hemos identificado {events.length} incidentes que han ocurrido desde 2014
					que involucran a migrantes cubanos en diferentes zonas geográficas. Los eventos dramáticos
					que involucran a migrantes incluyen una serie de hechos como deportaciones, rescates, intercepciones
					en el mar, detenidos por las autoridades de los países donde se encuentra, devueltos o repatriados.
					En estos casos, si bien no siempre terminan con la vida de las personas, frustran sus planes
					y las ponen en una situación de vulnerabilidad. Algunas de ellas invirtieron todos sus ahorros,
					vendieron sus pertenencias o renunciaron a sus trabajos y no tienen otras alternativas legales
					para migrar.
				</p>

				<p class="text-light mt-2">
					Por ejemplo, desde octubre de 2020 hasta marzo de 2023, la Guardia Costera de los Estados
					Unidos
					<a
						href="https://www.news.uscg.mil/Press-Releases/Article/3265898/coast-guard-repatriates-177-people-to-cuba/"
						class="underline"
						target="_blank"
						rel="noreferrer">interceptó</a
					>
					a 12 866 migrantes cubanos en el mar cuando intentaban llegar a territorio estadounidense.
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
	</div>

	<div id="events" class="md:h-screen md:py-10 bg-dark relative">
		<div
			id="modal"
			class="absolute w-full top-0 bottom-0 py-10 bg-dark -z-10 flex flex-col items-center opacity-0"
		>
			<div class="md:w-96 text-center flex flex-col items-center text-light">
				<h2 class="font-sans font-extrabold text-3xl mb-7">Tenemos más historias que contarte</h2>
				Cada círculo corresponde a un evento migratorio. Puedes seguir explorando cada uno de ellos en
				esta herramienta interactiva y seleccionar las categorías que quieras ver.
			</div>
			<button
				on:click={resumeScroll}
				class="animate-bounce absolute bottom-4 w-14 h-14 rounded-full border-accent border-2 p-2 hidden md:flex items-center cursor-pointer"
			>
				<ArrowDown />
			</button>
		</div>
		<div class="container mx-auto h-full md:flex gap-5">
			<div class="w-full md:w-1/3">
				<div
					id="swiper"
					class="hidden md:block relative bg-accent rounded-2xl h-full overflow-hidden pt-16 pb-5 text-light"
				>
					<img
						class="absolute w-full top-0 left-0 z-0"
						src={getImageFromEvent(_selected)}
						alt="event_image"
					/>
					<div class="flex flex-col z-10 relative h-full">
						<div class="flex-1 overflow-y-scroll px-8">
							<h3 class="uppercase font-bold mb-4">
								{_selected?.date && MONTHS?.[_selected?.date.getMonth()]}
								{_selected?.date?.getFullYear()} / {_selected?.eventType}
							</h3>
							<p>
								{_selected?.description}
							</p>
							<p class="mt-4">
								<span class="font-bold uppercase">Fuente:</span>
								<a class="underline underline-offset-2" href="f" target="_blank" rel="noreferrer"
									>source</a
								>
							</p>
						</div>
						<div
							class:hidden={isDisabled}
							class="flex swiper-controls bottom-3 w-full justify-center z-20 pt-4 mx-auto"
						>
							<button on:click={() => handlePrev()}>
								<ArrowLeftIcon
									class="control mr-4 {_selectedIndex == 0 ? 'control-disabled' : ''}"
									width="48"
									height="48"
								/>
							</button>
							<button on:click={() => handleNext()}>
								<ArrowRightIcon
									class="control {_selectedIndex == _events?.length - 1 ? 'control-disabled' : ''}"
									width="48"
									height="48"
								/>
							</button>
						</div>
					</div>
				</div>
				<div
					id="swiper-mobile"
					class="md:hidden relative bg-accent h-full overflow-hidden pb-5 text-light"
				>
					<div id="event-container" class="flex">
						{#each _featuredEvents as e}
							<div class="event-info w-screen h-screen shrink-0 event-{e.id}">
								<img
									class="p-2 absolute z-0"
									src={getImageFromEvent(e)}
									alt={e.name}
									loading="lazy"
								/>
								<div class="px-8 mt-40 md:mt-24 relative z-10">
									<h3 class="uppercase font-bold mb-4">
										{e.date && MONTHS[e.date.getMonth()]}
										{e?.date?.getFullYear()} / {e.eventType}
									</h3>
									<p>{e.description}</p>
									{#if e.source}
										<p class="mt-4">
											<span class="font-bold uppercase">Fuente:</span>
											<a
												class="underline underline-offset-2"
												href={e.links}
												target="_blank"
												rel="noreferrer">{e.source}</a
											>
										</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="w-full md:hidden h-screen px-5">
				<div class="text-center flex flex-col items-center justify-center text-light h-full">
					<h2 class="font-sans font-extrabold text-3xl mb-7">Tenemos más historias que contarte</h2>
					Cada círculo corresponde a un evento migratorio. Puedes seguir explorando cada uno de ellos
					en esta herramienta interactiva y seleccionar las categorías que quieras ver.
				</div>
			</div>
			<div class="w-full md:w-2/3 flex flex-col py-10 md:py-0 px-5 h-screen md:h-auto">
				<div id="filters">
					<button
						class="button {selectedFilter === 'detención' ? 'active' : ''}"
						on:click={() => (selectedFilter = 'detención')}
						disabled={isDisabled}
						title="En la mayoría de los casos fueron realizadas por la Patrulla Fronteriza de Estados Unidos a quienes llegan a través de la frontera con México o a balseros que logran tocar tierra."
					>
						Detenciones
					</button>
					<button
						class="button {selectedFilter === 'rescate' ? 'active' : ''}"
						on:click={() => (selectedFilter = 'rescate')}
						disabled={isDisabled}
						title="El rescate ocurre cuando los migrantes son detenidos en situaciones como accidentes, naufragios, hundimientos, o se encuentran varados en islas deshabitadas. En estos casos, la vida de los migrantes está en potencial peligro."
					>
						Rescates
					</button>
					<button
						class="button {selectedFilter === 'intercepción' ? 'active' : ''}"
						disabled={isDisabled}
						on:click={() => (selectedFilter = 'intercepción')}
						title="La mayoría de las intercepciones son llevadas a cabo por la Guardia Costera de Estados Unidos que se encarga de retener o interrumpir la travesía antes de que los migrantes toquen tierra."
					>
						Intercepciones
					</button>
					<button
						class="button {selectedFilter === 'transferencia' ? 'active' : ''}"
						disabled={isDisabled}
						on:click={() => (selectedFilter = 'transferencia')}
						title="Se emplea el término para clasificar los casos en los que la Guardia Costera de EE. UU. transfiere un grupo de balseros cubanos interceptados en el mar a las autoridades bahameñas, pues fueron detenidos en territorio de Bahamas."
					>
						Transferencias
					</button>
					<button
						class="button {selectedFilter === 'expulsión' ? 'active' : ''}"
						on:click={() => (selectedFilter = 'expulsión')}
						disabled={isDisabled}
						title="La categoría se utiliza solo en Guatemala para clasificar a los migrantes cubanos que no son deportados, pero sí expulsados del territorio de tránsito."
					>
						Expulsión
					</button>
					<button
						class="button {selectedFilter === 'repatriación' ? 'active' : ''}"
						disabled={isDisabled}
						on:click={() => (selectedFilter = 'repatriación')}
						title="Cuando un migrante es devuelto voluntaria o involuntariamente a su país de origen."
					>
						Repatriación
					</button>
					<button
						class="button {selectedFilter === 'muerte' ? 'active' : ''}"
						on:click={() => (selectedFilter = 'muerte')}
						disabled={isDisabled}
						title="Cuando se reporta la muerte de una o varias personas como consecuencia de un evento migratorio."
					>
						Muerte
					</button>
					<button
						class="button {selectedFilter === 'desaparición' ? 'active' : ''}"
						disabled={isDisabled}
						on:click={() => (selectedFilter = 'desaparición')}
						title="Aquellas personas que emprendieron una ruta migratoria y no se ha reportado la llegada a su destino."
					>
						Desapariciones
					</button>
				</div>
				<div id="timeline">
					<div class="wrapper">
						{#each _years as year}
							<div class="year-container">
								<div class="line year">
									<span>{year}</span>
								</div>
								{#each _reversedMonths as month, m (m)}
									{@const monthData = getMonthData(_events, month, year)}
									{#if monthData[0].length > 0}
										{#each monthData as md, i (i)}
											<div class="line month" class:second={i > 0}>
												<div class="events">
													{#each md as d}
														{#key d.id}
															<button
																disabled={isDisabled}
																class="ball"
																class:selected={_selected.id == d.id &&
																	_selected.date?.toISOString() == d.date.toISOString()}
																class:animated={d.isFeature}
																class:highlighted={selectedFilter == d.eventType}
																on:click={() => (_selected = d)}
																id={`ball-${d.id}`}
															>
																<span class="hidden">{d.date.toString()}</span>
															</button>
														{/key}
													{/each}
												</div>
												<span>{month}</span>
											</div>
										{/each}
									{/if}
								{/each}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col justify-center items-center pt-10 md:py-28 bg-dark">
		<div class="max-w-3xl mb-10 px-10">
			<p class="text-light">
				La migración es una elección personal; pero sobre todo es el reflejo de la falta de
				oportunidades en la isla y una expresión clara de inconformidad con la realidad que viven en
				Cuba. Es una decisión económica y también política. Cuando alguien, a pesar de todos los
				riesgos, opta por salir de manera irregular —porque no tiene otra opción— sus motivaciones
				van más allá de los peligros. Toma una decisión de vida, que también puede llevarle a la
				muerte.
			</p>
		</div>
	</div>
</section>

<style lang="postcss">
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
	#filters {
		@apply overflow-x-scroll overflow-y-hidden flex items-center mb-2 gap-1;
		-ms-overflow-style: none;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
		.button {
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			@apply rounded-lg text-light bg-dark my-1 px-2 py-1 border border-accent text-xs transition-all duration-200;
			&:hover:not(.active) {
				@apply bg-light text-accent;
				box-shadow: none;
			}
			&.active {
				@apply bg-accent border-dark border;
			}
		}
	}

	#timeline {
		@apply h-full overflow-x-scroll;
		.wrapper {
			@apply pr-4 flex items-stretch justify-evenly border border-light rounded-xl py-4 w-max min-w-full h-full;
		}
		.year-container {
			@apply flex justify-evenly w-full;
			.line {
				writing-mode: vertical-rl;
				transform: rotate(180deg);
				pointer-events: none;
				@apply flex items-end justify-end min-w-[2.5rem] text-gray text-opacity-50 text-sm border-l-2 border-light border-opacity-50 text-end;
				&.year {
					@apply text-accent border-l-4 border-opacity-100 text-opacity-100;
				}
				&.second {
					@apply text-opacity-25 border-opacity-25 border-dashed;
				}
			}

			.events {
				@apply flex-1 flex justify-center items-center gap-[1px];
			}

			.ball {
				--ball-size: 20px;
				cursor: pointer;
				pointer-events: all;
				@apply z-10 bg-dark border-2 border-accent rounded-full w-[var(--ball-size)] h-[var(--ball-size)] relative translate-x-[-10px];
				&.selected {
					@apply bg-light border-0;
				}

				&:hover:not(:disabled) {
					@apply bg-light border-light transition-all duration-500;
				}

				&.animated {
					@keyframes pulse {
						50% {
							transform: translateX(-10px) scale(0.95);
						}
					}
					animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
					transform-origin: center center;
				}

				&.highlighted:not(.selected) {
					@apply bg-light border-none border-0;
					box-shadow:
						inset 0 0 0 2px rgb(120, 86, 255),
						inset 0 0 0 6px rgb(31, 32, 67);
				}
			}
		}
	}
</style>
