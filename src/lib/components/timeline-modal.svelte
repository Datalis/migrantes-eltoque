<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import X from '$lib/assets/images/x.svg?component';
	import TimelineEvents from './timeline-events.svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	export let events: any[];
  export let isInvisible: boolean = true;

	let modal;
  let eventModal: any;

	const handle_keydown = (/** @type {{ key: string; }} */ e) => {
		if (e.key == 'Escape') {
			close();
			return;
		}
	};

  export const update = (id: number) => {
    eventModal.update(id)
  }

</script>

<svelte:window on:keydown={handle_keydown} />

<div
	class="modal bg-dark bg-opacity-100 text-gray w-full h-full flex flex-col items-center justify-center"
	role="dialog"
	aria-modal="true"
	bind:this={modal}
>
	<button on:click={close} type="button" class="close absolute right-4 top-4">
		<X width="32" height="32" />
	</button>
	<div class="h-full w-full bg-accent text-light">
		<TimelineEvents bind:this={eventModal} {events} {update} />
	</div>
</div>

<style>
	.modal {
		position: fixed;
		left: 0;
		top: 0;
		overflow: auto;
		z-index: 40;
	}

	button.close {
		@apply bg-gray w-9 h-9 rounded-full text-dark font-extrabold flex items-center justify-center;
	}
	:global(.section-timeline .swiper) {
		width: 100%;
	}

	:global(.section-timeline .swiper-controls .control) {
		cursor: pointer;
	}
	:global(.section-timeline .swiper-controls .control g) {
		@apply stroke-light;
	}
	:global(.section-timeline .swiper-controls .control.control-disabled) {
		opacity: 0.4;
		@apply cursor-auto;
	}
</style>
