<script lang="ts">
	import PersonImg from '$lib/assets/images/person.png';
	import Button from './button.svelte';
</script>

<div class="flex flex-col">
	<img src={PersonImg} class="aspect-square rounded-2xl" alt="" />
	<span class="font-bold text-lg mt-4">Julio García Morales</span>
	<small>La Habana / 42 años</small>
	<p class="text-sm mt-4 leading-6">
		Visto por última vez mostramos la distribución del presupuesto regional durante los años 2010 al
		2021. Puedes observar tanto el gasto presupuestado total, como el presupuesto por habitante.
	</p>
    <Button classes="mt-4 self-start">Ofrecer información</Button>
</div>
