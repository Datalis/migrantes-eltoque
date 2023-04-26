<script lang="ts">
	import gsap from 'gsap';
	import ScrollToPlugin from 'gsap/ScrollToPlugin';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';
	import TimelineList from './timeline-list.svelte';

	export let events: any[] = [];
	export let years: number[] = [];
	let selected: any;
	let MAX_BALL_PER_MONTH = 16;
	let hasRendered = false;
	export let isDisabled = true;
	export let show_event: (e: any) => void;

	export const changeSelected = (featured: any, updateFilter: boolean = false) => {
		selected = featured;
		if (updateFilter) {
			selectedFilter = featured.eventType;
		}
		const selector = `#ball-${featured.id}`;
		const element = document.querySelector(selector);
		//@ts-ignore
		const offset = document.querySelector('#timelineContainer')?.clientWidth - element?.clientWidth;

		//@ts-ignore
		gsap.to('#timelineContainer', { duration: 1, scrollTo: { x: element, offsetX: offset / 2 } });
	};

	let selectedFilter: string = '';
	let ballsize = 30;
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
		} else {
			results = [results];
		}

		ballsize = 30; //results.length > ballsize ? results.length : ballsize
		return results;
	};

	const activeFilter = (e: any) => {
		switch (e.target.innerText) {
			case 'Detenciones':
				if (selectedFilter == 'detención') {
					selectedFilter = '';
				} else {
					selectedFilter = 'detención';
				}
				break;
			case 'Rescates':
				if (selectedFilter == 'rescate') {
					selectedFilter = '';
				} else {
					selectedFilter = 'rescate';
				}
				break;
			case 'Intercepciones':
				if (selectedFilter == 'intercepción') {
					selectedFilter = '';
				} else {
					selectedFilter = 'intercepción';
				}
				break;
			case 'Transferencias':
				if (selectedFilter == 'transferencia') {
					selectedFilter = '';
				} else {
					selectedFilter = 'transferencia';
				}
				break;
			case 'Expulsión':
				if (selectedFilter == 'expulsión') {
					selectedFilter = '';
				} else {
					selectedFilter = 'expulsión';
				}
				break;
			case 'Repatriación':
				if (selectedFilter == 'repatriación') {
					selectedFilter = '';
				} else {
					selectedFilter = 'repatriación';
				}
				break;
			case 'Muerte':
				if (selectedFilter == 'muerte') {
					selectedFilter = '';
				} else {
					selectedFilter = 'muerte';
				}
				break;
			case 'Desapariciones':
				if (selectedFilter == 'desaparición') {
					selectedFilter = '';
				} else {
					selectedFilter = 'desaparición';
				}
				break;
		}
	};

	export const resetFilter = () => {
		selectedFilter = '';
	};

	onMount(() => {
		gsap.registerPlugin(ScrollToPlugin);
		gsap.registerPlugin(ScrollTrigger);
		MAX_BALL_PER_MONTH = Math.floor(
			(document.querySelector('.timeline-wrapper')?.clientHeight - 20) / ballsize
		);
		hasRendered = true;
	});
</script>

<div class=" h-full flex flex-col">
	<div
		id="filtersContainer"
		class="flex justify-between overflow-x-scroll md:overflow-x-hidden {isDisabled
			? 'disabled'
			: ''}"
	>
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
		</button>
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
		<button
			class="button {selectedFilter === 'expulsión' ? 'active' : ''}"
			on:click={activeFilter}
			disabled={isDisabled}>Expulsión</button
		>
		<button
			class="button {selectedFilter === 'repatriación' ? 'active' : ''}"
			disabled={isDisabled}
			on:click={activeFilter}>Repatriación</button
		>
		<button
			class="button {selectedFilter === 'muerte' ? 'active' : ''}"
			on:click={activeFilter}
			disabled={isDisabled}>Muerte</button
		>
		<button
			class="button {selectedFilter === 'desaparición' ? 'active' : ''}"
			disabled={isDisabled}
			on:click={activeFilter}>Desapariciones</button
		>
	</div>
	<div id="timelineContainer" class="mt-3 relative">
		<div class="timeline-wrapper border border-light rounded-xl py-4 mr-5 ml-2">
			{#each years as year}
				<div class="year-container">
					<div class="line year">
						<span>{year}</span>
					</div>
					{#if hasRendered}
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
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	#filtersContainer {
		height: 52px;
	}

	#filtersContainer.disabled button {
		background-color: gray;
		border-color: transparent;
		@apply cursor-not-allowed;
	}

	#filtersContainer .button,
	#filtersContainer .button:hover:disabled {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		@apply rounded-lg text-light bg-dark m-1 px-2 py-1 border border-accent text-sm transition-all duration-200;
	}

	#filtersContainer .button:hover,
	#filtersContainer .button.active:hover {
		@apply bg-light text-accent;
		box-shadow: none;
	}
	#filtersContainer .button.active {
		@apply bg-accent border-dark border;
		/* box-shadow: 0px 0px 0px 2px rgba(120, 86, 255, 0.75); */
	}

	@media (hover: none) {
		#filtersContainer {
			scrollbar-width: none;
		}

		#filtersContainer::-webkit-scrollbar {
			display: none;
			width: 0 !important;
		}

		#timelineContainer::-webkit-scrollbar {
			display: none;
			width: 0 !important;
		}

		#timelineContainer {
			scrollbar-width: none;
		}
	}

	#timelineContainer {
		overflow-x: auto;
		overflow-y: hidden;
	}

	#timelineContainer .timeline-wrapper {
		width: max-content;
		min-width: 100%;
		display: flex;
		justify-content: space-evenly;
		padding-right: 2rem;
		height: 100%;
	}

	#timelineContainer .year-container {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
	}

	#timelineContainer .year-container .line {
		min-width: 2.5rem;
		writing-mode: vertical-lr;
		transform: rotate(180deg);
		@apply text-gray text-opacity-50 text-sm border-l-2 border-light border-opacity-50 text-end h-full;
	}

	#timelineContainer .year-container .line.year {
		@apply text-accent border-l-4 border-opacity-100 text-opacity-100;
	}

	/* #yearsContainer {
		overflow-x: auto;
		overflow-y: hidden;
	} */
	/* .year-container {
		@apply shrink-0;
	}
	 */

	/* .line {
		@apply w-9 flex justify-end;
	}

	.line span {
		writing-mode: vertical-lr;
		transform: rotate(180deg);
		@apply text-gray opacity-50 text-sm border-l-2 border-light text-end h-full;
	}
	.year span {
		@apply text-accent border-l-4 opacity-100 w-9;
	} */
	/* #timelineContainer div:last-child > span {
		@apply border-0;
	} */
	/* .division {
		width: calc(100% - 32px);
		@apply absolute border-b-2 border-light top-1/2 right-0;
	} */
</style>
