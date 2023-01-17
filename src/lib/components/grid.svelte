<script lang="ts">
	import Button from './button.svelte';
</script>

<div class="flex flex-col h-full">
	<div
		class="flex-1 grid grid-cols-2 md:grid-cols-6 md:grid-rows-3 divide-x divide-y divide-light border-b border-r-2 border-light"
	>
		<div class="col-span-2 row-span-2 bg-accent flex flex-col justify-center p-10">
			<h2 class="text-light font-bold text-4xl mb-10">Personas fallecidas</h2>
			<p class=" text-light">
				Te mostramos la distribución del presupuesto regional durante los años 2010 al 2021. Puedes
				observar tanto el gasto presupuestado total, como el presupuesto por habitante. También
				puedes ver las cantidades por área funcional, como por ejemplo Sanidad, referidas a cada
				región o a todo el territorio nacional.
			</p>
		</div>
		<div class="p-5 flex flex-col aspect-square">
			<span class="text-accent font-extrabold text-3xl">04</span>
			<h3 class="mt-auto text-2xl font-bold text-light">Julio García Morales</h3>
			<small class="mt-2 text-light">42 años</small>
		</div>
		<div class="bg-light p-5 aspect-square flex items-center">
			<p class="font-medium text-sm">
				Te mostramos la distribución del presupuesto regional durante los años 2010 al 2021.
				<br />
				Puedes observar tanto el gasto presupuestado total. Te mostramos la distribución del presupuesto
				regional
			</p>
		</div>
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
		<div class="aspect-square" />
	</div>
	<div class="flex flex-col md:flex-row items-center justify-center my-10">
		<Button classes="md:mr-8 mb-8 md:mb-0 text-light" type="bordered">Reportar fallecido</Button>
		<Button>Ver listado</Button>
	</div>
</div>
