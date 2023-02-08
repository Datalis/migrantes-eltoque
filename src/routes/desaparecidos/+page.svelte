<script lang="ts">
	import ToggleIcon from '$lib/assets/images/chevron-down-circle.svg?component';
	import ChevronLeftIcon from '$lib/assets/images/chevron-left.svg?component';

	import Button from '$lib/components/button.svelte';
	import ReportModal from '$lib/components/report-modal.svelte';
	import SearchInput from '$lib/components/search-input.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let missing = data.missing || [];

	let showModal = false;

	const onSearch = (query: string) => {
		if (query == '') missing = data.missing || [];
		else
			missing =
				data.missing?.filter((e) => {
					return e.name.toLowerCase().indexOf(query.toLowerCase(), 0) != -1;
				}) || [];
	};
</script>

<main class="missing-page bg-dark">
	{#if showModal}
		<ReportModal on:close={() => (showModal = false)} />
	{/if}
	<div class="max-w-6xl mx-4 md:mx-auto py-10">
		<a href="/" class="flex items-center text-gray">
			<ChevronLeftIcon fill="rgb(224 224 224 / var(--tw-text-opacity))" />
			Atrás
		</a>
		<h1 class="text-6xl text-accent text-center  md:text-left font-extrabold mt-10">
			+{data?.missing?.length}
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
			<span
				class="text-xs mb-4 text-gray"
				>*Este es un listado
				incompleto, que incluye solo los nombres de las personas que hemos podido identificar. Otros
				todavía permanecen en el anonimato.</span
			>
			<SearchInput
				on:search={(e) => onSearch(e.detail)}
				placeholder="Escribe el nombre de la persona desaparecida"
			/>
		</div>
		<div class="table-wrapper">
			<table class="table table-auto mt-10 w-full text-light">
				<thead>
					<tr>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Nombre</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Edad</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Fecha de Nacimiento</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Lugar de origen</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Punto de partida</th>
						<th class="font-thin text-left border-b-2 border-accent pb-4"
							>Lugar donde desapareció</th
						>
						<th class="font-thin text-left border-b-2 border-accent pb-4">Fecha</th>
						<th class="border-b-2 border-accent pb-4" />
					</tr>
				</thead>
				<tbody>
					{#each missing as person}
						<tr>
							<td class="border-b border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.name}</td
							>
							<td class="border-b border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.age}</td
							>
							<td class="border-b border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.birthdate || '-'}</td
							>
							<td class="border-b border-gray border-opacity-20 text-sm py-4 align-top"
								>{person?.birthplace == 'Desconocido' ? '-' : person?.birthplace}</td
							>
							<td class="border-b border-gray border-opacity-20 max-w-prose text-sm py-4"
								>{person?.starting_point == 'Desconocido' ? '-' : person?.starting_point}</td
							>
							<td class="border-b border-gray border-opacity-20 max-w-prose text-sm py-4"
								>{person?.missing_place == 'Desconocido' ? '-' : person?.missing_place}</td
							>
							<td class="border-b border-gray border-opacity-20 text-sm">
								{person?.missing_date}
							</td>
							<td class="border-b border-gray border-opacity-20">
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<span on:click={() => (person.collapsed = !person.collapsed)}>
									<ToggleIcon
										width="32"
										height="32"
										class="toggler {person?.collapsed ? 'collapsed' : ''}"
									/>
								</span>
							</td>
						</tr>
						<tr>
							<td colspan="4">
								<p class="collapsible text-sm overflow-hidden" class:collapsed={person.collapsed}>
									{person?.details}
								</p>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</main>

<style>
	:global(.missing-page .table .toggler) {
		fill: #fffffd !important;
		transition: all 0.4s ease;
		transform: rotate(180deg);
		cursor: pointer;
	}
	:global(.missing-page .table .toggler.collapsed) {
		fill: #7856ff !important;
		transform: rotate(0);
	}
	.missing-page .table .collapsible.collapsed {
		max-height: 0;
		padding-top: 0;
		padding-bottom: 0;
		opacity: 0;
		visibility: collapse;
	}
	.missing-page .table .collapsible {
		height: auto;
		max-height: 50vh;
		transition: padding 0.25s, height 0.5s, opacity 0.4s ease;
		display: block;
		padding-top: 1rem;
		padding-bottom: 1rem;
		opacity: 1;
	}
	.table-wrapper {
		overflow-x: scroll;
	}
	@media (max-width: 768px) {
		.table-wrapper td {
			min-width: 100px;
		}
	}
</style>
