<script>
	import Button from './button.svelte';
	import ReportModal from './report-modal.svelte';
	// @ts-ignore
	import AngelImg from '$lib/assets/images/angel.webp?w=500';
	import DecorDeceased from '$lib/assets/images/fallecidos.svg?component';
	import Toast from './toast.svelte';
	import { imageLoader } from '$lib/utils';

	let showModal = false;
	let showToast = false;
	let errorSubmit = false;
	let errorMessage = "";

	/**
	 * @type {any[]}
	 */
	export let deceased = [];

	$: data = deceased?.filter(e => e[1] == 'Sí').reverse();

	const formatAge = (/** @type {string} */ ageText) => {
		if (ageText == 'desconocida') return 'Edad desconocida';
		else if (ageText.includes('meses')) return ageText;
		else return `${ageText} años`;
	}

	const getImageUrl = (/** @type {string} */ url) => imageLoader(url);

</script>

<Toast show={showToast} isError={errorSubmit} message={errorMessage} />

<section class="section-4 bg-dark min-h-screen">
	{#if showModal}
		<ReportModal
			on:close={() => (showModal = false)}
			isMissing={false}
			on:submit={(e) => {
				console.log(e.detail)
				showToast = true;
				errorSubmit = e.detail.isError;
				errorMessage = e.detail.message;
				setInterval(() => {showToast = false}, 8000)
			}}
		/>
	{/if}
	<div class="flex flex-col h-full xl:container mx-auto">
		<div class="flex-1 grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
			<div 
				style="background-image: url({AngelImg});"
				class="memorial-block relative col-span-2 row-span-2 bg-accent flex flex-col justify-end p-10"
			>
				<h2 class="text-light text-center md:text-left font-semibold text-4xl md:mb-10 z-10">
					En memoria de quienes no pudieron completar su camino
				</h2>
			</div>
			{#each data as person}
				<div class="grid-item flex flex-col items-center justify-between p-4">
					<div class="overlay p-4 flex items-center">
						<p class="font-medium text-xs">
							{person[11] || ''}
						</p>
					</div>
					<img class="pic" src={getImageUrl(person[2])} alt="Picture of {[person[3]]}" loading="lazy">
					<DecorDeceased class="relative w-3/4 my-2" />
					<h4 class="name text-center leading-tight font-semibold text-accent md:w-3/4 my-2">{person[3]}</h4>
					<span class=" text-light text-center font-light text-xs md:text-sm"
						>{formatAge(person[4])}</span
					>
					<!-- <DecorDeceased class="relative w-3/4" /> -->
				</div>
			{/each}
		</div>
		<div
			class="flex flex-col md:flex-row items-center justify-center mt-10 md:mt-16 mb-10 md:mb-20 px-10 md:px-0"
		>
			<a href="/fallecidos" class="w-full md:w-auto">
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
		/* min-height: 300px; */
	}

	.grid-item .pic {
		margin: auto;
		width: 100px;
		height: 100px;
		object-fit: cover;
		object-position: center;
		border-radius: 50%;
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
		background-position: top right;
		background-size: contain;
		background-repeat: no-repeat;
	}
</style>
