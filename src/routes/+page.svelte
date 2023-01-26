<script lang="ts">
	import ArrowRightIcon from '$lib/assets/images/arrow-right.svg?component';
	import ArrowLeftIcon from '$lib/assets/images/arrow-left.svg?component';
	import DecorVela from '$lib/assets/images/vela.svg?component';

	import Button from '$lib/components/button.svelte';
	import Grid from '$lib/components/grid.svelte';
	import Timeline from '$lib/components/timeline.svelte';
	import Map from '$lib/components/map.svelte';

	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	import worldMap from '@highcharts/map-collection/custom/world.topo.json';
	import centralAmericaMap from '@highcharts/map-collection/custom/central-america.topo.json';
	import northAmericaMap from '@highcharts/map-collection/custom/north-america.topo.json';

	import peoples from '$lib/data/people.json';

    import 'swiper/css';
    import Profile from '$lib/components/profile.svelte';
    import Article from '$lib/components/article.svelte';
    import { onMount } from 'svelte';
	import type { PageData } from './$types';

    let map = worldMap;
    let peoplesData = peoples;
    let mapComponent: Map;

	let swiperIndex = 0;
	let swiper: {
		[x: string]: any;
		activeIndex: number;
	};

	function onSwiper(e: any) {
		swiper = e.detail[0];
	}

	function onSwiperNext() {
		swiper.slideNext();
		swiperIndex !== missing.length && ++swiperIndex;
	}

	function onSwiperPrev() {
		swiper.slidePrev();
		swiperIndex !== 0 && --swiperIndex;
	}

	export let data: PageData;

	$: deceased = data?.deceased?.values || [];
	$: missing = data?.missing?.values || [];

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger)
        
        gsap.to(mapComponent, {
            scrollTrigger: {
                trigger: "#map-component",
                start: "top 80px",
                endTrigger: "#map-text",
                end: "bottom 80%",
                pin: true,
                pinSpacing: false,
                markers: true,
            },
        })

        gsap.to("#history-1", {
            scrollTrigger: {
                trigger: "#history-1",
                start: "top center",
                onEnter: () => {
                    map = northAmericaMap;
                    peoplesData = [{
                        name: "Fulanito Perez",
                        lat: 23.634501,
                        lon: -102.552788
                    }]
                    mapComponent.update_data(map, peoplesData)
                },
                onLeaveBack: ({progress, direction, isActive}) => {
                    map = worldMap
                    peoplesData = peoples
                    mapComponent.update_data(map, peoplesData)	
                }
            },
        })
		console.log(missing);
    })
</script>

