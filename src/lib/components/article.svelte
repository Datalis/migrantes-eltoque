<script lang="ts">
	import { imageLoader, proxiedImage } from "$lib/utils";

	export let data: any;

	const getImageUrl = (url: string) => imageLoader(url);

	// Cloudflare bloquea algunas de estas imágenes cuando las pide el navegador.
	// Un único reintento a través del proxy del servidor, que sí manda la cabecera.
	const onImageError = (e: Event) => {
		const img = e.currentTarget as HTMLImageElement;
		const viaProxy = proxiedImage(img.src);
		if (viaProxy) img.src = viaProxy;
	};

</script>

<a href="https://eltoque.com/{data?.slug}" target="_blank" rel="noreferrer" class="article flex flex-col">
	<img
		src={getImageUrl(data?.feature_image?.url)}
		loading="lazy"
		class="aspect-3/4 max-h-64 bg-accent rounded-2xl"
		alt={data?.feature_image?.alternativeText}
		on:error={onImageError}
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