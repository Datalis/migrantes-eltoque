<script>
	import Button from './button.svelte';
	import ReportModal from './report-modal.svelte';
	import DecorDeceased from '$lib/assets/images/ornamental-fallecidos.svg?component';

	let showModal = false;

	/**
	 * @type {any[]}
	 */
	export let deceased = [];
</script>

<section class="section-4 bg-dark min-h-screen">
	{#if showModal}
		<ReportModal on:close={() => (showModal = false)} isMissing={false} />
	{/if}
	<div class="flex flex-col h-full xl:container mx-auto">
		<div class="flex-1 grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
			<div
				class="memorial-block relative col-span-2 row-span-2 bg-accent flex flex-col justify-end p-10"
			>
				<h2 class="text-light text-center md:text-left font-bold text-4xl md:mb-10 z-10">
					En memoria de quienes no pudieron completar su camino
				</h2>
			</div>
			{#each deceased as person}
				<div class="grid-item flex flex-col items-center justify-center p-4 ">
					<div class="overlay p-4 flex items-center">
						<p class="font-medium text-xs">
							{person[11]}
						</p>
					</div>
					<h3 class="name text-center md:text-xl font-bold text-accent md:w-3/4">{person[3]}</h3>
					<span class=" text-light text-center font-light text-xs md:text-sm my-4 md:my-5"
						>{person[4] !== 'desconocida' ? `${person[4]} años` : 'Edad desconocida'}</span
					>
					<DecorDeceased class="relative w-3/4" />
				</div>
			{/each}
		</div>
		<div
			class="flex flex-col md:flex-row items-center justify-center mt-10 md:mt-16 mb-10 md:mb-20 px-10 md:px-0"
		>
			<a href="/fallecidos">
				<Button type="bordered" classes="md:mr-8 mb-8 md:mb-0 w-full md:w-auto">Ver listado</Button>
			</a>

			<Button classes="text-light w-full md:w-auto" onClick={() => (showModal = true)}>
				Reportar fallecido
			</Button>
		</div>
	</div>
</section>

<style>
	.grid-item {
		background-color: #fffffd0d;
		cursor: pointer;
		position: relative;
		min-height: 300px;
	}
	@media (max-width: 768px) {
		.grid-item {
			min-height: unset;
		}
	}
	.grid-item:hover .overlay {
		opacity: 1;
	}
	.grid-item .overlay {
		background-color: #e0e0e0;
		transition: all 0.3s ease;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		opacity: 0;
		z-index: 1;
	}
	/* .grid-item .name {
		min-height: 64px;
	} */
	.memorial-block {
		background-image: url(/src/lib/assets/images/angel.svg);
		background-position: top right;
		background-size: contain;
		background-repeat: no-repeat;
	}
</style>
