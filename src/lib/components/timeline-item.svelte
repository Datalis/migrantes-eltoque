<script lang="ts">
    export let data: any[] = [];
    const top = data.length % 2 == 0 ? (data.length * 32) / 2 : (data.length - 1) * 32 / 2;
</script>

<div class="container" style="top: calc(50% - {top}px)">
    {#each data as data}
        <div class="ball"></div>
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
</style>