<script lang="ts">
	import gsap from "gsap";
	import ScrollTrigger from "gsap/ScrollTrigger";
    import ScrollToPlugin from "gsap/ScrollToPlugin";
	import { onMount } from "svelte";
	import TimelineItem from "./timeline-item.svelte";
	import TimelineList from "./timeline-list.svelte";

    export let events: any[] = [];
    export let years: number[] = [];
    export let selected: any;
    const MAX_BALL_PER_MONTH = 16;

    export const changeSelected = (featured: any, isPrev: boolean = false) => {
        if (selectedYear !== featured.date.getFullYear()) {
            selectedYear = featured.date.getFullYear();
            const index = years.findIndex(value => value == selectedYear)

            //@ts-ignore
            let x = -document.querySelector('.year-container').offsetWidth * index;
            if (isPrev) {
                 x = -x;
            }
            moveYearContainer(x);
        }
    };

    const moveYearContainer = (x: number) => {
        gsap.to('#yearsContainer', { duration: 1, scrollTo: { x } })
    }

    let selectedFilter: string = "";
    let ballsize = 0;
    let selectedYear = 0;
    const months = ["Enero", "Febero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    const getDataByMonth = (data: any[], month: number, year: number): any[] => {
        /**
         * Returns chunks of size n.
         * @param {Array<any>} array any array
         * @param {number} n size of chunk 
         */
        function chunks(array: any[], n: number){
            let chunk_array = [];
            for(let i = 0; i < array.length; i += n) chunk_array.push(array.slice(i, i + n));
            return chunk_array;
        }

        let results = data.filter(value => {
            return value.date?.getMonth() === month && value.date?.getFullYear() === year;
        })

        if (results.length > MAX_BALL_PER_MONTH) {
            results = chunks(results, MAX_BALL_PER_MONTH)
            // console.log(results)
        } else {
            results = [results]
        }

        ballsize = 30; //results.length > ballsize ? results.length : ballsize
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
        gsap.registerPlugin(ScrollTrigger)
        gsap.registerPlugin(ScrollToPlugin)

        selectedYear = years[0];
        changeSelected(selected, true)
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
        <div id="yearsContainer" class="flex h-full">
            {#each years as year}
                <div class="flex year-container">
                    <div class="line year">
                        <span>{year}</span>
                    </div>
                    {#each months as month, i}
                        {#if getDataByMonth(events, i, year)[0].length != 0}
                            <TimelineList
                                data={getDataByMonth(events, i, year)}
                                {selectedFilter}
                                {ballsize}
                                {selected}
                                {month}
                            />
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    #yearsContainer {
        overflow-x: auto;
        overflow-y: hidden;
    }
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
        @apply w-9 flex justify-end;
    }

    .line span {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        @apply text-gray opacity-50 text-sm border-l-2 border-light text-end h-full;
    }
    .year span {
        @apply text-accent border-l-4 opacity-100 w-9;
    }
    #timelineContainer div:last-child > span {
        /* @apply border-0; */
    }
    .division {
        @apply absolute w-11/12 border-b-2 border-light top-1/2 right-0;
    }

    
</style>
