<script>
	// @ts-ignore
	import Flag from '$lib/assets/images/section-6/flag1.webp?webp';
	import VelaImg from '$lib/assets/images/section-1/vela1.webp';
	import Plano from '$lib/assets/images/section-1/plano.svg?component';
	// @ts-ignore
	import Child from '$lib/assets/images/section-6/child.webp?w=600&webp';
</script>

<svelte:head>
	<link rel="preload" as="image" href={VelaImg} />
</svelte:head>

<section
	id="section-2"
	class="section-2 flex flex-col items-center justify-center bg-dark min-h-screen"
>
	<div class="section-2-upper-decor">
		<Plano class="decor-plano w-full" />
		<!-- svelte-ignore a11y-missing-attribute -->
		<div class="decor-candles flex justify-center items-center">
			<!-- svelte-ignore a11y-missing-attribute -->
			<img class="decor-candles-small object-contain" src={VelaImg} />
			<!-- svelte-ignore a11y-missing-attribute -->
			<img class="decor-candles-center md:mx-4 object-contain" src={VelaImg} />
			<img class="decor-candles-small object-contain" src={VelaImg} />
		</div>
	</div>
	<div class="container mx-auto px-10 md:px-0 max-w-3xl">
		<h2 class="font-sans font-semibold text-4xl md:text-6xl text-light my-4 text-center">MIGRAR:</h2>
		<h2 class="font-sans font-semibold text-2xl md:text-4xl text-accent text-center">
			Una decisión de vida y muerte
		</h2>
		<p class="text-gray mt-10">
			Desde enero de 2021, miles de cubanas y cubanos han emprendido una peligrosa
			travesía hacia los Estados Unidos; algunos por mar, otros por tierra, protagonizando el
			éxodo más grande de los últimos 60 años. Aunque la mayoría ha logrado su objetivo, la
			emigración no siempre termina con un final feliz.
			<br /><br />
			De quienes no llegan, porque mueren o desaparecen en el intento, se habla poco. Sus nombres, muchas
			veces desconocidos, se diluyen en estadísticas imprecisas. Sin embargo, detrás de los números hay
			familias que sufren, historias truncadas y sueños incompletos.
			<br />
			<br />
			Durante más de un año, hemos realizado un seguimiento de los artículos de prensa, reportes oficiales
			e informales y publicaciones en redes sociales sobre diferentes eventos migratorios para hacer
			una base de datos que además compila identidades de personas fallecidas y desaparecidas en sus
			travesías migratorias de Cuba a Estados Unidos.
			<br />
			<br />
			Sabemos que contar las víctimas de este drama humano y ponerles rostro no las devolverá; pero nos
			permitirá, como sociedad, no olvidar. Queremos que este espacio de memoria y tributo sirva de ayuda
			y acompañamiento a los familiares que continúan su búsqueda.
		</p>
	</div>
	<div class="section-2-bottom-decor">
		<img src={Flag} class="decor-flag" alt="" loading="lazy" />
		<img src={Child} class="decor-child" alt="" loading="lazy" />
	</div>
</section>

<style>
	.section-2 {
		padding-top: 200px;
		position: relative;
	}

	.section-2 .section-2-upper-decor {
		top: -260px;
		position: absolute;
		width: 100%;
	}

	:global(.section-2 .section-2-upper-decor .decor-plano) {
		position: absolute;
		z-index: 1;
		top: 180px;
		height: auto;
	}

	@media (max-width: 768px) {
		.section-2 .section-2-upper-decor {
			top: -200px;
		}
		:global(.section-2 .section-2-upper-decor .decor-plano) {
			display: none;
		}

		.section-2 .section-2-upper-decor .decor-candles .decor-candles-small {
			width: 100px !important;
			height: 240px !important;
		}

		.section-2 .section-2-upper-decor .decor-candles .decor-candles-center {
			width: 170px !important;
			height: 330px !important;
		}
	}

	@media (max-height: 768px) {
		.section-2 .section-2-upper-decor {
			top: -180px;
		}

		:global(.section-2 .section-2-upper-decor .decor-plano) {
			top: 140px;
		}

		.section-2 .section-2-upper-decor .decor-candles .decor-candles-small {
			width: 160px !important;
			height: 200px !important;
		}

		.section-2 .section-2-upper-decor .decor-candles .decor-candles-center {
			width: 230px !important;
			height: 270px !important;
		}
	}

	.section-2 .section-2-upper-decor .decor-candles {
		z-index: 2;
		position: relative;
	}

	.section-2 .section-2-upper-decor .decor-candles .decor-candles-small {
		width: 200px;
		height: 240px;
	}

	.section-2 .section-2-upper-decor .decor-candles .decor-candles-center {
		width: 280px;
		height: 330px;
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
