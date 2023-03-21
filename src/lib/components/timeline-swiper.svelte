<script lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import ArrowRightIcon from '$lib/assets/images/arrow-right.svg?component';
  import ArrowLeftIcon from '$lib/assets/images/arrow-left.svg?component';

	import DetencionImg from '$lib/assets/images/section-timeline/detencion.png?w=400&webp';
	import MuerteImg from '$lib/assets/images/section-timeline/muerte.png?w=400&webp';
	import RepatriacionImg from '$lib/assets/images/section-timeline/repatriacion.png?w=400&webp';
	import RescateImg from '$lib/assets/images/section-timeline/rescates.png?w=400&webp';

  export let events: any[];
  export let isDisabled: boolean;
  export let timeline: any;
  export let swiperIndex = 0;

  let swiper: {
    [x: string]: any;
    activeIndex: number;
  };

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

  function onSwiper(e: any) {
    swiper = e.detail[0];
  }

  function onSlideNext(e: any) {
    if (swiperIndex >= events.length) {
      swiperIndex = events.length - 1
    }
    timeline.changeSelected(events[swiperIndex], isDisabled);
  }

  function onSlidePrev(e: any) {
    if (swiperIndex >= events.length) {
      swiperIndex = events.length - 1
    }
    timeline.changeSelected(events[swiperIndex], isDisabled);
  }

  export function onSwiperNext(e: any, allowToSweep: boolean | null = null) {
    if (allowToSweep || !isDisabled) {
      swiperIndex !== events.length && ++swiperIndex;
      swiper.slideNext();
    }
  }

  export function onSwiperPrev(e: any, allowToSweep: boolean | null = null) {
    if (allowToSweep || !isDisabled) {
      swiperIndex !== 0 && --swiperIndex;
      swiper.slidePrev();
    }
  }

  export function slideTo(index: number) {
    swiperIndex = index;
    swiper.slideTo(index);
  }

  export const update = (e: any[]) => {
    events = e;
    // swiperIndex = events.length - 1;
    // timeline.changeSelected(events[events.length - 1])
    swiper.slideTo(0)
  }

  export function slidePrev() {
    swiper.slidePrev();
  }
  
  const getImageFromEvent = (event: any) => {
    switch (event.eventType) {
      case "repatriación":
        return RepatriacionImg;
      case "detención":
        return DetencionImg;
      case "muerte":
        return MuerteImg;
      case "rescates":
        return RescateImg;
      default:
        return RepatriacionImg; // TODO: add other images
    }
  }
</script>

<Swiper
  on:swiper={onSwiper}
  on:slideNextTransitionStart={onSlideNext}
  on:slidePrevTransitionStart={onSlidePrev}
  autoHeight={true}
  preloadImages={false}
  lazy={{
    loadPrevNext: true,
    loadPrevNextAmount: 2
  }}
  slidesPerView={1}
  spaceBetween={50}
  centeredSlides={true}
>
  {#each events as event}
    <SwiperSlide>
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
    </SwiperSlide>
  {/each}
</Swiper>
{#if !isDisabled}
  <div class="swiper-controls absolute bottom-3 w-full justify-center z-20 hidden md:flex ml-auto">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={onSwiperPrev}>
      <ArrowLeftIcon
        class="control mr-4 {swiperIndex == 0 ? 'control-disabled' : ''}"
        width="48"
        height="48"
      />
    </span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={onSwiperNext}>
      <ArrowRightIcon
        class="control {swiperIndex == events?.length - 1 ? 'control-disabled' : ''}"
        width="48"
        height="48"
      />
    </span>
  </div>
  {/if}
