<script lang="ts">
	import LinePath from '$lib/assets/images/section-5/line-full.svg?component';
	import LinePathSmall from '$lib/assets/images/section-5/line-small.svg?component';
	// @ts-ignore
	import SeaBackground from '$lib/assets/images/section-5/mar.webp?webp';
	// @ts-ignore
	import Ocean from '$lib/assets/images/section-5/ocean.webp?w=600&webp';
	// @ts-ignore
	import Map from '$lib/assets/images/section-5/map.webp?w=400&webp';

	import Button from './button.svelte';
	import ArrowRightIcon from '$lib/assets/images/arrow-right.svg?component';
	import ArrowLeftIcon from '$lib/assets/images/arrow-left.svg?component';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import Profile from './profile.svelte';

	// import InfoModal from './info-modal.svelte';
	import ReportModal from './report-modal.svelte';
	import Toast from './toast.svelte';
	import Counter from './counter.svelte';

	export let totals: any;
	export let missing: any[] = [];

	let showToast = false;
	let errorSubmit = false;

	// let showMissing = false;
	let showModal = false;
	let selectedPerson: any;

	let swiperIndex = 0;
	let swiper: {
		[x: string]: any;
		activeIndex: number;
	};

	function onSwiper(e: any) {
		swiper = e.detail[0];
	}

	function onSwiperNext() {
		swiper.slideNext();
		swiperIndex !== missing.length && ++swiperIndex;
	}

	function onSwiperPrev() {
		swiper.slidePrev();
		swiperIndex !== 0 && --swiperIndex;
	}
</script>

<Toast show={showToast} isError={errorSubmit} />

