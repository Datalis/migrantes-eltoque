<script lang="ts">
	import Article from './article.svelte';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { Pagination } from 'swiper';

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
	<div class="container mx-auto max-w-4xl px-10 md:px-0">
		<h2 class="font-sans font-bold text-4xl text-dark mb-14 text-center">También hemos publicado</h2>
		<Swiper
			modules={[Pagination]}
			preloadImages={false}
			lazy={true}
			slidesPerView={1}
			spaceBetween={50}
			centeredSlides={true}
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
</section>

<style>
	:global(.section-7 .swiper-pagination) {
		position: relative;
		padding-top: 2rem;
	}
</style>
