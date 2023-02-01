<script>
    import { createEventDispatcher, onDestroy } from "svelte";
	import Button from "./button.svelte";

    const dispatch = createEventDispatcher()
    const close = () => dispatch('close')

    let modal

    const handle_keydown = e => {
        if (e.key == "Escape") {
            close()
            return
        }
    }

</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal bg-dark bg-opacity-100 text-gray w-full h-full flex justify-center" role="dialog" aria-modal="true" bind:this={modal}>
    <form action="post" class="flex flex-col max-w-lg">
        <button on:click={close} type="button" class="close absolute right-4 top-4">X</button>
        <label>
            <span>
                Nombre del desaparecido
            </span>
            <input type="text" required>
        </label>
        <label>
            <span>
                Nombre del denunciante
            </span>
            <input type="text" required>
        </label>
        <div class="flex flex-nowrap flex-row">
            <label class="flex flex-col w-2/3 mr-2">
                <span>
                    Email
                </span>
                <input type="email" name="email" id="email" required>
            </label>
            <label class="flex flex-col w-1/3">
                <span>
                    Teléfono
                </span>
                <input type="tel">
            </label>
        </div>
        <label>
            <span>
                Mensaje
            </span>
            <textarea name="message" id="message" cols="30" rows="3" required></textarea>
        </label>
        <Button buttonType="submit" classes="mt-2">Enviar</Button>
    </form>
</div>

<style>
    input, textarea {
        border: 1px solid white;
        background: inherit;
        @apply rounded-md;
    }

    label:has(> input[required], > textarea[required]) span::after {
        content: "*";
        color: rgb(120, 86, 255);
    }

    .modal {
        position: absolute;
        left: 0;
        top: 0;
        overflow: auto;
        padding: 1rem;
    }

    .modal form > label {
        @apply flex flex-col my-2;
    }

    button.close {
        @apply bg-gray w-8 h-8 rounded-full text-dark font-extrabold;
    }
</style>