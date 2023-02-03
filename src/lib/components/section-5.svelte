<script lang="ts">
	import LinePath from '$lib/assets/images/section-5/line-full.svg?component';
	import LinePathSmall from '$lib/assets/images/section-5/line-small.svg?component';
	import SeaBackground from '$lib/assets/images/section-5/mar.webp';
	import Ocean from '$lib/assets/images/section-5/ocean.webp';
	import Map from '$lib/assets/images/section-5/map.webp';

	import Button from './button.svelte';
	import ArrowRightIcon from '$lib/assets/images/arrow-right.svg?component';
	import ArrowLeftIcon from '$lib/assets/images/arrow-left.svg?component';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import Profile from './profile.svelte';
	import Article from './article.svelte';

	import 'swiper/css';
	import InfoModal from './info-modal.svelte';
	import ReportModal from './report-modal.svelte';

	export let data: any[];
	let showMissing = false;
	export let totals: any;
	export let missing: any[] = [];
	export let articles: any[] = [];

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

{#if showModal}
	<InfoModal on:close={() => (showModal = false)} info={selectedPerson} />
{/if}

{#if showMissing}
	<ReportModal on:close={() => showMissing = false} />
{/if}

<section class="section-5 flex flex-col items-center justify-center bg-light min-h-screen pt-20">
	<div class="container mx-auto max-w-3xl md:px-0">
		<div class="mx-10 md:mx-0">
			<h2 class="font-sans font-extrabold text-7xl text-accent">+{totals?.missing}</h2>
			<h2 class="font-sans font-bold text-4xl text-dark my-4">Personas desaparecidas</h2>
			<p class="text-dark md:mx-20 mt-20">
				Un migrante se considera desaparecido cuando no se tiene noticias de su llegada, pero
				tampoco existe un cuerpo que pueda confirmar la muerte. En el mejor de los casos, solo están
				retenidos por las autoridades e, incluso, pueden estar bajo custodia durante meses sin que
				se sepa nada de ellos. El protocolo para la búsqueda e identificación es complicado y la
				desesperación de la familia aumenta. Por ello, se recomienda a los familiares ponerse en
				contacto con las autoridades del país o de la zona donde se supone desapareció la persona.
				<br />
				<br />
				El proceso de búsqueda de información puede ser muy difícil, por eso se ofrece este espacio para
				publicar los datos y tratar de ayudar a despejar la incertidumbre.
			</p>
		</div>
		<div class="flex mt-20 mx-10 md:mx-0">
			<a href="/desaparecidos" class="w-full md:w-auto"
				><Button classes="w-full">Ver listado</Button></a
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
		<div class="w-full mt-20 px-10 md:px-0">
			<Swiper
				on:swiper={onSwiper}
				lazy
				slidesPerView={1}
				spaceBetween={50}
				centeredSlides={true}
				breakpoints={{
					'768': {
						slidesPerView: 2.6,
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
			<img src={SeaBackground} class="decor-bg" alt="" />
			<LinePathSmall class="decor-line" />
			<img src={Ocean} class="decor-ocean" alt="" />
			<img src={Map} class="decor-map" alt="" />
		</div>
		<div class="bg-dark flex flex-col md:flex-row items-center p-10 md:mt-20 md:rounded-lg">
			<p class="text-light text-lg md:text-sm mb-8 md:mb-0">
				Si tienes algún familiar, amigo o conocido que haya desaparecido tratando de migrar o
				conociste alguien que viajaba contigo y se ha denunciado que no llegó, escríbenos. Queremos
				que no se olvide su historia y poder ayudar, de acuerdo con nuestras posibilidades.
			</p>
			<Button classes="w-full md:w-auto" onClick={() => showMissing = true}>Reportar desaparecido</Button>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-10 my-10 md:my-20 mx-10 md:mx-0">
			{#each articles as article}
				<Article data={article} />
			{/each}
		</div>
	</div>
	<div class="hidden md:block section-5-decor">
		<img src={SeaBackground} class="decor-bg" alt="" />
		<LinePath class="decor-line w-full" />
		<img src={Ocean} class="decor-ocean" alt="" />
		<img src={Map} class="decor-map" alt="" />
	</div>
</section>

<style>
	:global(.swiper) {
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
