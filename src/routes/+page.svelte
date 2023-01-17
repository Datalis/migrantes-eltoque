<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Grid from '$lib/components/grid.svelte';
	import Timeline from '$lib/components/timeline.svelte';

	import { Swiper, SwiperSlide } from 'swiper/svelte';

	import 'swiper/css';
	import Profile from '$lib/components/profile.svelte';
	import Article from '$lib/components/article.svelte';
</script>

<main class="overflow-hidden">
	<section class="section-1 flex flex-col items-center justify-center bg-dark h-screen">
		<div class="max-w-3xl text-center">
			<h2 class="font-sans font-bold text-4xl text-light">
				<span class="text-accent">+70</span> MUERTOS
			</h2>
			<h2 class="font-sans font-bold text-4xl text-light my-4">
				<span class="text-accent">+152</span> DESAPARECIDOS
			</h2>
			<h2 class="font-sans font-bold text-4xl text-light mb-4">
				Tratando de llegar de Cuba <br/> a los Estados Unidos
			</h2>
			<span class="text-accent text-sm font-medium">2021-2022</span>
		</div>
	</section>
	<section class="section-2 flex flex-col items-center justify-center bg-dark h-screen">
		<div class="container mx-auto max-w-3xl">
			<h2 class="font-sans font-bold text-4xl text-light">CUBA - EEUU</h2>
			<h2 class="font-sans font-bold text-4xl text-accent my-4">MIGRAR:</h2>
			<h2 class="font-sans font-bold text-4xl text-accent">Una decisión de vida o muerte</h2>
			<p class="text-gray mx-20 mt-10">
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
	</section>
	<section class="section-3 flex flex-col items-center justify-center bg-dark h-screen">
		<div class="container mx-auto max-w-3xl">
			<h2 class="font-sans font-extrabold text-6xl text-accent">+72</h2>
			<h2 class="font-sans font-bold text-4xl text-light my-4">Personas fallecidas</h2>
			<p class="text-gray mx-20 mt-10">
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
		<Grid />
	</section>
	<section class="section-5 flex flex-col items-center justify-center bg-light min-h-screen py-20">
		<div class="container mx-auto max-w-3xl">
			<h2 class="font-sans font-extrabold text-6xl text-accent">+152</h2>
			<h2 class="font-sans font-bold text-4xl text-dark my-4">Personas Desaparecidas</h2>
			<p class="text-dark mx-20 mt-10">
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
				<div class="swiper-controls" />
			</div>
			<div class="w-full mt-10">
				<Swiper slidesPerView={2.2} spaceBetween={30} centeredSlides={false}>
					<SwiperSlide>
						<Profile />
					</SwiperSlide>
					<SwiperSlide>
						<Profile />
					</SwiperSlide>
					<SwiperSlide>
						<Profile />
					</SwiperSlide>
					<SwiperSlide>
						<Profile />
					</SwiperSlide>
					<SwiperSlide>
						<Profile />
					</SwiperSlide>
					<SwiperSlide>
						<Profile />
					</SwiperSlide>
					<SwiperSlide>
						<Profile />
					</SwiperSlide>
				</Swiper>
			</div>

			<div class="bg-dark border-r-4 flex items-center p-10 mt-20 rounded-lg">
				<p class="text-light text-sm">
					Si tienes algún familiar, amigo o conocido que haya desaparecido tratando de migrar o
					conociste alguien que viajaba contigo y se ha denunciado que no llegó, escríbenos.
					Queremos que no se olvide su historia y ayudar, de acuerdo con nuestras posibilidades, a
					buscar la información que necesitan sus seres queridos.
				</p>
				<Button>Reportar desaparecido</Button>
			</div>

			<p class="text-dark mx-20 my-20">
				Te mostramos la distribución del presupuesto regional durante los años 2010 al 2021. Puedes
				observar tanto el gasto presupuestado total, como el presupuesto por habitante. También
				puedes ver las cantidades por área funcional, como por ejemplo Sanidad, referidas a cada
				región o a todo el territorio nacional. Ten en cuenta que algunas comunidades autónomas
				tienen competencias que otras no tienen -pasa, por ejemplo, en Justicia, que en ocasiones
				está transferida y en otras no-, por Te mostramos la distribución del presupuesto regional
				durante los años 2010 al 2021. Puedes observar tanto el gasto presupuestado total, como el
				presupuesto por habitante. También puedes ver las cantidades por área funcional, como por
				ejemplo Sanidad, referidas a cada región o a todo el territorio nacional. Ten en cuenta que
				algunas comunidades autónomas tienen competencias que otras no tienen -pasa, por ejemplo, en
				Justicia, que en ocasiones está transferida y en otras no-, por lo que el gasto total no es
				comparable sin tener en cuenta esas diferencias.lo que el gasto total no es comparable sin
				tener en cuenta esas diferencias.
			</p>

			<div class="grid grid-cols-2 gap-10">
				<Article />
				<Article />
			</div>
		</div>
	</section>
	<section class="section-4 flex flex-col items-center bg-dark min-h-screen">
		<div class="grid grid-cols-2 flex-1 my-20 max-w-5xl gap-20">
			<img src="" alt="" class="map bg-accent w-full h-full rounded-2xl" />
			<div class="flex flex-col justify-center">
				<h2 class="text-4xl font-bold mb-10 text-light">Rutas Migratorias</h2>
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
			</div>
		</div>
	</section>
</main>

<style>
	:global(.swiper) {
		overflow: unset !important;
	}
</style>
