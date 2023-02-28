<script lang="ts">
	import ChevronLeftIcon from '$lib/assets/images/chevron-left.svg?component';
	import Button from '$lib/components/button.svelte';
	import ReportModal from '$lib/components/report-modal.svelte';
	import SearchInput from '$lib/components/search-input.svelte';
	import { compareObjects, parseDate, trimString } from '$lib/utils';
	import type { PageData } from './$types';
	//@ts-ignore
	import SvelteTable from 'svelte-table';

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

	const cols = [
		{
			key: 'name',
			title: 'Nombre',
			value: (v: any) => v.name,
			sortable: true
		},
		{
			key: 'age',
			title: 'Edad',
			value: (v: any) => +v.age,
			renderValue: (v: any) => v.age || '-',
			sortable: true
		},
		{
			key: 'death_date',
			title: 'Fecha de Muerte',
			value: (v: any) => parseDate(v.death_date),
			renderValue: (v: any) => v.death_date || '-',
			sortable: true
		},
		{
			key: 'death_cause',
			title: 'Causa',
			value: (v: any) => v.death_cause,
			sortable: true
		},
		{
			key: 'death_location',
			title: 'Lugar donde murió',
			value: (v: any) => v.death_location,
			sortable: true
		},
		{
			key: 'place_of_origin',
			title: 'Lugar de origen',
			value: (v: any) => v.place_of_origin,
			sortable: true
		},
		{
			key: 'details',
			title: 'Detalles',
			value: (v: any) => v.details,
			sortable: false
		}
	];
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
			<SvelteTable rowKey="name" rows={deceased} columns={cols} />
		</div>
	</div>
</main>

<style>
	.table-wrapper {
		overflow-x: scroll;
		color: #fffffd;
	}

	:global(.table-wrapper thead tr) {
		border-bottom: 2px solid #7856ff;
	}

	:global(.table-wrapper thead th) {
		text-align: left;
		padding: 1rem 0.5rem;
	}

	:global(.table-wrapper tbody td) {
		min-width: 100px;
	}

	:global(.table-wrapper tbody td:first-child),
	:global(.table-wrapper tbody td:nth-child(5))  {
		min-width: 150px;
	}

	:global(.table-wrapper thead th:last-child) {
		min-width: 100vw;
	}

	:global(.table-wrapper tbody td) {
		font-size: 14px;
		padding: 1rem 0.5rem;
	}
</style>
