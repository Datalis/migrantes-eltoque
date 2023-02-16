<script>
</script>

<div class="flex flex-col h-full">
    <div class="flex justify-between">
        <button class="button">Detenciones</button>
		<button class="button">Rescates</button>
		<button class="button">Intercepciones</button>
		<button class="button">Transferencias</button>
		<button class="button">Expulsión</button>
		<button class="button">Repatriación</button>
		<button class="button">Muerte</button>
		<button class="button">Desapariciones</button>
	</div>
	<div class="flex border border-light h-full rounded-xl mt-3 pt-5 relative">
        <div class="division"></div>
        <div class="line year">2022</div>
        <div class="line">Diciembre</div>
        <div class="line">Noviembre</div>
        <div class="line">Octubre</div>
        <div class="line">Septiembre</div>
        <div class="line">Agosto</div>
        <div class="line">Julio</div>
        <div class="line">Junio</div>
        <div class="line">Mayo</div>
        <div class="line">Abril</div>
        <div class="line">Marzo</div>
        <div class="line">Febrero</div>
        <div class="line noline">Enero</div>
    </div>
</div>

<style>
	.button {
		@apply rounded-xl text-light bg-dark px-2 py-1 border border-accent text-sm;
	}

    .line {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        @apply text-gray opacity-50 text-sm w-1/12 border-l-2 border-light text-end h-full;
    }
    .year {
        @apply text-accent border-l-4 opacity-100;
    }
    .noline {
        @apply border-0;
    }
    .division {
        @apply absolute w-11/12 border-b-2 border-light top-1/2 right-0;
    }
</style>
