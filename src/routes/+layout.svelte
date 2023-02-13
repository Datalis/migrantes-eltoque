<script>
	// @ts-ignore
	import { onMount } from 'svelte';
	import NProgress from 'nprogress';
	import Footer from '$lib/components/footer.svelte';
	import { navigating } from '$app/stores';
	import '../app.css';
	import 'swiper/css';
	import 'swiper/css/pagination';
	import 'nprogress/nprogress.css';
	import { initializeApp } from 'firebase/app';
	import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
	import {
	    CAPTCHA_KEY,
	} from '$env/static/private';
	import { firebaseConfig } from '../../firebase-config';


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

	onMount(() => {
		const app = initializeApp(firebaseConfig);

		const appCheck = initializeAppCheck(app, {
  			provider: new ReCaptchaV3Provider(CAPTCHA_KEY),

			// Optional argument. If true, the SDK automatically refreshes App Check
			// tokens as needed.
			isTokenAutoRefreshEnabled: true
		});
	})
</script>

<svelte:head />
<slot />
<Footer />

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
