<script lang="ts">
	import { onMount } from 'svelte';

	export let data: any;

	onMount(() => {
		console.log(data);
	});
</script>

<a href="https://eltoque.com/{data?.slug}" target="_blank" rel="noreferrer" class="flex flex-col">
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src="https://api.eltoque.com{data?.feature_image?.url}"
		class="aspect-3/4 bg-accent h-64 rounded-2xl"
	/>
	<span class="font-bold my-4 text-lg">
		{data?.title}
	</span>
	<small class="text-accent font-bold">Revisar -></small>
</a>
