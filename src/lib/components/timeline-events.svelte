<script lang="ts">
  import gsap from 'gsap';

	import DetencionImg from '$lib/assets/images/section-timeline/detencion.png?w=400&webp';
	import MuerteImg from '$lib/assets/images/section-timeline/muerte.png?w=400&webp';
	import RepatriacionImg from '$lib/assets/images/section-timeline/repatriacion.png?w=400&webp';
	import RescateImg from '$lib/assets/images/section-timeline/rescates.png?w=400&webp';

	export let events: any[];

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

  export const update = (id: number) => {
    const selector = `#event-${id}`;
    const element = document.querySelector(selector);
    //@ts-ignore
    const offset = document.querySelector('#event-container')?.clientWidth - element?.clientWidth;
  
    //@ts-ignore
    gsap.to('#event-container', { duration: 1, scrollTo: { x: element, offsetX: offset / 2 } });
  }

</script>

<div id="event-container" class="flex">
	{#each events as event}
		<div class="event-info w-screen h-screen shrink-0 event-{event.id}">
			<img
				class="p-2 absolute z-0"
				src={getImageFromEvent(event)}
				alt={event.name}
				loading="lazy"
			/>
			<div class="px-8 mt-40 md:mt-24 relative z-10">
				<h3 class="uppercase font-bold mb-2">
					{months[event.date.getMonth()]}
					{event.date.getFullYear()}
				</h3>
				<p class="">{event.description}</p>
				<p class="mt-2">
					<span class="font-bold uppercase">Fuente:</span>
					<a
						class="underline underline-offset-2"
						href={event.links}
						target="_blank"
						rel="noreferrer">{event.source}</a
					>
				</p>
			</div>
		</div>
	{/each}
</div>
