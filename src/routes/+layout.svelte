<script>
	// @ts-ignore
	import NProgress from 'nprogress';
	import Footer from '$lib/components/footer.svelte';
	import { navigating } from '$app/stores';
	import '../app.css';
	import 'swiper/css';
	import 'swiper/css/pagination';
	// import 'swiper/css/navigation';
	import 'nprogress/nprogress.css';
	import ShareBtn from '$lib/components/share-btn.svelte';

	export let data;

	const { published_at, updated_at } = data;
	

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}
</script>

<svelte:head />
<slot />
<Footer {published_at} {updated_at} />
<ShareBtn></ShareBtn>

<style>
	:root {
		--swiper-theme-color: #7856ff;
	}

	:global(#nprogress .bar) {
		background-color: #7856ff;
	}
	:global(#nprogress .peg) {
		box-shadow: 0 0 10px #7856ff, 0 0 5px #7856ff;
	}
	:global(#nprogress .spinner-icon) {
		border-top-color: #7856ff;
		border-left-color: #7856ff;
	}
</style>
