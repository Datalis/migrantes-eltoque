<script lang="ts">
	import Article from './article.svelte';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { Pagination } from 'swiper';

	export let articles: any[] = [];
</script>

<section class="section-7 py-10 md:py-20">
	<div class="container mx-auto max-w-3xl px-10 md:px-0">
		<Swiper
			modules={[Pagination]}
			lazy
			slidesPerView={1}
			spaceBetween={50}
			centeredSlides={true}
			pagination={{
                clickable: true
            }}
			breakpoints={{
				768: {
					slidesPerView: 2,
					spaceBetween: 30,
					centeredSlides: false
				}
			}}
		>
			{#each articles as article}
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
		padding-top: 1rem;
	}

</style>