<script lang="ts">
    export let data: any[] = [];
    $: top = data.length % 2 == 0 ? (data.length * 32) / 2 : (data.length - 1) * 32 / 2;
</script>

<div class="container" style="top: calc(50% - {top}px)">
    {#each data as data}
        <div class="ball selected"></div>
    {/each}
</div>

<style>
    .container {
        @apply flex flex-col w-fit absolute translate-x-4 z-10;
    }
    .ball {
        @apply w-8 h-8 bg-dark border-2 border-accent rounded-full;
    }
    .ball:hover {
        @apply bg-light border-light transition-all duration-150;
    }
    .ball.selected {
        @apply bg-light border-0 border-dark w-4 h-4 m-2;
        box-shadow: 0px 0px 0px 6px rgb(31,32,67),
        0px 0px 0px 8px rgb(120,86,255);
    }
</style>