<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import ChevronLeftIcon from '$lib/assets/images/chevron-left.svg?component';
	import SearchInput from '$lib/components/search-input.svelte';
	import { trimString } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	const all = data?.people || [];
	let totals = data?.totals || { deceased: 0, missing: 0 };

	// Búsqueda inicial: el widget externo llega con `/personas?q=Nombre`.
	let query = $page.url.searchParams.get('q') || '';

	// Normaliza para comparar sin distinguir mayúsculas ni acentos: quien usa el
	// widget suele escribir el nombre sin tildes.
	const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function matches(person: any, q: string) {
		const needle = norm(trimString(q));
		if (needle === '') return true;
		return Object.values(person).some(
			(v) => typeof v === 'string' && norm(v).indexOf(needle) !== -1
		);
	}

	$: results = query.trim() === '' ? all : all.filter((p) => matches(p, query));

	const onSearch = (q: string) => {
		query = q;
		// Mantener la URL sincronizada (compartible) sin recargar la página.
		if (browser) {
			const url = new URL(window.location.href);
			if (q.trim() === '') url.searchParams.delete('q');
			else url.searchParams.set('q', q);
			window.history.replaceState(window.history.state, '', url);
		}
	};

	// Campos a mostrar por tipo, en el orden solicitado. El nombre es el título.
	const fields = {
		deceased: [
			{ label: 'Edad', key: 'age' },
			{ label: 'Fecha de muerte', key: 'death_date' },
			{ label: 'Causa', key: 'death_cause' },
			{ label: 'Lugar donde murió', key: 'death_location' },
			{ label: 'País', key: 'death_country' }
		],
		missing: [
			{ label: 'Edad al momento de la desaparición', key: 'age' },
			{ label: 'Fecha de nacimiento', key: 'birthdate' },
			{ label: 'Lugar de origen', key: 'birthplace' },
			{ label: 'Visto por última vez', key: 'missing_date' },
			{ label: 'Lugar donde fue visto por última vez', key: 'missing_place' },
			{ label: 'País', key: 'missing_country' }
		]
	};
</script>

<svelte:head>
	<title>Buscar personas — Migrantes | elTOQUE</title>
</svelte:head>

<main class="bg-dark min-h-screen">
	<div class="max-w-6xl mx-4 md:mx-auto py-10">
		<a href="/" class="flex items-center text-gray">
			<ChevronLeftIcon fill="rgb(224 224 224 / var(--tw-text-opacity))" />
			Atrás
		</a>
		<h1 class="text-6xl text-accent font-extrabold text-center md:text-left mt-10">
			+{(totals?.deceased || 0) + (totals?.missing || 0)}
		</h1>
		<h3 class="text-4xl text-light font-bold text-center md:text-left">
			Personas fallecidas y desaparecidas
		</h3>

		<div class="mt-10 flex flex-col">
			<span class="text-xs mb-4 text-gray"
				>*Este es un listado incompleto, que incluye solo los nombres de las personas que hemos
				podido identificar. Otros todavía permanecen en el anonimato.</span
			>
			<SearchInput
				value={query}
				on:search={(e) => onSearch(e.detail)}
				placeholder="Buscar por nombre..."
			/>
		</div>

		<p class="text-gray text-sm mt-4">
			{results.length}
			{results.length === 1 ? 'resultado' : 'resultados'}
			{query.trim() !== '' ? ` para “${query.trim()}”` : ''}
		</p>

		{#if results.length === 0}
			<p class="text-light text-center py-20">
				No se encontraron personas que coincidan con la búsqueda.
			</p>
		{:else}
			<ul class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
				{#each results as person (person.type + '-' + person.name)}
					<li class="card border border-accent rounded-lg p-6 flex flex-col">
						<span
							class="badge self-start text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3"
							class:deceased={person.type === 'deceased'}
							class:missing={person.type === 'missing'}
						>
							{person.type === 'deceased' ? 'Fallecido' : 'Desaparecido'}
						</span>
						<h2 class="text-xl text-light font-bold mb-3">{person.name || '-'}</h2>
						<dl class="text-sm text-gray space-y-1">
							{#each fields[person.type] as field}
								<div class="flex flex-col sm:flex-row sm:gap-2">
									<dt class="font-semibold text-light shrink-0">{field.label}:</dt>
									<dd>{person[field.key] || '-'}</dd>
								</div>
							{/each}
						</dl>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</main>

<style lang="postcss">
	.card {
		background-color: #2a2930;
	}

	.badge.deceased {
		@apply bg-accent text-light;
	}

	.badge.missing {
		background-color: #3a298c;
		@apply text-light;
	}
</style>
