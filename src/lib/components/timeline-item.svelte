<script lang="ts">
  import { onMount } from 'svelte';

  export let data: any[] = [];
  export let filter: string = '';
  export let ballsize = 32;
  export let selected: number;
  export let show_event: (e: any) => void;
  export let isDisabled = true;

  const show_info = (date: any) => {
    if (!isDisabled) {
      console.log('item', date)
      show_event(date);
    }
  }

  onMount(() => {
    });
</script>

<div
  class="events"
>
  {#each data as date}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      id="ball-{date.id}"
      on:click={() => show_info(date)}
      class="ball
        {isDisabled ? 'disabled' : 'hover'}
        {date.id == selected ? 'selected' : date.eventType == filter ? 'highlight' : ''}
      "
      style="{`--ballsize:${ballsize}`}px"
    />
  {/each}
</div>

<style>
  .events {
    flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
  }

  .events .ball {
    width: var(--ballsize);
		height: var(--ballsize);
		position: relative;
		left: -1.25rem;
		@apply bg-dark border-2 border-accent rounded-full;
  }

  .events .ball.highlight {
		@apply bg-light border-none border-0;
		box-shadow: inset 0 0 0 2px rgb(120, 86, 255), inset 0 0 0 6px rgb(31, 32, 67);
	}
  .events .ball.disabled:not(.selected):not(.ball.highlight) {
    background-color: gray;
    border-color: gray;
  }

  .events .ball.hover:hover {
    @apply bg-light border-light transition-all duration-500;
  }

  .ball.selected {
    @apply bg-light border-0;
  }
  /* .container {
    @apply flex flex-col items-center w-fit absolute translate-x-4 z-10;
  }
  .ball {
    @apply bg-dark border-2 border-accent rounded-full;
    width: var(--ballsize);
    height: var(--ballsize);
  }
  .ball.hover:hover {
    @apply bg-light border-light transition-all duration-500;
  }
  .ball.highlight {
    @apply bg-light border-none border-0;
    box-shadow: inset 0 0 0 2px rgb(120,86,255), inset 0 0 0 6px rgb(31, 32, 67);
  } */
</style>