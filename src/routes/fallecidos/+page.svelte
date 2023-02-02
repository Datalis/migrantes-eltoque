<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import SearchInput from '$lib/components/search-input.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: deceased = data?.deceased?.values?.slice(1).map((e: any) => ({
		name: e[2],
		age: e[3],
		details: e[10]
	})) || [];
</script>

<main class="bg-dark">
	<div class="max-w-4xl mx-4 md:mx-auto py-20">
		<h1 class="text-6xl text-accent font-extrabold text-center md:text-left">+72</h1>
		<h3 class="text-4xl text-light font-bold text-center md:text-left">Personas fallecidas</h3>
		<div class="bg-accent flex flex-col md:flex-row items-center p-10 rounded-lg mt-10 md:h-52">
			<p class="text-light md:mr-10 mb-10 md:mb-0">
				Si tienes algún familiar, amigo o conocido que haya desaparecido tratando de migrar o
				conociste alguien que viajaba contigo y se ha denunciado que no llegó, escríbenos. Queremos
				que no se olvide su historia y ayudar, de acuerdo con nuestras posibilidades, a buscar la
				información que necesitan sus seres queridos.
			</p>
			<Button type="solid" color="light" classes="w-full">Reportar fallecido</Button>
		</div>
		<div class="mt-20">
			<SearchInput />
		</div>
		<table class="table-auto mt-10 w-full text-light">
			<thead>
				<tr>
					<th class="text-left">Nombre</th>
					<th class="text-left">Edad</th>
					<th class="text-left">Detalles</th>
				</tr>
			</thead>
			<tbody>
				{#each deceased as person}
					<tr class="">
						<td class="border-b-2 border-gray border-opacity-20 text-sm py-4 align-top">{person?.name}</td>
						<td class="border-b-2 border-gray border-opacity-20 text-sm py-4 align-top">{person?.age}</td>
						<td class="border-b-2 border-gray border-opacity-20 max-w-prose text-sm py-4">{person?.details || '-'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
