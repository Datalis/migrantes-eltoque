<script lang="ts">
	import Button from './button.svelte';

	export let data: any;
	export let onClick: () => void;
</script>

<div class="profile flex flex-col items-center md:items-start h-full">
	<img src={data[2] ? 'https://api.eltoque.com' + data[2] : 'https://fakeimg.pl/250x250/7856ff/'} class="aspect-square rounded-2xl w-3/4 md:w-full" alt="" loading="lazy" />
	<span class="font-bold mt-4">{data[3]}</span>
	<small>{data[11]} / {data[5]} años</small>
	<p class="text-sm my-4 leading-tight">
		{data[10]}
	</p>
	<Button classes="mt-4 self-start w-full md:w-auto" onClick={onClick}>Ofrecer información</Button>
</div>

<style>
	.profile img {
		object-fit: cover;
		object-position: center;
	}
	.profile p {
		height: 140px;
		
		/* min-height: 140px;
		display: -webkit-box;
		-webkit-line-clamp: 8;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis; */
	}
</style>
