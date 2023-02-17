<script lang="ts">
	import { onMount } from "svelte";
	import TimelineItem from "./timeline-item.svelte";


    export let events: any[] = [];
    let selectedYear = 2021;
    let months: any[] = [];
    let filters: string[] = ['detención'];

    console.log(filters.find(value => value === 'detención'))
    const getDataByMonth = (data: any[], month: number): any[] => {
        return data.filter(value => {
            return value.date?.getMonth() === month && value.date?.getFullYear() === selectedYear;
        })
    }

    const activeFilter = (e: any) => {
        console.log(e.target)
        e.target.classList.toggle('active')
    }

    onMount(() => {
        document.querySelectorAll(".month").forEach((value, key) => {
            const month = 11 - key;
            months.push(getDataByMonth(events, month));
        })
        console.log(months)
    })
</script>

<div class="flex flex-col h-full">
    <div class="flex justify-between">
        <button class="button active" on:click={activeFilter}>Detenciones</button>
		<button class="button" on:click={activeFilter}>Rescates</button>
		<button class="button" on:click={activeFilter}>Intercepciones</button>
		<button class="button" on:click={activeFilter}>Transferencias</button>
		<button class="button" on:click={activeFilter}>Expulsión</button>
		<button class="button" on:click={activeFilter}>Repatriación</button>
		<button class="button" on:click={activeFilter}>Muerte</button>
		<button class="button" on:click={activeFilter}>Desapariciones</button>
	</div>
	<div class="flex border border-light h-full rounded-xl mt-3 pt-5 relative">
        <div class="division"></div>
        <div class="line year">
            <span>{selectedYear}</span>
        </div>
        <div class="line month december">
            <TimelineItem data={months[0]} />
            <span>Diciembre</span> 
        </div>
        <div class="line month november">
            <span>Noviembre</span>
        </div>
        <div class="line month octuber">
            <span>Octubre</span>
        </div>
        <div class="line month semptember">
            <span>Septiembre</span>
        </div>
        <div class="line month agust">
            <span>Agosto</span>
        </div>
        <div class="line month july">
            <span>Julio</span>
        </div>
        <div class="line month june">
            <span>Junio</span>
        </div>
        <div class="line month may">
            <span>Mayo</span>
        </div>
        <div class="line month april">
            <span>Abril</span>
        </div>
        <div class="line month march">
            <span>Marzo</span>
        </div>
        <div class="line month february">
            <span>Febrero</span>
        </div>
        <div class="line month noline january">
            <span>Enero</span>
        </div>
    </div>
</div>

<style>
	.button {
		@apply rounded-xl text-light bg-dark px-2 py-1 border border-accent text-sm transition-all duration-200;
	}

    .button:hover, .button.active:hover {
        @apply bg-light text-accent;
        box-shadow: none;
    }

    .button.active {
        @apply bg-accent border-dark border-2;
        box-shadow: 0px 0px 0px 2px rgba(120,86,255,0.75);
    }

    .line {
        @apply w-1/12 flex justify-end;
    }

    .line span {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        @apply text-gray opacity-50 text-sm border-l-2 border-light text-end h-full;
    }
    .year span {
        @apply text-accent border-l-4 opacity-100;
    }
    .noline span {
        @apply border-0;
    }
    .division {
        @apply absolute w-11/12 border-b-2 border-light top-1/2 right-0;
    }

    
</style>
