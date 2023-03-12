<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import X from '$lib/assets/images/x.svg?component';
	import DetencionImg from '$lib/assets/images/section-timeline/detencion.png?w=400&webp';
	import MuerteImg from '$lib/assets/images/section-timeline/muerte.png?w=400&webp';
	import RepatriacionImg from '$lib/assets/images/section-timeline/repatriacion.png?w=400&webp';
	import RescateImg from '$lib/assets/images/section-timeline/rescates.png?w=400&webp';

	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	];

	const getImageFromEvent = (event: any) => {
		switch (event.eventType) {
			case 'repatriación':
				return RepatriacionImg;
			case 'detención':
				return DetencionImg;
			case 'muerte':
				return MuerteImg;
			case 'rescates':
				return RescateImg;
			default:
				return RepatriacionImg; // TODO: add other images
		}
	};

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	export let event: any;
	let modal;

	const handle_keydown = (/** @type {{ key: string; }} */ e) => {
		if (e.key == 'Escape') {
			close();
			return;
		}
	};
</script>

<svelte:window on:keydown={handle_keydown} />

<div
	class="modal bg-dark bg-opacity-100 text-gray w-full h-full flex flex-col items-center justify-center"
	role="dialog"
	aria-modal="true"
	bind:this={modal}
>
	<button on:click={close} type="button" class="close absolute right-4 top-4 z-50">
		<X width="32" height="32" />
	</button>
	<div class="event-info bg-accent text-light w-screen h-screen shrink-0 event-{event.id}">
		<img class="p-2 absolute z-0" src={getImageFromEvent(event)} alt={event.name} loading="lazy" />
		<div class="px-8 mt-40 md:mt-24 relative z-10">
			<h3 class="uppercase font-bold mb-2">
				{months[event.date.getMonth()]}
				{event.date.getFullYear()}
			</h3>
			<p class="">{event.description}</p>
			<p class="mt-2">
				<span class="font-bold uppercase">Fuente:</span>
				<a class="underline underline-offset-2" href={event.links} target="_blank" rel="noreferrer"
					>{event.source}</a
				>
			</p>
		</div>
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
