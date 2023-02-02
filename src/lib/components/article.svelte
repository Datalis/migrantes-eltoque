<script lang="ts">
	export let data: any;
</script>

<a href="https://eltoque.com/{data?.slug}" target="_blank" rel="noreferrer" class="flex flex-col">
	<img
		src="https://api.eltoque.com{data?.feature_image?.url}"
		class="aspect-3/4 bg-accent rounded-2xl"
		alt={data?.feature_image?.alternativeText}
	/>
	<span class="font-bold my-4 text-lg">
		{data?.title}
	</span>
	<small class="text-accent font-bold">Revisar -></small>
</a>
