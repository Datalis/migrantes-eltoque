<script lang="ts">
		
	import type { PageData } from './$types';

	import Section_2 from '$lib/components/section-2.svelte';
	import Section_1 from '$lib/components/section-1.svelte';
	import Section_5 from '$lib/components/section-5.svelte';
	import Section_3 from '$lib/components/section-3.svelte';
	import Section_4 from '$lib/components/section-4.svelte';
	import Section_6 from '$lib/components/section-6.svelte';

	export let data: PageData;

	$: deceased = data?.deceased?.values || [];
	$: missing = data?.missing?.values || [];
	$: places = data?.places?.values?.slice(1) || [];
	$: articles = data?.articles || [];

</script>

<main class="overflow-hidden">
	<Section_1></Section_1>
	<Section_2></Section_2>
	<Section_3></Section_3>
	<Section_4 data={deceased}></Section_4>
	<Section_5 data={missing} {articles}></Section_5>
	<Section_6 {places}></Section_6>
</main>

<style>
	
	
</style>
