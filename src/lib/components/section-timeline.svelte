<script lang="ts">
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import ArrowRightIcon from '$lib/assets/images/arrow-right.svg?component';
	import ArrowLeftIcon from '$lib/assets/images/arrow-left.svg?component';
    import TimeLine from './timeline.svelte';

    export let events: any[] = [];
    let years: number[] = [];

    let swiperIndex = 0;
	let swiper: {
		[x: string]: any;
		activeIndex: number;
	};

	function onSwiper(e: any) {
		swiper = e.detail[0];
	}

    function onSlideNext(e: any) {
        swiperIndex !== featureds.length && ++swiperIndex;
    }

    function onSlidePrev(e: any) {
        swiperIndex !== 0 && --swiperIndex;
    }

	function onSwiperNext() {
		swiper.slideNext();
		swiperIndex !== featureds.length && ++swiperIndex;
	}

	function onSwiperPrev() {
		swiper.slidePrev();
		swiperIndex !== 0 && --swiperIndex;
	}

    const emptyToNull = (value: string): string | null => value === "" ? null : value;
    const stringToDate = (value: string): Date => {
        const [day, month, year] = value.split("/");
        return new Date(Date.UTC(parseInt(year), parseInt(month), parseInt(day)))
    }
    const dataToObject = (data: any[][]) => {
        let values: any[] = data.map((value: any[]) => {
            const date = stringToDate(value[1]);
            if (years.length == 0 || (years[years.length - 1] != date.getFullYear())) {
                years.push(date.getFullYear())
            }

            return {
                id: parseInt(value[0]),
                date,
                name: emptyToNull(value[2]),
                description: emptyToNull(value[3]),
                eventType: emptyToNull(value[4]),
                migrationType: emptyToNull(value[5]),
                country: emptyToNull(value[6]),
                location: emptyToNull(value[7]),
                coordenates: emptyToNull(value[8]),
                names: emptyToNull(value[9]),
                personsNo: emptyToNull(value[10]) || 0,
                womenNo: emptyToNull(value[11]) || 0,
                menNo: emptyToNull(value[12]) || 0,
                childrenNo: emptyToNull(value[13]) || 0,
                deaths: emptyToNull(value[14]) || 0,
                missingsNo: emptyToNull(value[15]) || 0,
                history: emptyToNull(value[16]),
                source: emptyToNull(value[17]),
                multimedia: emptyToNull(value[18]),
                links: emptyToNull(value[19]),
                isFeature: emptyToNull(value[20]),
            }
        })
        return values.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }
    events = dataToObject(events)
    $: featureds = events.filter(event => event.isFeature)

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger)

        // let sections = gsap.utils.toArray('.panel')
        // gsap.to(sections, {
        //     xPercent: -100 * (sections.length - 1),
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: ".panel-container",
        //         pin: true,
        //         scrub: .1,
        //         snap: 1 / (sections.length - 1),
        //         //@ts-ignore
        //         end: () => "+=" + document.querySelector(".panel-container").offsetWidth
        //     }
        // })
    })
</script>

<section id="section-timeline" class="section-timeline bg-dark md:pb-20 px-10">
	<div class="flex flex-col justify-center items-center">
		<div class="max-w-3xl md:mb-10 px-10">
			<h2 class="font-sans font-extrabold text-5xl md:text-5xl text-light mb-7">
				El final
				<span class="text-accent">"infeliz"</span>
				<br />
				del camino
			</h2>
			<p class="text-light">
				Hasta el momento hemos identificado más de 580 incidentes que han ocurrido desde enero de
				2021 que involucran a migrantes cubanos en diferentes zonas geográficas. Las historias no
				solo reflejan la tragedia que significa que alguien muera o desaparezca, también han sido
				rescatados o interceptados en el mar, detenidos por las autoridades de los países donde se
				encuentra, devueltos o repatriados.
			</p>
		</div>
	</div>
    <div class="flex panel-container py-10 h-screen">
        <div class="w-1/3 relative bg-accent rounded-xl flex flex-col justify-center text-light">
            <Swiper
				on:swiper={onSwiper}
                on:slideNextTransitionEnd={onSlideNext}
                on:slidePrevTransitionEnd={onSlidePrev}
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
				{#each featureds as featured}
					<SwiperSlide>
						<p class="px-10 mt-2">{featured.description}</p>
					</SwiperSlide>
				{/each}
			</Swiper>
            <div class="swiper-controls absolute bottom-3 w-full justify-center hidden md:flex ml-auto">
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
						class="control {swiperIndex == featureds?.length ? 'control-disabled' : ''}"
						width="48"
						height="48"
					/>
				</span>
			</div>       
            <p class="px-10">
                <!-- Fuente: <a href="{featuredEvent.links}" target="_blank" rel="noreferrer">{featuredEvent.source}</a> -->
            </p>
        </div>
        <div class="w-2/3 ml-2">
            <TimeLine events={events} years={years}/>
        </div>
    </div>
</section>

<style>
    :global(.swiper) {
        width: 100%;
    }

    :global(.swiper-controls .control) {
		cursor: pointer;
	}
    :global(.swiper-controls .control g) {
        @apply stroke-light;
    }
	:global(.swiper-controls .control.control-disabled) {
		opacity: 0.4;
	}
</style>