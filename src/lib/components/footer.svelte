<script>
	import Button from '$lib/components/button.svelte';
	import DeFactoLogo from '$lib/assets/images/defacto.svg?component';
	import ElToqueLogo from '$lib/assets/images/eltoque.svg?component';
	import CollectivoLogo from '$lib/assets/images/colectivo+voces.svg?component';
	import FacebookIcon from '$lib/assets/images/facebook.svg?component';
	import XIcon from '$lib/assets/images/x-twitter.svg?component';
	import TelegramIcon from '$lib/assets/images/telegram.svg?component';

	/**
	 * @type {any}
	 */
	export let published_at;
	/**
	 * @type {any}
	 */
	export let updated_at;
</script>

<footer class="footer bg-accent">
	<div class="max-w-4xl pt-10 md:py-20 mx-auto">
		<div class="flex flex-col md:flex-row items-center">
			<a href="http://eltoque.com" target="_blank" rel="noreferrer"
				><ElToqueLogo class="logo mb-4 md:mb-0" width="120" /></a
			>
			<span class="dot mx-5 my-4" />
			<a href="http://defacto.eltoque.com" target="_blank" rel="noreferrer"
				><DeFactoLogo class="logo" width="120" /></a
			>
			<span class="dot mx-5 my-4" />
			<a href="http://sumavoces.org" target="_blank" rel="noreferrer"
				><CollectivoLogo class="logo mt-4 md:mt-0" width="120" height="50" /></a
			>

			<div class="hidden ml-auto md:flex">
				<!-- Sharingbutton Facebook -->
				<a
					class="social-icon"
					href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Flatravesia.eltoque.com%2F"
					target="_blank"
					rel="noopener noreferrer"
					aria-label=""
				>
					<FacebookIcon fill="#fefefe" width="28" height="28" />
				</a>

				<!-- Sharingbutton Twitter -->
				<a
					class="social-icon mx-4"
					href="https://twitter.com/intent/tweet/?url=https%3A%2F%2Flatravesia.eltoque.com%2F"
					target="_blank"
					rel="noopener noreferrer"
					aria-label=""
				>
					<XIcon fill="#fefefe" width="28" height="28" />
				</a>

				<!-- Sharingbutton Telegram -->
				<a
					class="social-icon"
					href="https://telegram.me/share/url?url=https%3A%2F%2Flatravesia.eltoque.com%2F"
					target="_blank"
					rel="noopener noreferrer"
					aria-label=""
				>
					<TelegramIcon fill="#fefefe" width="28" height="28" />
				</a>
			</div>
		</div>
		<div class="flex flex-col md:flex-row items-center md:items-start mt-14">
			<div class="flex flex-col flex-1 items-center md:items-start mb-10 md:mb-0 px-4 md:px-0">
				<span class="text-light font-semibold flex flex-col md:flex-row items-center leading-loose"
					>Coordinación editorial: <span class="font-light ml-0 md:ml-2"
						>Jessica Dominguez Delgado</span
					></span
				>
				<span class="text-light font-semibold flex flex-col md:flex-row items-center leading-loose"
					>Compilación y análisis de datos: <span class="font-light ml-0 md:ml-2"
						>Aleiny Sánchez Marínez</span
					></span
				>
				<span class="text-light font-semibold flex flex-col md:flex-row items-center leading-loose"
					>Coordinación de Marketing: <span class="font-light ml-0 md:ml-2"
						>Roberto Pablo Jiménez</span
					></span
				>
				<span class="text-light font-semibold flex flex-col md:flex-row items-center leading-loose"
					>Gestión de información y comunidades: <span class="font-light ml-0 md:ml-2"
						>Loraine Morales Pino</span
					></span
				>
				<span class="text-light font-semibold flex flex-col md:flex-row items-center leading-loose"
					>Diseño: <span class="font-light ml-0 md:ml-2">Janet Aguilar (Catao Studio)</span></span
				>

				<span class="text-light font-semibold flex flex-col md:flex-row items-center leading-loose"
					>Programación: <a
						href="http://datalis.dev"
						target="_blank"
						rel="noreferrer"
						class="font-light ml-0 md:ml-2">Datalis</a
					></span
				>

				<span
					class="text-light font-semibold leading-loose flex flex-col md:flex-row items-center mt-8"
				>
					Fecha de publicación: <span class="font-light ml-0 md:ml-2">{published_at}</span>
				</span>
				<span
					class=" text-light font-semibold leading-loose flex flex-col md:flex-row items-center"
				>
					Fecha de actualización: <span class="font-light ml-0 md:ml-2">{updated_at}</span>
				</span>

				<a
					download
					href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTSm3z6JsEWDvnC2-nHDVIkpqvOMq_J3_IltrEPXhtNvjsLunEJ8qM-517CvhrUcmipZT8LArPQZtjH/pub?output=xlsx"
				>
					<Button type="bordered" color="light" classes="text-light mt-10"
						>Descarga la base de datos</Button
					>
				</a>
			</div>
			<nav
				class="flex flex-col items-center md:items-end bg-dark md:bg-accent w-full md:w-auto md:py-0 py-5"
			>
				<a href="/" class="text-light leading-loose">Inicio</a>
				<a href="/fallecidos" class="text-light leading-loose">Listado de Fallecidos</a>
				<a href="/desaparecidos" class="text-light leading-loose">Listado de Desaparecidos</a>
				<div class="md:hidden md:ml-auto flex mt-10">
					<a
						class="social-icon"
						href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Flatravesia.eltoque.com%2F"
						target="_blank"
						rel="noopener noreferrer"
						aria-label=""
					>
						<FacebookIcon fill="#e0e0e0" width="32" height="32" />
					</a>

					<!-- Sharingbutton Twitter -->
					<a
						class="social-icon mx-4"
						href="https://twitter.com/intent/tweet/?url=https%3A%2F%2Flatravesia.eltoque.com%2F"
						target="_blank"
						rel="noopener noreferrer"
						aria-label=""
					>
						<XIcon fill="#e0e0e0" width="32" height="32" />
					</a>

					<!-- Sharingbutton Telegram -->
					<a
						class="social-icon"
						href="https://telegram.me/share/url?url=https%3A%2F%2Flatravesia.eltoque.com%2F"
						target="_blank"
						rel="noopener noreferrer"
						aria-label=""
					>
						<TelegramIcon fill="#e0e0e0" width="32" height="32" />
					</a>
				</div>
			</nav>
		</div>
	</div>
</footer>

<style>
	.footer .dot {
		width: 8px;
		height: 8px;
		background-color: #fefefe;
		border-radius: 50%;
	}
	.footer .social-icon {
		border: 1px solid #fefefe;
		border-radius: 50%;
		width: 42px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	:global(.footer .logo path) {
		fill: #fefefe;
	}
</style>
