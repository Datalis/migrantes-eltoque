<script lang="ts">
	import type { PageData } from './$types';

	import Section_2 from '$lib/components/section-2.svelte';
	import Section_1 from '$lib/components/section-1.svelte';
	import Section_5 from '$lib/components/section-5.svelte';
	import Section_3 from '$lib/components/section-3.svelte';
	import Section_4 from '$lib/components/section-4.svelte';
	import Section_6 from '$lib/components/section-6.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import Section_7 from '$lib/components/section-7.svelte';
	import Section_timeline from '$lib/components/section-timeline.svelte';

	export let data: PageData;

	let windowWidth = 0;

	const { totals, deceased, missing, articles, places, events } = data;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		windowWidth > 768 &&
			gsap.to('#section-1', {
				yPercent: 25,
				scrollTrigger: {
					trigger: '#section-2',
					scrub: true,
					invalidateOnRefresh: true
				}
			});
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

<main class="overflow-hidden">
	<Section_1 {totals} />
	<Section_2 />
	<Section_3 {totals} {deceased} />
	<Section_4 {deceased} />
	<Section_5 {missing} {totals} />
	<Section_6 {places} />
	<Section_timeline {events} />
	<Section_7 {articles} />
</main>

<style>
</style>
