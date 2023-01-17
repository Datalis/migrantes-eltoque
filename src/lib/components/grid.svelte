<script lang="ts">
	import Button from './button.svelte';
</script>

<div class="flex flex-col h-full">
	<div class="flex-1 grid grid-cols-6 grid-rows-3">
		<div class="col-span-2 row-span-2 bg-accent flex flex-col p-10">
			<h2 class="text-light font-bold text-4xl">Personas fallecidas</h2>
			<p class="mt-auto text-light">
				Te mostramos la distribución del presupuesto regional durante los años 2010 al 2021. Puedes
				observar tanto el gasto presupuestado total, como el presupuesto por habitante. También
				puedes ver las cantidades por área funcional, como por ejemplo Sanidad, referidas a cada
				región o a todo el territorio nacional.
			</p>
		</div>
		<div class="border-2 border-light p-5 flex flex-col">
			<span class="text-accent font-extrabold text-xl">04</span>
			<h3 class="mt-auto text-2xl font-bold text-light">Julio García Morales</h3>
            <small class="mt-2 text-light">42 años</small>
		</div>
		<div class="border-2 border-light bg-light p-5">
			<p class="font-medium">
				Te mostramos la distribución del presupuesto regional durante los años 2010 al 2021.
				<br />
				Puedes observar tanto el gasto presupuestado total. Te mostramos la distribución del presupuesto
				regional
			</p>
		</div>
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
		<div class="border-2 border-light" />
	</div>
	<div class="flex items-center justify-center my-10">
		<Button classes="mr-8 text-light" type="bordered">Reportar fallecido</Button>
		<Button>Ver listado</Button>
	</div>
</div>