<main class="overflow-hidden">
	<section class="section-1 flex flex-col items-center justify-center bg-accent min-h-screen">
		<div class="section-1-wrapper max-w-3xl text-center h-full flex flex-col justify-center">
			<h2
				class="flex flex-col md:flex-row justify-center items-baseline font-sans font-bold  text-light"
			>
				<span class="text-accent-dark md:mr-4 font-extrabold text-8xl">+70</span>
				<span class="text-6xl font-bold">MUERTOS</span>
			</h2>
			<h2
				class="flex flex-col md:flex-row justify-center items-baseline font-sans font-bold  text-light mt-4 mb-10"
			>
				<span class="text-accent-dark md:mr-4 font-extrabold text-8xl">+175</span>
				<span class="text-6xl font-bold">DESAPARECIDOS</span>
			</h2>
			<h2 class="font-sans font-bold text-4xl text-light">
				En la travesía de Cuba <br /> a Estados Unidos
			</h2>
		</div>
		<div class="section-1-decor w-full">
			<div class="flex justify-center items-center">
				<DecorVela height="180px" width="180px" />
				<DecorVela height="300px" width="300px" />
				<DecorVela height="180px" width="180px" />
			</div>
		</div>
	</section>
	<section class="section-2 flex flex-col items-center justify-center bg-dark min-h-screen">
		<div class="container mx-auto px-10 md:px-0 max-w-3xl">
			<h2 class="font-sans font-bold text-6xl text-light my-4 text-center">MIGRAR:</h2>
			<h2 class="font-sans font-bold text-4xl text-accent text-center">
				Una decisión de vida o muerte
			</h2>
			<p class="text-gray md:mx-20 mt-20">
				Desde enero de 2021 y durante el 2022 Cuba ha experimentado la ola migratoria más grande en,
				al menos, los últimos 60 años. Esto significa que solo entre enero de 2021 y octubre de 2022
				han llegado a las fronteras estadounidense 283 094 cubanos, según datos de Oficina de
				Aduanas y Protección Fronteriza norteamericana y los números siguen en aumento.
				<br />
				<br />
				Llegar a Estados Unidos es, desde hace mucho tiempo, la primera opción migratoria para quienes
				quieren salir de Cuba, aunque no la única. A pesar de la cercanía geográfica, el problema está
				en cómo hacerlo, pues las vías legales para obtener un visado son muy limitadas. El cierre de
				la embajada en La Habana en 2017, la pandemia y, sobre todo, la profunda crisis que se vive en
				Cuba han empujado a los migrantes a buscar vías alternativas —peligrosas e ilegales—para salir
				de la isla rumbo al norte.
				<br />
				<br />
				Aunque la mayoría de las personas llegan a su destino; para lograrlo emprenden rutas costosas
				e inseguras, con incidentes violentos o peligros naturales, se exponen a ser interceptados por
				las autoridades locales y pueden, en el camino, perderlo todo, incluso la vida. Aquí te contaremos
				las historias de quienes no lo han logrado.
			</p>
		</div>
		<div class="section-2-decor" />
	</section>
	<section class="section-3 flex flex-col items-center justify-center bg-dark h-min-screen py-20">
		<div class="container mx-auto max-w-3xl px-10 md:px-0">
			<h2 class="font-sans font-extrabold text-7xl text-accent">+72</h2>
			<h2 class="font-sans font-bold text-4xl text-light my-4">Personas fallecidas</h2>
			<p class="text-gray md:mx-20 mt-20">
				Hasta ahora hemos contabilizado 72 cubanas y cubanos fallecidos en el intento de migrar
				hacia otro país, la mayoría de ellos con destino a los Estados Unidos. Conocemos la
				identidad de 43 de ellos y sabemos que hay 20 mujeres y 25 hombres, el resto se mantiene en
				el anonimato debido a la poca transparencia que existe sobre el tema y también por medidas
				de protección de datos personales de las víctimas.
				<br />
				<br />
				Las dos principales causas de muerte han sido ahogamiento y accidentes de tránsito, lo que se
				corresponde con los tipos de migración y la formas en las que se trasladaban los migrantes de
				un punto a otro. Aunque también han fallecido personas por deshidratación, infartos, asesinato
				u otros tipos de accidentes.
				<br />
				<br />
				En el caso de los ahogamientos hay dos áreas potencialmente mortales: el Río Bravo, en la frontera
				México - Estados Unidos, sobre todo, por el cruce fronterizo ubicado en Piedras Negras, Coahuila
				y por el área de Tijuana, en Baja California; y las costas que rodean los Cayos de Florida, específicamente
				en las cercanías de Little Torch Key, Stock Island y Faro Fowey Rocks. La mayoría de los accidentes
				de tránsito sucedieron en el territorio mexicano en autopistas o carreteras centrales que conectan
				unos estados con otros. Otro punto de gran peligrosidad es el Tapón del Darién donde también
				se registran varias muertes a causa de infartos, ahogamientos o por razones desconocidas. Esta
				ruta la realizan quienes inician la travesía en un país suramericano y se ven obligados a atravesar
				la selva entre Colombia y Panamá. Sirva este espacio también como recuerdo de esas personas que
				no pudieron completar su camino.
			</p>
		</div>
	</section>
	<section class="section-4 bg-dark min-h-screen">
		<!-- <div class="container mx-auto">
			<Grid />
		</div> -->
		<Grid data={deceased} />
	</section>
	<section class="section-5 flex flex-col items-center justify-center bg-light min-h-screen pt-20">
		<div class="container mx-auto max-w-3xl px-10 md:px-0">
			<h2 class="font-sans font-extrabold text-7xl text-accent">+152</h2>
			<h2 class="font-sans font-bold text-4xl text-dark my-4">Personas Desaparecidas</h2>
			<p class="text-dark md:mx-20 mt-20">
				Un migrante se considera desaparecido cuando no se tiene noticias de su llegada pero tampoco
				existe un cuerpo que pueda confirmar la muerte. En el mejor de los casos solo están
				retenidos por las autoridades, e incluso, pueden estar bajo custodia durante meses sin que
				se sepa nada de ellos. El protocolo para la búsqueda e identificación es complejo y la
				desesperación de la familia aumenta. Por ello se recomienda a los familiares ponerse en
				contacto con las autoridades del país o la zona donde se supone desapareció la persona.
				<br />
				<br />
				Como sabemos que el proceso de búsqueda de información puede ser muy difícil ofrecemos este espacio
				para publicar los datos y tratar de ayudar a despejar la incertidumbre.
			</p>
			<div class="flex mt-20">
				<Button>Ver listado</Button>
				<div class="swiper-controls flex ml-auto">
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
							class="control {swiperIndex == missing?.length ? 'control-disabled' : ''}"
							width="48"
							height="48"
						/>
					</span>
				</div>
			</div>
			<div class="w-full mt-10">
				<Swiper
					on:swiper={onSwiper}
					lazy
					slidesPerView={1}
					spaceBetween={50}
					centeredSlides={true}
					breakpoints={{
						'768': {
							slidesPerView: 2.6,
							spaceBetween: 30,
							centeredSlides: false
						}
					}}
				>
					{#each missing?.slice(1) as p}
						<SwiperSlide>
							<Profile data={p} />
						</SwiperSlide>
					{/each}
				</Swiper>
			</div>

			<div
				class="bg-dark border-r-4 flex flex-col md:flex-row items-center -mx-10 md:-mx-0 p-10 mt-20 md:rounded-lg"
			>
				<p class="text-light text-lg md:text-sm mb-8 md:mb-0">
					Si tienes algún familiar, amigo o conocido que haya desaparecido tratando de migrar o
					conociste alguien que viajaba contigo y se ha denunciado que no llegó, escríbenos.
					Queremos que no se olvide su historia y ayudar, de acuerdo con nuestras posibilidades, a
					buscar la información que necesitan sus seres queridos.
				</p>
				<Button>Reportar desaparecido</Button>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
				<Article />
				<Article />
			</div>
		</div>
		<div class="section-5-decor mt-20" />
	</section>
    <section class="section-6 flex flex-col items-center bg-dark" id="section-map">
        <div class="grid md:grid-cols-2 flex-1 my-20 max-w-5xl px-10 md:px-0 gap-20">
            <Map map={map} data={peoplesData} bind:this={mapComponent} />
            <div id="map-text" class="block order-1 md:order-2">
                <h2 class="title">Rutas Migratorias</h2>
                <p class="text-gray">
                    Cruzar por el mar las 90 millas —o un poco más dependiendo del punto de salida— que separa
                    a Cuba de los Estados Unidos en balsas o embarcaciones rústicas es una vía usada desde
                    hace muchos por cubanas y cubanos. Durante esta nueva oleada no ha dejado de utilizarse, a
                    pesar de estar muy vigilado por las autoridades de ambas naciones y no tener ninguna
                    garantía de éxito.
                    <br /> <br />
                    Sin embargo, las rutas terrestres cruzando el Darien o partiendo desde Nicaragua, país al que
                    los cubanos pueden llegar sin necesidad de visado, y atravesando Centroamérica han resultado
                    más efectivas en este nuevo contexto.
                    <br /> <br />
                    Hemos identificados las zonas más peligrosas de estos recorridos y dónde han ocurrido mayor
                    cantidad de incidentes con migrantes cubanos.
                </p>
                <div id="history-1" class="text-gray">
                    <h2 class="title">Historia 1</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Faucibus scelerisque eleifend donec
                        pretium. Risus nec feugiat in fermentum posuere urna nec tincidunt. Sagittis id
                        consectetur purus ut faucibus pulvinar. Nulla pellentesque dignissim enim sit amet
                        venenatis urna cursus eget. Faucibus vitae aliquet nec ullamcorper sit amet risus
                        nullam. Quam id leo in vitae turpis massa. Mi eget mauris pharetra et ultrices neque
                        ornare aenean. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada
                        proin. Imperdiet sed euismod nisi porta lorem mollis aliquam ut. Fringilla ut morbi
                        tincidunt augue. Hendrerit gravida rutrum quisque non tellus. Vitae justo eget magna
                        fermentum iaculis eu non diam. Venenatis tellus in metus vulputate eu. Dignissim diam
                        quis enim lobortis scelerisque fermentum dui faucibus. Dignissim suspendisse in est ante
                        in nibh mauris cursus mattis. Vitae proin sagittis nisl rhoncus mattis. In ante metus
                        dictum at tempor commodo ullamcorper. Ornare suspendisse sed nisi lacus sed viverra. Sed
                        euismod nisi porta lorem. Convallis a cras semper auctor neque vitae tempus. Enim nunc
                        faucibus a pellentesque. Faucibus pulvinar elementum integer enim neque volutpat. Rutrum
                        tellus pellentesque eu tincidunt tortor. Maecenas accumsan lacus vel facilisis volutpat
                        est velit egestas dui. Eu scelerisque felis imperdiet proin fermentum leo vel. Morbi
                        tristique senectus et netus et.
                    </p>
                </div>
            </div>
        </div>
		<div class="section-6-decor" />
		<div class="max-w-3xl my-32">
			<p class="text-light">
				Entre enero de 2021 y noviembre de 2022 más de 8302 personas han sido repatriadas a Cuba:
				7158 desde Estados Unidos, 933 desde México, 16 desde Guatemala y 195 desde Bahamas. Han
				sido interceptados en el mar 619 y 208 rescatados por las autoridades marítimas.
				<br /><br />
				Aunque muchos consiguen llegar a su destino, la migración irregular no es una vía segura y muchas
				veces no tiene un final feliz.
			</p>
		</div>
    </section>
</main>

<style>
	:global(.swiper) {
		overflow: unset !important;
	}

	.section-1 .section-1-wrapper {
		background-image: url(/src/lib/assets/images/luz.svg);
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		height: 90vh;
	}
	.section-1 .section-1-decor {
		bottom: -100px;
		position: absolute;
	}

	.section-2 {
		padding-top: 200px;
	}
	.section-2 .section-2-decor {
		margin-top: 5rem;
		width: 100%;
		height: 300px;
		background-image: url(/src/lib/assets/images/mapa.png);
		background-size: cover;
		background-position: center;
	}

	.section-5 .section-5-decor {
		width: 100%;
		height: 350px;
		background-image: url(/src/lib/assets/images/mar.png);
		background-size: cover;
		background-position: center;
	}
	:global(.section-5 .swiper-controls .control) {
		cursor: pointer;
	}
	:global(.section-5 .swiper-controls .control.control-disabled) {
		opacity: 0.4;
	}

	.section-6 .section-6-decor {
		height: 500px;
		width: 100%;
		background-image: url(/src/lib/assets/images/rio.png);
		background-size: cover;
		background-position: center;
	}
</style>
