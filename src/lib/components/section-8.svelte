<script lang="ts">
	import Article from './article.svelte';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { Pagination, Navigation } from 'swiper';
	import ArrowRightIcon from '$lib/assets/images/arrow-right.svg?component';
	import ArrowLeftIcon from '$lib/assets/images/arrow-left.svg?component';

	export let articles: any[] = [];

	let articles$: any[] = [
		{
			slug: 'muertes-migrantes-cubanos-historias-poco-contadas',
			title: 'Muertes de migrantes cubanos: historias poco contadas',
			feature_image: {
				url: '/uploads/2020_09_12_Rea_HABANA_MAR_FLORES_10aa500596.jpg',
				alternativeText: ''
			}
		},
		{
			slug: 'rio-bravo-el-ultimo-peligro-de-los-migrantes-cubanos-en-mexico',
			title: 'Río Bravo: el último peligro de los migrantes cubanos en México',
			feature_image: {
				url: '/uploads/Rio_Bravo_migrantes_41e1685340.jpg',
				alternativeText: ''
			}
		},
		...articles.filter(
			(a) =>
				a.slug !== 'muertes-migrantes-cubanos-historias-poco-contadas' &&
				a.slug !== 'rio-bravo-el-ultimo-peligro-de-los-migrantes-cubanos-en-mexico'
		)
	];
</script>

<section class="section-7 py-10 md:py-20">
	<div class="container mx-auto max-w-4xl px-10 lg:px-0">
		<h2 class="font-sans font-semibold text-4xl text-dark mb-14 text-center">
			También hemos publicado
		</h2>
		<div class="swiper-wrapper relative">
			<div class="swiper-control-left absolute -left-28 h-full lg:flex hidden items-center cursor-pointer">
				<ArrowLeftIcon width="48" height="48" />
			</div>
			<div class="swiper-control-right absolute -right-28 h-full lg:flex hidden items-center cursor-pointer">
				<ArrowRightIcon width="48" height="48" />
			</div>
			<Swiper
				modules={[Pagination, Navigation]}
				preloadImages={false}
				lazy={true}
				slidesPerView={1}
				spaceBetween={50}
				centeredSlides={true}
				navigation={{
					nextEl: '.section-7 .swiper-control-right',
					prevEl: '.section-7 .swiper-control-left'
				}}
				pagination={{
					clickable: true
				}}
				breakpoints={{
					768: {
						slidesPerView: 2,
						spaceBetween: 60,
						centeredSlides: false
					}
				}}
			>
				{#each articles$ as article}
					<SwiperSlide>
						<Article data={article} />
					</SwiperSlide>
				{/each}
			</Swiper>
		</div>
	</div>
</section>

<style>
	:global(.section-7 .swiper-wrapper .swiper-control-left.swiper-button-disabled svg) {
		stroke-opacity: 0.5;
	} 
	:global(.section-7 .swiper-wrapper .swiper-control-right.swiper-button-disabled svg) {
		stroke-opacity: 0.5;
	} 
	:global(.section-7 .swiper-wrapper .swiper) {
		height: 400px;
	} 
</style>