{#if showModal}
	{#key selectedPerson}
		<ReportModal
			name={selectedPerson?.[3]}
			on:close={() => {
				showModal = false;
				selectedPerson = null;
			}}
			on:submit={(e) => {
				showToast = true;
				errorSubmit = e.detail.isError;
				setInterval(() => {
					showToast = false;
				}, 8000);
			}}
		/>
	{/key}
{/if}

<section class="section-5 flex flex-col items-center justify-center bg-light min-h-screen pt-20">
	<div class="container mx-auto  md:px-0">
		<div class="max-w-3xl mx-10 md:mx-auto">
			<h2 class="font-sans font-extrabold text-7xl text-accent">
				<Counter amount={totals?.missing} />
			</h2>
			<h2 class="font-sans font-bold text-4xl text-dark my-4">Personas desaparecidas</h2>
			<p class="text-dark mt-10">
				Una persona migrante se considera desaparecida cuando no se tienen noticias de su llegada,
				pero tampoco existe un cuerpo que pueda confirmar la muerte. En el mejor de los casos, solo
				están retenidos por las autoridades e, incluso, pueden estar bajo custodia durante meses sin
				que se sepa nada de ellos. El protocolo para la búsqueda e identificación es complicado, en
				cada país puede ser diferente y la desesperación de la familia aumenta. Por ello, se
				recomienda a los familiares ponerse en contacto con las autoridades del país o de la zona
				donde se supone desapareció la persona.
				<br />
				<br />
				Sabemos que el proceso de búsqueda de información puede ser difícil y por eso ofrecemos este
				espacio para publicar los datos y fotos de quienes están desaparecidos y tratar de ayudar a despejar
				la incertidumbre.
			</p>
		</div>
		<div class="max-w-3xl flex mt-20 mx-10 md:mx-auto">
			<a href="/desaparecidos" class="w-full md:w-auto"
				><Button classes="w-full" type="bordered">Ver listado</Button></a
			>
			<div class="swiper-controls hidden md:flex ml-auto">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click={onSwiperPrev}>
					<ArrowLeftIcon
						class="control mr-4 {swiperIndex == 0 ? 'control-disabled' : ''}"
						width="48"
						height="48"
					/>
				</span>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click={onSwiperNext}>
					<ArrowRightIcon
						class="control {swiperIndex == missing?.length ? 'control-disabled' : ''}"
						width="48"
						height="48"
					/>
				</span>
			</div>
		</div>
		<div class="max-w-4xl mt-20 px-10 md:px-0">
			<Swiper
				on:swiper={onSwiper}
				autoHeight={true}
				preloadImages={false}
				lazy={{
					loadPrevNext: true,
					loadPrevNextAmount: 2
				}}
				slidesPerView={1}
				spaceBetween={50}
				centeredSlides={true}
				breakpoints={{
					'768': {
						slidesPerView: 2.5,
						spaceBetween: 30,
						centeredSlides: false
					},
					'1024': {
						slidesPerView: 3,
						spaceBetween: 30,
						centeredSlides: false
					}
				}}
			>
				{#each missing as p}
					<SwiperSlide>
						<Profile
							data={p}
							onClick={() => {
								selectedPerson = p;
								showModal = true;
							}}
						/>
					</SwiperSlide>
				{/each}
			</Swiper>

			<div class="swiper-controls flex justify-between w-full ml-auto mt-10 md:hidden">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click={onSwiperPrev}>
					<ArrowLeftIcon
						class="control {swiperIndex == 0 ? 'control-disabled' : ''}"
						width="48"
						height="48"
					/>
				</span>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click={onSwiperNext}>
					<ArrowRightIcon
						class="control {swiperIndex == missing?.length ? 'control-disabled' : ''}"
						width="48"
						height="48"
					/>
				</span>
			</div>
		</div>
		<div class="section-5-decor section-5-decor-sm md:hidden mt-10">
			<img src={SeaBackground} class="decor-bg" alt="" loading="lazy" />
			<LinePathSmall class="decor-line" />
			<img src={Ocean} class="decor-ocean" alt="" loading="lazy" />
			<img src={Map} class="decor-map" alt="" loading="lazy" />
		</div>
		<div
			class="max-w-3xl mx-auto bg-dark flex flex-col md:flex-row items-center p-10 md:mt-20 md:rounded-lg"
		>
			<p class="text-light text-lg md:text-sm mb-8 md:mb-0">
				Si tienes algún familiar, amigo o conocido que haya desaparecido tratando de migrar o
				conociste a alguien que viajaba contigo y se ha denunciado que no llegó, escríbenos.
				Queremos que no se olvide su historia y ayudar, de acuerdo con nuestras posibilidades.
			</p>
			<Button classes="w-full md:w-auto" onClick={() => (showModal = true)}
				>Reportar desaparecido</Button
			>
		</div>
	</div>
	<div class="hidden md:block section-5-decor">
		<img src={SeaBackground} class="decor-bg" alt="" loading="lazy" />
		<LinePath class="decor-line w-full" />
		<img src={Ocean} class="decor-ocean" alt="" loading="lazy" />
		<img src={Map} class="decor-map" alt="" loading="lazy" />
	</div>
</section>

<style>
	:global(.section-5 .swiper) {
		overflow: unset !important;
	}
	:global(.section-5 .swiper-controls .control) {
		cursor: pointer;
	}
	:global(.section-5 .swiper-controls .control.control-disabled) {
		opacity: 0.4;
	}
	.section-5 .section-5-decor {
		width: 100%;
		position: relative;
		height: 736px;
	}

	.section-5 .section-5-decor.section-5-decor-sm {
		height: 700px;
	}
	.section-5 .section-5-decor.section-5-decor-sm .decor-bg {
		height: 100%;
	}
	.section-5 .section-5-decor .decor-bg {
		position: absolute;
		bottom: 0;
		height: 550px;
		width: 100%;
		z-index: 1;
	}
	.section-5 .section-5-decor.section-5-decor-sm .decor-ocean {
		right: -70px;
		left: unset;
		width: 100%;
	}
	.section-5 .section-5-decor .decor-ocean {
		z-index: 4;
		position: absolute;
		width: 600px;
		left: calc(50% - 200px);
		top: calc(50% - 100px);
	}
	.section-5 .section-5-decor.section-5-decor-sm .decor-map {
		width: 450px;
		top: calc(50% - 180px);
		left: -70px;
	}
	.section-5 .section-5-decor .decor-map {
		position: absolute;
		width: 350px;
		left: calc(50% - 350px);
		top: 50%;
		z-index: 2;
	}
	:global(.section-5 .section-5-decor .decor-line) {
		z-index: 3;
		position: relative;
	}
</style>
