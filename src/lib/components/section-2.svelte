<script>
	import Flag from '$lib/assets/images/section-6/flag1.webp';
	import Vela from '$lib/assets/images/section-1/vela1.svg?component';
	import Plano from '$lib/assets/images/section-1/plano.svg?component';
	import Child from '$lib/assets/images/section-6/child.webp';
</script>

<section
	id="section-2"
	class="section-2 flex flex-col items-center justify-center bg-dark min-h-screen"
>
	<div class="section-2-upper-decor">
		<Plano class="decor-plano w-full" />
		<div class="decor-candles flex justify-center items-center">
			<Vela class="decor-candles-small" />
			<Vela class="decor-candles-center" />
			<Vela class="decor-candles-small" />
		</div>
	</div>
	<div class="container mx-auto px-10 md:px-0 max-w-3xl">
		<h2 class="font-sans font-bold text-4xl md:text-6xl text-light my-4 text-center">MIGRAR:</h2>
		<h2 class="font-sans font-bold text-2xl md:text-4xl text-accent text-center">
			Una decisión de vida y muerte
		</h2>
		<p class="text-gray md:mx-20 mt-20">
			Cuba experimenta la ola migratoria más grande en los últimos 60 años. Entre enero de 2021 y
			diciembre de 2022, 368 326 cubanos llegaron de manera irregular a los Estados Unidos, según
			datos de la <a
				class="underline"
				href="https://www.cbp.gov/newsroom/stats/nationwide-encounters?1649206653428"
				target="_blank"
				rel="noreferrer">Oficina de Aduanas y Protección Fronteriza norteamericana</a
			>, y los números siguen en aumento.
			<br /><br />
			Llegar a Estados Unidos es la primera opción migratoria para quienes quieren salir de Cuba, aunque
			no la única. A pesar de la cercanía geográfica, el problema está en cómo hacerlo, pues las vías
			legales para obtener un visado han sido muy limitadas. El cierre de la Embajada en La Habana en
			2017, la pandemia y, sobre todo, la profunda crisis que se vive en Cuba han empujado a los migrantes
			a buscar vías alternativas —peligrosas e irregulares— para salir de la isla rumbo al norte.
			<br /><br />
			Aunque la mayoría de las personas llegan a su destino; para lograrlo emprenden vías costosas e
			inseguras, con incidentes violentos o peligros naturales. Se exponen a ser interceptados por las
			autoridades locales y pueden, en el camino, perderlo todo, incluso la vida.
		</p>
	</div>
	<div class="section-2-bottom-decor">
		<img src={Flag} class="decor-flag" alt="" />
		<img src={Child} class="decor-child" alt="" />
	</div>
</section>

<style>
	.section-2 {
		padding-top: 200px;
		position: relative;
	}

	.section-2 .section-2-upper-decor {
		top: -200px;
		position: absolute;
		width: 100%;
	}

	:global(.section-2 .section-2-upper-decor .decor-plano) {
		position: absolute;
		z-index: 1;
		top: 130px;
	}

	.section-2 .section-2-upper-decor .decor-candles {
		z-index: 2;
		position: relative;
	}

	:global(.section-2 .section-2-upper-decor .decor-candles .decor-candles-small) {
		width: 180px;
		height: 220px;
	}

	:global(.section-2 .section-2-upper-decor .decor-candles .decor-candles-center) {
		width: 250px;
		height: 300px;
	}

	 /* Bottom */
	.section-2 .section-2-bottom-decor {
		position: relative;
		margin-top: 5rem;
		width: 100%;
		height: 600px;
		background-image: url(/src/lib/assets/images/section-6/rio.webp);
		background-size: cover;
		background-position: center;
	}

	.section-2 .section-2-bottom-decor .decor-flag,
    /* .section-6 .section-6-decor .decor-sign, */
	.section-2 .section-2-bottom-decor .decor-child {
		position: absolute;
	}

	.section-2 .section-2-bottom-decor .decor-flag {
		height: 500px;
		top: calc(50% - 250px);
		left: calc(50% - 500px);
		z-index: 2;
	}

	/* .section-6 .section-6-decor .decor-sign {
        width: 160px;
    } */

	.section-2 .section-2-bottom-decor .decor-child {
		width: 530px;
		left: calc(50% - 175px);
		top: calc(50% - 160px);
		transform: rotate(-15deg);
	}


	@media (max-width: 768px) {
		.section-2 .section-2-bottom-decor .decor-child {
			left: -50px;
			top: calc(50% - 125px);
		}
		.section-2 .section-2-bottom-decor .decor-flag {
			top: 5%;
			height: 300px;
			left: unset;
			right: 5%;
		}
	}
</style>
