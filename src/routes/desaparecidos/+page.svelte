<script lang="ts">
	import ToggleIcon from '$lib/assets/images/chevron-down-circle.svg?component';

	import Button from '$lib/components/button.svelte';
	import SearchInput from '$lib/components/search-input.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: missing =
		data?.missing?.values?.slice(1).map((e) => ({
			name: e[3],
			age: e[5],
			date: e[6],
			starting: e[9],
			details: e[10],
			collapsed: true
		})) || [];
</script>

<main class="missing-page bg-dark">
	<div class="max-w-4xl mx-auto py-20">
		<h1 class="text-6xl text-accent font-extrabold">+172</h1>
		<h3 class="text-4xl text-light font-bold">Personas desaparecidas</h3>
		<div class="bg-accent flex items-center p-10 rounded-lg mt-10 h-52">
			<p class="text-light mr-10">
				Si tienes algún familiar, amigo o conocido que haya desaparecido tratando de migrar o
				conociste alguien que viajaba contigo y se ha denunciado que no llegó, escríbenos. Queremos
				que no se olvide su historia y ayudar, de acuerdo con nuestras posibilidades, a buscar la
				información que necesitan sus seres queridos.
			</p>
			<Button type="solid" color="light">Reportar desaparecido</Button>
		</div>
		<div class="mt-20">
			<SearchInput />
		</div>
		<table class="table table-auto mt-10 w-full text-light">
			<thead>
				<tr>
					<th class="font-thin text-left border-b-2 border-accent pb-4">Nombre</th>
					<th class="font-thin text-left border-b-2 border-accent pb-4">Edad</th>
					<th class="font-thin text-left border-b-2 border-accent pb-4">Punto de partida</th>
					<th class="font-thin text-left border-b-2 border-accent pb-4">Fecha</th>
					<th class="border-b-2 border-accent pb-4"></th>
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
						<td class="border-b border-gray border-opacity-20 max-w-prose text-sm py-4"
							>{person?.starting}</td
						>
						<td class="border-b border-gray border-opacity-20 text-sm">
							{person?.date}
						</td>
						<td class="border-b border-gray border-opacity-20">
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<span on:click={() => person.collapsed=!person.collapsed}>
								<ToggleIcon width="32" height="32" class="toggler { person?.collapsed ? 'collapsed' : '' }"  />
							</span>
						</td>
					</tr>
					<tr>
						<td colspan="4">
							<p class="collapsible text-sm overflow-hidden" class:collapsed={person.collapsed}>{person?.details}</p>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>

<style>
	:global(.missing-page .table .toggler) {
		fill: #fffffd !important;
		transition: all 0.4s ease;
		transform: rotate(180deg);
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
</style>
