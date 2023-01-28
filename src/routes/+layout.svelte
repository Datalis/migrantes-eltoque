<script>
	// @ts-ignore
	import NProgress from 'nprogress';
    

	import Footer from '$lib/components/footer.svelte';
	import { navigating } from '$app/stores';
	import '../app.css';
    import 'nprogress/nprogress.css'

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
<Footer />

<style>
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
