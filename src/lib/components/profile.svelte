<script lang="ts">
	import { imageLoader } from '$lib/utils';
	import Button from './button.svelte';

	export let data: any;
	export let onClick: () => void;

	const formatAge = (ageText: string | string[]) => {
		if (!ageText || ageText == '') return 'Edad desconocida';
		else if (ageText.includes('meses')) return ageText;
		else return `${ageText} años`;
	}

	const getImageUrl = (url: string) => imageLoader(url);
</script>

<div class="profile flex flex-col items-center md:items-start h-full">
	<img
		src={data[2] ? getImageUrl(data[2]) : 'https://fakeimg.pl/250x250/7856ff/'}
		class="aspect-square rounded-2xl w-3/4 md:w-full"
		alt=""
		loading="lazy"
	/>
	<span class="font-semibold mt-4">{data[3]}</span>
	<small>{data[12] || 'Origen Desconocido'} / {formatAge(data[5])}</small>
	<div class="text-wrapper">
		<p class="text-sm my-4 leading-tight">
			{data[10]}
			<br />
			<br />
		</p>
	</div>
	<Button classes="mt-4 self-start w-full md:w-auto" {onClick}>Ofrecer información</Button>
</div>

<style>
	.profile img {
		object-fit: cover;
		object-position: center;
	}
	.profile p {
		height: 180px;
		overflow-y: auto;
		margin-bottom: 0;
	}
	.profile .text-wrapper {
		position: relative;
	}
	.profile .text-wrapper::before {
		content: ' ';
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba(255,255,255,0) 120px, #f5f6f9);
		pointer-events: none;
	}
</style>
