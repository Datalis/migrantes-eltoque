<script>
	import Button from '$lib/components/button.svelte';
	import DeFactoLogo from '$lib/assets/images/defacto.svg?component';
	import ElToqueLogo from '$lib/assets/images/eltoque.svg?component';
	import CollectivoLogo from '$lib/assets/images/colectivo+voces.svg?component';
	import FacebookIcon from '$lib/assets/images/facebook.svg?component';
	import TwitterIcon from '$lib/assets/images/twitter.svg?component';
	// import InstagramIcon from '$lib/assets/images/instagram.svg?component';
	import TelegramIcon from '$lib/assets/images/telegram.svg?component';
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
					href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io"
					target="_blank"
					rel="noopener noreferrer"
					aria-label=""
				>
					<FacebookIcon fill="#e0e0e0" width="28" height="28" />
				</a>

				<!-- Sharingbutton Twitter -->
				<a
					class="social-icon mx-4"
					href="https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io"
					target="_blank"
					rel="noopener noreferrer"
					aria-label=""
				>
					<TwitterIcon fill="#e0e0e0" width="28" height="28" />
				</a>

				<!-- Sharingbutton Telegram -->
				<a
					class="social-icon"
					href="https://telegram.me/share/url?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io"
					target="_blank"
					rel="noopener noreferrer"
					aria-label=""
				>
					<TelegramIcon fill="#e0e0e0" width="28" height="28" />
				</a>
			</div>
		</div>
		<div class="flex flex-col md:flex-row items-center md:items-start mt-14">
			<div class="flex flex-col flex-1 items-center md:items-start mb-10 md:mb-0 px-4">
				<span class="text-gray font-bold flex flex-col md:flex-row items-center leading-loose"
					>Coordinación editorial: <span class="font-light ml-0 md:ml-2"
						>Jessica Dominguez Delgado</span
					></span
				>
				<span class="text-gray font-bold flex flex-col md:flex-row items-center leading-loose"
					>Compilación y análisis de datos: <span class="font-light ml-0 md:ml-2"
						>Equipo DeFacto</span
					></span
				>
				<span class="text-gray font-bold flex flex-col md:flex-row items-center leading-loose"
					>Coordinación de Marketing: <span class="font-light ml-0 md:ml-2"
						>Roberto Pablo Jiménez</span
					></span
				>
				<span class="text-gray font-bold flex flex-col md:flex-row items-center leading-loose"
					>Diseño: <span class="font-light ml-0 md:ml-2">Janet Aguilar (Catao Studio)</span></span
				>
				<span class="text-gray font-bold flex flex-col md:flex-row items-center leading-loose"
					>Programación: <a
						href="http://datalis.dev"
						target="_blank"
						rel="noreferrer"
						class="font-light ml-0 md:ml-2">Datalis</a
					></span
				>
				<Button type="bordered" color="gray" classes="text-gray mt-10"
					>Descarga la base de datos</Button
				>
			</div>
			<nav
				class="flex flex-col items-center md:items-end bg-dark md:bg-accent w-full md:w-auto md:py-0 py-5"
			>
				<a href="/" class="text-light leading-loose">Inicio</a>
				<a href="/fallecidos" class="text-light leading-loose">Listado de Fallecidos</a>
				<a href="/desaparecidos" class="text-light leading-loose">Listado de Desparecidos</a>
				<div class="md:hidden md:ml-auto flex mt-10">
					<a
						class="social-icon"
						href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io"
						target="_blank"
						rel="noopener noreferrer"
						aria-label=""
					>
						<FacebookIcon fill="#e0e0e0" width="32" height="32" />
					</a>

					<!-- Sharingbutton Twitter -->
					<a
						class="social-icon mx-4"
						href="https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io"
						target="_blank"
						rel="noopener noreferrer"
						aria-label=""
					>
						<TwitterIcon fill="#e0e0e0" width="32" height="32" />
					</a>

					<!-- Sharingbutton Telegram -->
					<a
						class="social-icon"
						href="https://telegram.me/share/url?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io"
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
		background-color: #e0e0e0;
		border-radius: 50%;
	}
	.footer .social-icon {
		border: 1px solid #e0e0e0;
		border-radius: 50%;
		width: 42px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	:global(.footer .logo path) {
		fill: #e0e0e0;
	}
</style>
