<script lang="ts">
    import { createEventDispatcher, onDestroy } from "svelte";
	import Button from "./button.svelte";

    const dispatch = createEventDispatcher()
    const close = () => dispatch('close')

    let modal

    export let info: any[] = [];

    const handle_keydown = (e: { key: string; }) => {
        if (e.key == "Escape") {
            close()
            return
        }
    }

    const handleSubmit = (e: any) => {
        const formData = new FormData(e.target)
        const data: any = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        console.log(data)
    }

</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal bg-dark bg-opacity-100 text-gray w-screen h-screen flex justify-center" role="dialog" aria-modal="true" bind:this={modal}>
    <form method="post" class="flex flex-col max-w-lg mt-8" on:submit|preventDefault={handleSubmit}>
        <button on:click={close} type="button" class="close absolute right-4 top-4">X</button>
        <label>
            <span>
                Nombre del desaparecido
            </span>
            <input type="text" required name="missing_name" value="{info[3]}">
        </label>
        <label>
            <span>
                Nombre del denunciante
            </span>
            <input type="text" required name="complainant_name">
        </label>
        <div class="flex flex-nowrap flex-col md:flex-row">
            <label class="flex flex-col w-full md:w-2/3 mr-2">
                <span>
                    Email
                </span>
                <input type="email" name="email" id="email" required>
            </label>
            <label class="flex flex-col w-full md:w-1/3">
                <span>
                    Teléfono
                </span>
                <input type="tel" name="phone_number">
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
        position: fixed;
        left: 0;
        top: 0;
        overflow: auto;
        padding: 1rem;
        z-index: 999;
    }

    .modal form > label {
        @apply flex flex-col my-2;
    }

    button.close {
        @apply bg-gray w-8 h-8 rounded-full text-dark font-extrabold;
    }
</style>