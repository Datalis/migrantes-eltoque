<script lang="ts">
	import { imageLoader } from "$lib/utils";

	export let data: any;

	const getImageUrl = (url: string) => imageLoader(url);

</script>

<a href="https://eltoque.com/{data?.slug}" target="_blank" rel="noreferrer" class="article flex flex-col">
	<img
		src={getImageUrl(data?.feature_image?.url)}
		loading="lazy"
		class="aspect-3/4 max-h-64 bg-accent rounded-2xl"
		alt={data?.feature_image?.alternativeText}
	/>
	<span class="font-semibold my-4 text-lg leading-tight">
		{data?.title}
	</span>
	<small class="text-accent font-semibold">Leer más -></small>
</a>

<style>
	.article {
		min-height: 300px;
	}
</style>