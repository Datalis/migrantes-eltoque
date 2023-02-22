<script lang="ts">
	import { onMount } from "svelte";
	import TimelineItem from "./timeline-item.svelte";


    export let events: any[] = [];
    export let years: number[] = [];
    let selectedFilter: string = "";
    let ballsize = 0;
    const months = ["Diciembre", "Noviembre", "Octubre", "Septiembre", "Agosto", "Julio", "Junio", "Mayo", "Abril", "Marzo", "Febrero", "Enero"]

    const getDataByMonth = (data: any[], month: number, year: number): any[] => {
        const results = data.filter(value => {
            return value.date?.getMonth() - 1 === month && value.date?.getFullYear() === year;
        })
        ballsize = results.length > ballsize ? results.length : ballsize
        return results;
    }

    const activeFilter = (e: any) => {
        switch (e.target.innerText) {
            case "Detenciones":
                selectedFilter = "detención"
                break
            case "Rescates":
                selectedFilter = "rescate"
                break
            case "Intercepciones":
                selectedFilter = "intercepción"
                break
            case "Transferencias":
                selectedFilter = "transferencia"
                break
            case "Expulsión":
                selectedFilter = "expulsión"
                break
            case "Repatriación":
                selectedFilter = "repatriación"
                break
            case "Muerte":
                selectedFilter = "muerte"
                break
            case "Desapariciones":
                selectedFilter = "desaparición"
                break
        }
    }

    onMount(() => {
    })
</script>

<div class="h-full">
    <div class="flex justify-between">
        <button class="button {selectedFilter === "detención" ? 'active': ''}" on:click={activeFilter}>Detenciones</button>
		<button class="button {selectedFilter === "rescate" ? 'active': ''}" on:click={activeFilter}>Rescates</button>
		<button class="button {selectedFilter === "intercepción" ? 'active': ''}" on:click={activeFilter}>Intercepciones</button>
		<button class="button {selectedFilter === "transferencia" ? 'active': ''}" on:click={activeFilter}>Transferencias</button>
		<button class="button {selectedFilter === "expulsión" ? 'active': ''}" on:click={activeFilter}>Expulsión</button>
		<button class="button {selectedFilter === "repatriación" ? 'active': ''}" on:click={activeFilter}>Repatriación</button>
		<button class="button {selectedFilter === "muerte" ? 'active': ''}" on:click={activeFilter}>Muerte</button>
		<button class="button {selectedFilter === "desaparición" ? 'active': ''}" on:click={activeFilter}>Desapariciones</button>
	</div>
	<div id="timelineContainer" class="border border-light rounded-xl mt-3 pt-5 relative" style="height: calc(100% - 30px - 0.75rem);">
        <div class="division"></div>
        <div class="flex h-full">
            {#each years as year}
                <div class="flex w-full year-container">
                    <div class="line year">
                        <span>{year}</span>
                    </div>
                    {#each months as month, i}
                        <div class="line month w-1/12">
                            <TimelineItem
                                data={getDataByMonth(events, i, year)}
                                filter={selectedFilter}
                                ballsize={parseInt((600 / ballsize).toFixed(0))}
                            />
                            <span>{month}</span> 
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .year-container {
        @apply shrink-0;
    }
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
    #timelineContainer div:last-child > span {
        @apply border-0;
    }
    .division {
        @apply absolute w-11/12 border-b-2 border-light top-1/2 right-0;
    }

    
</style>
