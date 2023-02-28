<script lang="ts">
	import TimelineItem from "./timeline-item.svelte";
    export let data: any[];
    export let selectedFilter: any;
    export let ballsize: number = 30;
    export let selected: any;
    export let month: string;

// console.log(data)
const talla = (d: any) => {

    console.log(d)
    return ""
}
</script>

{#each data as d}
{talla(d), talla(data)}
    <div class="line month min-w-max relative">
        <TimelineItem
            data={d}
            filter={selectedFilter}
            ballsize={parseInt((600 / ballsize).toFixed(0))}
            selected={selected.id}
        />
        <span>{month}</span>
    </div>
{/each}

<style>
    .line {
        @apply w-9 flex justify-end;
    }

    .line span {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        @apply text-gray opacity-50 text-sm border-l-2 border-light text-end h-full;
    }
</style>