<script lang="ts">
	// import ToggleIcon from '$lib/assets/images/chevron-down-circle.svg?component';
	import ChevronLeftIcon from '$lib/assets/images/chevron-left.svg?component';
	//@ts-ignore
	import SvelteTable, { type TableColumn } from 'svelte-table';

	import Button from '$lib/components/button.svelte';
	import ReportModal from '$lib/components/report-modal.svelte';
	import SearchInput from '$lib/components/search-input.svelte';
	import { compareObjects, parseDate, trimString } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	let missing = data.missing || [];
	let totals = data?.totals || [];

	let showModal = false;

	function itemExists(haystack: any[], needle: any) {
		for (let i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
		return false;
	}

	function searchFor(toSearch: string, data: any[]) {
		var results = [];
		toSearch = trimString(toSearch); // trim it
		for (var i = 0; i < data.length; i++) {
			for (var key in data[i]) {
				if (typeof data[i][key] == 'string' && data[i][key]?.indexOf(toSearch) != -1) {
					if (!itemExists(results, data[i])) results.push(data[i]);
				}
			}
		}
		return results;
	}

	const onSearch = (query: string) => {
		if (query == '') missing = data.missing || [];
		else missing = searchFor(query, data.missing || []);
	};

	const cols: TableColumn<any>[] = [
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
			key: 'birthdate',
			title: 'Fecha de Nacimiento',
			value: (v: any) => parseDate(v.birthdate)?.toDateString() || '-',
			renderValue: (v: any) => v.birthdate || '-',
			sortable: true
		},
		{
			key: 'birthplace',
			title: 'Lugar de origen',
			value: (v: any) => v.birthplace || "-",
			sortable: true
		},
		{
			key: 'starting_point',
			title: 'Punto de partida',
			value: (v: any) => v.starting_point || '-',
			sortable: true
		},
		{
			key: 'missing_place',
			title: 'Lugar donde desapareció',
			value: (v: any) => v.missing_place || '-',
			sortable: true
		},
		{
			key: 'missing_date',
			title: 'Fecha',
			value: (v: any) => parseDate(v.missing_date)?.toDateString() || '-',
			renderValue: (v: any) => v.missing_date || '-',
			sortable: true
		}
	];
</script>

<main class="missing-page bg-dark">
	{#if showModal}
		<ReportModal on:close={() => (showModal = false)} />
	{/if}
	<div class="container px-4 py-10 mx-auto xl:max-w-6xl">
		<a href="/" class="flex items-center text-gray">
			<ChevronLeftIcon fill="rgb(224 224 224 / var(--tw-text-opacity))" />
			Atrás
		</a>
		<h1 class="text-6xl text-accent text-center  md:text-left font-extrabold mt-10">
			+{totals?.missing}
		</h1>
		<h3 class="text-4xl text-light text-center md:text-left font-bold">Personas desaparecidas</h3>
		<div class="bg-accent flex flex-col md:flex-row items-center p-10 rounded-lg mt-10">
			<p class="text-light md:mr-10 mb-10 md:mb-0">
				Si tienes algún familiar, amigo o conocido que haya desaparecido tratando de migrar o
				conociste alguien que viajaba contigo y se ha denunciado que no llegó, escríbenos. Queremos
				que no se olvide su historia y ayudar, de acuerdo con nuestras posibilidades, a buscar la
				información que necesitan sus seres queridos.
			</p>
			<Button type="solid" color="light" onClick={() => (showModal = true)}
				>Reportar desaparecido</Button
			>
		</div>
		<div class="mt-20 flex flex-col">
			<span class="text-xs mb-4 text-gray"
				>*Este es un listado incompleto, que incluye solo los nombres de las personas que hemos
				podido identificar. Otros todavía permanecen en el anonimato.</span
			>
			<SearchInput on:search={(e) => onSearch(e.detail)} placeholder="Buscar..." />
		</div>
		<div class="table-wrapper mt-10">
			<SvelteTable
				rowKey="name"
				rows={missing}
				showExpandIcon={true}
				expandSingle={true}
				columns={cols}
				classNameExpandedContent={'border-t'}
				classNameCellExpand={'expand'}
			>
				<svelte:fragment slot="expanded" let:row>{row.details}</svelte:fragment>
			</SvelteTable>
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

	:global(.table-wrapper tbody td:not(.expand)) {
		min-width: 100px;
	}

	:global(.table-wrapper tbody td) {
		font-size: 14px;
		padding: 1rem 0.5rem;
	}
</style>
