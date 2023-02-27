<script lang="ts">
	import { onMount } from 'svelte';

	export let data: any[] = [];
	export let filter: string = '';
	export let ballsize = 32;
	export let selected: number;

	const show_info = (date: any) => {
		console.log(date)
	}

	$: top = data.length % 2 == 0 ? (data.length * ballsize) / 2 : ((data.length - 1) * ballsize) / 2;
	onMount(() => {
    });
</script>

<div
	class="container"
	style="top: calc(50% - {top}px); --tw-translate-x: {ballsize / 2}px"	
>
	{#each data as date}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<div
			on:mouseover={show_info(date)}
			class="ball {date.eventType == filter || date.id == selected ? 'selected' : ''}"
			style="{date.eventType == filter
				? `--ballsize:${(ballsize / 2 - 2).toFixed(0)}`
				: `--ballsize:${ballsize}`}px"
		/>
	{/each}
</div>

<style>
	.container {
		@apply flex flex-col items-center w-fit absolute translate-x-4 z-10;
	}
	.ball {
		@apply bg-dark border-2 border-accent rounded-full;
		width: var(--ballsize);
		height: var(--ballsize);
	}
	.ball:hover {
		@apply bg-light border-light transition-all duration-150;
	}
	.ball.selected {
		@apply bg-light border-0 border-dark m-2;
		box-shadow: 0px 0px 0px 6px rgb(31, 32, 67), 0px 0px 0px 8px rgb(120,86,255);
    }
</style>