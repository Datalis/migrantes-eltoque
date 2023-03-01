<script lang="ts">
	import TimelineItem from "./timeline-item.svelte";
    export let data: any[];
    export let selectedFilter: any;
    export let ballsize: number = 30;
    export let selected: any;
    export let month: string;

</script>

{#each data as d}
    <div class="line month min-w-max relative">
        <TimelineItem
            data={d}
            filter={selectedFilter}
            ballsize={parseInt((600 / ballsize).toFixed(0))}
            selected={selected.id}
        />
        {#if d === data[0]}
            <span>{month}</span>
        {/if}
    </div>
{/each}

<style>
    .line {
        @apply w-6 flex justify-end;
    }

    .line span {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        @apply text-gray opacity-50 text-sm border-l-2 w-9 border-light text-end h-full;
    }
</style>