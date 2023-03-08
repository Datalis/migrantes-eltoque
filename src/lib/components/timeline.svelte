<script lang="ts">
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import ScrollToPlugin from 'gsap/ScrollToPlugin';
	import { onMount } from 'svelte';
	import TimelineList from './timeline-list.svelte';

	export let events: any[] = [];
	export let years: number[] = [];
	let selected: any;
	const MAX_BALL_PER_MONTH = 16;
	export let isDisabled = true;
	export let show_event: (e: any) => void;

	export const changeSelected = (featured: any) => {
		selected = featured;
		const selector = `#ball-${featured.id}`;
		const element = document.querySelector(selector);
		//@ts-ignore
		const offset = document.querySelector('#timelineContainer')?.clientWidth - element?.clientWidth;

		//@ts-ignore
		gsap.to('#yearsContainer', { duration: 1, scrollTo: { x: element, offsetX: offset / 2 } });
	};

	let selectedFilter: string = '';
	let ballsize = 0;
	const months = [
		'Diciembre',
		'Noviembre',
		'Octubre',
		'Septiembre',
		'Agosto',
		'Julio',
		'Junio',
		'Mayo',
		'Abril',
		'Marzo',
		'Febrero',
		'Enero'
	];

	const getDataByMonth = (data: any[], month: number, year: number): any[] => {
		/**
		 * Returns chunks of size n.
		 * @param {Array<any>} array any array
		 * @param {number} n size of chunk
		 */
		function chunks(array: any[], n: number) {
			let chunk_array = [];
			for (let i = 0; i < array.length; i += n) chunk_array.push(array.slice(i, i + n));
			return chunk_array;
		}

		let results = data.filter((value) => {
			return value.date?.getMonth() === 11 - month && value.date?.getFullYear() === year;
		});

		if (results.length > MAX_BALL_PER_MONTH) {
			results = chunks(results, MAX_BALL_PER_MONTH);
			// console.log(results)
		} else {
			results = [results];
		}

		ballsize = 30; //results.length > ballsize ? results.length : ballsize
		return results;
	};

	const activeFilter = (e: any) => {
		switch (e.target.innerText) {
			case 'Detenciones':
				selectedFilter = 'detención';
				break;
			case 'Rescates':
				selectedFilter = 'rescate';
				break;
			case 'Intercepciones':
				selectedFilter = 'intercepción';
				break;
			case 'Transferencias':
				selectedFilter = 'transferencia';
				break;
			case 'Expulsión':
				selectedFilter = 'expulsión';
				break;
			case 'Repatriación':
				selectedFilter = 'repatriación';
				break;
			case 'Muerte':
				selectedFilter = 'muerte';
				break;
			case 'Desapariciones':
				selectedFilter = 'desaparición';
				break;
		}
	};

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(ScrollToPlugin);
	});
</script>

<div class="md:h-full">
	<div class="flex justify-between overflow-x-scroll md:overflow-x-hidden {isDisabled ? 'disabled' : ''}">
		<button
			class="button {selectedFilter === 'detención' ? 'active' : ''}"
			on:click={activeFilter}
			disabled={isDisabled}
		>
			Detenciones
		</button>
		<button
			class="button {selectedFilter === 'rescate' ? 'active' : ''}"
			on:click={activeFilter}
			disabled={isDisabled}
		>
			Rescates
		</button
		>
		<button
			class="button {selectedFilter === 'intercepción' ? 'active' : ''}"
			disabled={isDisabled}
			on:click={activeFilter}>Intercepciones</button
		>
		<button
			class="button {selectedFilter === 'transferencia' ? 'active' : ''}"
			disabled={isDisabled}
			on:click={activeFilter}>Transferencias</button
		>
		<button class="button {selectedFilter === 'expulsión' ? 'active' : ''}" on:click={activeFilter}
			disabled={isDisabled}
			>Expulsión</button
		>
		<button
			class="button {selectedFilter === 'repatriación' ? 'active' : ''}"
			disabled={isDisabled}
			on:click={activeFilter}>Repatriación</button
		>
		<button class="button {selectedFilter === 'muerte' ? 'active' : ''}" on:click={activeFilter}
			disabled={isDisabled}
			>Muerte</button
		>
		<button
			class="button {selectedFilter === 'desaparición' ? 'active' : ''}"
			disabled={isDisabled}
			on:click={activeFilter}>Desapariciones</button
		>
	</div>
	<div
		id="timelineContainer"
		class="border border-light rounded-xl mt-3 pt-5 relative"
		style="height: calc(100% - 30px - 0.75rem);"
	>
		<div id="yearsContainer" class="flex relative h-full">
			<!-- <div class="division" /> -->
			{#each years as year}
				<div class="flex year-container">
					<div class="line year">
						<span>{year}</span>
					</div>
					{#each months as month, i}
						{#if getDataByMonth(events, i, year)[0].length != 0}
							<TimelineList
								data={getDataByMonth(events, i, year)}
								{selectedFilter}
								{ballsize}
								{selected}
								{month}
								{isDisabled}
								{show_event}
							/>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.disabled, .disabled button {
		@apply cursor-not-allowed;
	}
	#yearsContainer {
		overflow-x: auto;
		overflow-y: hidden;
	}
	.year-container {
		@apply shrink-0;
	}
	.button, .button:hover:disabled {
		@apply rounded-xl text-light bg-dark px-2 py-1 border border-accent text-sm transition-all duration-200;
	}

	.button:hover,
	.button.active:hover {
		@apply bg-light text-accent;
		box-shadow: none;
	}

	.button.active {
		@apply bg-accent border-dark border-2;
		box-shadow: 0px 0px 0px 2px rgba(120, 86, 255, 0.75);
	}

	.line {
		@apply w-9 flex justify-end;
	}

	.line span {
		writing-mode: vertical-lr;
		transform: rotate(180deg);
		@apply text-gray opacity-50 text-sm border-l-2 border-light text-end h-full;
	}
	.year span {
		@apply text-accent border-l-4 opacity-100 w-9;
	}
	/* #timelineContainer div:last-child > span {
		@apply border-0;
	} */
	.division {
		width: calc(100% - 32px);
		@apply absolute border-b-2 border-light top-1/2 right-0;
	}
</style>
