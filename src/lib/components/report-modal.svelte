<script>
	// @ts-nocheck
	import NProgress from 'nprogress';
	import { createEventDispatcher } from 'svelte';
	import Button from './button.svelte';
	import X from '$lib/assets/images/x.svg?component';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
	const submitCallback = (isError) => dispatch('submit', { isError });

	let modal;
	export let isMissing = true;
	export let name = '';

	const handle_keydown = (/** @type {{ key: string; }} */ e) => {
		if (e.key == 'Escape') {
			close();
			return;
		}
	};

	async function handleSubmit(/** @type {{ target: HTMLFormElement | undefined; }} */ e) {
		NProgress.start();
		const data = new FormData(this);
		let isError = false;
		const response = await fetch('/contact', { method: 'POST', body: data });
		if (!response.ok) {
			isError = true;
			console.error('Error enviando el formulario', response.statusText)
		}
		NProgress.done();
		submitCallback(isError);
		close();
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<div
	class="modal bg-dark bg-opacity-100 text-gray w-full h-full flex flex-col items-center justify-center"
	role="dialog"
	aria-modal="true"
	bind:this={modal}
>
	<form
		method="post"
		class="flex flex-col justify-center max-w-xl w-full"
		on:submit|preventDefault={handleSubmit}
	>
		<input type="hidden" value={isMissing} name="is_missing" />
		<button on:click={close} type="button" class="close absolute right-4 top-4">
			<X width="32" height="32" />
		</button>
		<label class="flex flex-col mb-2 mt-10 md:mt-0">
			<span class="mb-2 italic text-sm"
				>Nombre del {isMissing ? 'desaparecido' : 'fallecido'} <em class="text-accent">*</em></span
			>
			<input type="text" required name="person_name" value={name} />
		</label>
		<label class="flex flex-col mb-4">
			<span class="mb-2 italic text-sm">
				Nombre de quien reporta <em class="text-accent">*</em></span
			>
			<input type="text" required name="contact_name" />
		</label>
		<div class="flex flex-nowrap flex-col md:flex-row mb-2">
			<label class="flex flex-col w-full md:w-2/3 mr-5">
				<span class="mb-2 italic text-sm"> Email <em class="text-accent">*</em> </span>
				<input type="email" name="email" id="email" required />
			</label>
			<label class="flex flex-col w-full md:w-1/3">
				<span class="mb-2 italic text-sm"> Teléfono </span>
				<input type="tel" name="phone" />
			</label>
		</div>
		<label class="flex flex-col">
			<span class="mb-2 italic text-sm"> Mensaje <em class="text-accent">*</em></span>
			<textarea name="message" id="message" cols="30" rows="5" required />
		</label>
		<Button buttonType={'submit'} classes="mt-8">Enviar</Button>
	</form>
	<a class="mt-auto text-center text-accent" href="mailto:audiencias@eltoque.com">audiencias@eltoque.com</a>
</div>

<style>
	input,
	textarea {
		border: 1px solid white;
		background: inherit;
		min-height: 54px;
		@apply rounded-md;
	}

	/* label:has(> input[required], > textarea[required]) span::after {
		content: '*';
		color: rgb(120, 86, 255);
	} */

	.modal {
		position: fixed;
		left: 0;
		top: 0;
		overflow: auto;
		padding: 1rem;
		z-index: 40;
	}

	button.close {
		@apply bg-gray w-9 h-9 rounded-full text-dark font-extrabold flex items-center justify-center;
	}
</style>
