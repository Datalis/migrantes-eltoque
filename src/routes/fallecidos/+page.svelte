<script lang="ts">
	import ChevronLeftIcon from '$lib/assets/images/chevron-left.svg?component';
	import Button from '$lib/components/button.svelte';
	import ReportModal from '$lib/components/report-modal.svelte';
	import SearchInput from '$lib/components/search-input.svelte';
	import { compareObjects, trimString } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	let showModal = false;

	let deceased = data?.deceased || [];
	let totals = data?.totals || [];

	function itemExists(haystack: any[], needle: any) {
		for (let i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
		return false;
	}

	function searchFor(toSearch: string, data: any[]) {
		var results = [];
		toSearch = trimString(toSearch); // trim it
		for (var i = 0; i < data.length; i++) {
			for (var key in data[i]) {
				if (data[i][key].indexOf(toSearch) != -1) {
					if (!itemExists(results, data[i])) results.push(data[i]);
				}
			}
		}
		return results;
	}

	const onSearch = (query: string) => {
		if (query == '') deceased = data.deceased || [];
		else deceased = searchFor(query, data.deceased || []);
	};
</script>

<main class="bg-dark">
	{#if showModal}
		<ReportModal isMissing={false} on:close={() => (showModal = false)} />
	{/if}
	<div class="max-w-6xl mx-4 md:mx-auto py-10">
		<a href="/" class="flex items-center text-gray">
			<ChevronLeftIcon fill="rgb(224 224 224 / var(--tw-text-opacity))" />
			Atrás
		</a>
		<h1 class="text-6xl text-accent font-extrabold text-center md:text-left mt-10">
			+{totals?.deceased}
		</h1>
		<h3 class="text-4xl text-light font-bold text-center md:text-left">Personas fallecidas</h3>
		<div class="bg-accent flex flex-col md:flex-row items-center p-10 rounded-lg mt-10">
			<p class="text-light md:mr-10 mb-10 md:mb-0">
				Si tienes algún familiar, amigo o conocido que haya fallecido tratando de llegar a los
				Estados Unidos, cruzando una frontera terrestre o en el mar, escríbenos. Queremos que no se
				olvide su nombre y su historia.
			</p>
			<Button
				type="solid"
				color="light"
				classes="w-full md:w-auto"
				onClick={() => (showModal = true)}>Reportar fallecido</Button
			>
		</div>
		<div class="mt-20 flex flex-col">
			<span class="text-xs mb-4 text-gray"
				>*Este es un listado incompleto, que incluye solo los nombres de las personas que hemos
				podido identificar. Otros todavía permanecen en el anonimato.</span
			>
			<SearchInput on:search={(e) => onSearch(e.detail)} placeholder="Buscar..." />
		</div>
		<div class="table-wrapper">
			<table id="table" class="table-auto mt-10 w-full text-light">
				<thead>
					<tr>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Nombre</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Edad</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Fecha de muerte</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Causa</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Lugar donde murió</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Lugar de origen</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Detalles</th>
					</tr>
				</thead>
				<tbody>
					{#each deceased as person}
						<tr class="">
							<td class="border-b-2 border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.name}</td
							>
							<td class="border-b-2 border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.age == 'desconocida' ? '-' : person?.age}</td
							>
							<td class="border-b-2 border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.death_date == 'desconocida' ? '-' : person?.death_date}</td
							>
							<td class="border-b-2 border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.death_cause == 'desconocida' ? '-' : person?.death_cause}</td
							>
							<td class="border-b-2 border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.death_location == 'desconocida' ? '-' : person?.death_location}</td
							>
							<td class="border-b-2 border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.place_of_origin == 'desconocida' ? '-' : person?.place_of_origin}</td
							>
							<td class="border-b-2 border-gray border-opacity-20 max-w-prose text-sm py-4"
								>{person?.details || '-'}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</main>

<style>
	.table-wrapper {
		overflow-x: scroll;
	}
</style>
