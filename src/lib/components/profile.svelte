<script lang="ts">
	import PersonImg from '$lib/assets/images/person.png';
	import Button from './button.svelte';

	export let data: any;
</script>

<div class="profile flex flex-col items-center md:items-start">
	<img src={data[2] ? 'https://api.eltoque.com' + data[2] : 'https://fakeimg.pl/250x250/7856ff/'} class="aspect-square rounded-2xl w-3/4 md:w-full" alt="" />
	<span class="font-bold mt-4">{data[3]}</span>
	<small>La Habana / 42 años</small>
	<p class="text-sm my-4 leading-6">
		{data[7]}
	</p>
	<Button classes="mt-4 self-start w-full md:w-auto">Ofrecer información</Button>
</div>

<style>
	.profile img {
		object-fit: cover;
		object-position: center;
	}
	.profile p {
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
