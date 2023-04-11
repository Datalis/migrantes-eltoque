<script lang="ts">
	import TimelineItem from "./timeline-item.svelte";
    export let data: any[];
    export let selectedFilter: any;
    export let ballsize: number = 30;
    export let selected: any;
    export let month: string;
    export let show_event: (e: any) => void;
    export let isDisabled: boolean;

</script>

{#each data as d}
    <div class="line month min-w-max relative">
        <TimelineItem
            data={d}
            filter={selectedFilter}
            ballsize={parseInt((600 / ballsize).toFixed(0))}
            selected={selected?.id}
            {show_event}
            {isDisabled}
        />
        <span class="w-9 {d === data[0] ? '' : 'second'}">{month}</span>
    </div>
{/each}

<style>
    .line {
        @apply w-7 flex justify-end;
    }

    .line span {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        @apply text-gray opacity-50 text-sm border-l-2 border-light text-end h-full;
    }

    .line span.second {
        @apply opacity-25 border-opacity-80 border-dashed;
    }
</style>