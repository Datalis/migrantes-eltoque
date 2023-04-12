<script lang="ts">
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import ArrowRightIcon from '$lib/assets/images/arrow-right.svg?component';
	import ArrowLeftIcon from '$lib/assets/images/arrow-left.svg?component';

	import DetencionImg from '$lib/assets/images/section-timeline/detencion.png?w=400&webp';
	import MuerteImg from '$lib/assets/images/section-timeline/muerte.png?w=400&webp';
	import RepatriacionImg from '$lib/assets/images/section-timeline/repatriacion.png?w=400&webp';
	import RescateImg from '$lib/assets/images/section-timeline/rescates.png?w=400&webp';
	import DesaparicionImg from '$lib/assets/images/section-timeline/desaparicion.png?w=400&webp';
	import ExpulsionImg from '$lib/assets/images/section-timeline/expulsion.png?w=400&webp';
	import IntercepcionImg from '$lib/assets/images/section-timeline/intercepcion.png?w=400&webp';
	import TransferenciaImg from '$lib/assets/images/section-timeline/transferencia.png?w=400&webp';

	export let events: any[];
	export let isDisabled: boolean;
	export let timeline: any;
	export let swiperIndex = 0;
	export let selected: any;

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

	const handleNext = () => {
		if (swiperIndex !== events.length - 1) {
			swiperIndex++;
			selected = events[swiperIndex];
			timeline.changeSelected(selected);
		}
	};

	const handlePrev = () => {
		if (swiperIndex !== 0) {
			swiperIndex--;
			selected = events[swiperIndex];
			timeline.changeSelected(selected);
		}
	};

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
			case 'desaparición':
				return DesaparicionImg;
			case 'rescate':
				return RescateImg;
			case 'intercepción':
				return IntercepcionImg;
			case 'transferencia':
				return TransferenciaImg;
			case 'expulsión':
				return ExpulsionImg;
			default:
				return RepatriacionImg; // TODO: add other images
		}
	};
</script>

<img
	class="p-2 absolute z-0"
	src={getImageFromEvent(selected)}
	alt={selected.name}
	loading="lazy"
/>
<div class="px-8 mt-40 md:mt-[40%] relative z-10">
	<h3 class="uppercase font-bold mb-4">
		{months[selected.date.getMonth()]}
		{selected.date.getFullYear()} / {selected.eventType}
	</h3>
	<p class="">{selected.description}</p>
	{#if selected.source}
		<p class="mt-4">
			<span class="font-bold uppercase">Fuente:</span>
			<a class="underline underline-offset-2" href={selected.links} target="_blank" rel="noreferrer"
				>{selected.source}</a
			>
		</p>
	{/if}
</div>

{#if !isDisabled}
	<div class="swiper-controls absolute bottom-3 w-full justify-center z-20 hidden md:flex ml-auto">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span on:click={handlePrev}>
			<ArrowLeftIcon
				class="control mr-4 {swiperIndex == 0 ? 'control-disabled' : ''}"
				width="48"
				height="48"
			/>
		</span>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span on:click={handleNext}>
			<ArrowRightIcon
				class="control {swiperIndex == events?.length - 1 ? 'control-disabled' : ''}"
				width="48"
				height="48"
			/>
		</span>
	</div>
{/if}
