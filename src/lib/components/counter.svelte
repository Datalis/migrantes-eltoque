<script lang="js">
	import { inViewport } from "$lib/utils";
    import { circOut } from 'svelte/easing';

    export let amount = 0;
    export let threshold = 30;
    export let delay = 100;

    let visible = false;

    /**
	 * @param {HTMLSpanElement} node
	 * @param {{ amount: number; delay: number }} [params]
	 */
    function counter(node, params) {
        return {
            duration: 3000,
            easing: circOut,
            // @ts-ignore
            delay: params.delay || 0,
            tick: (/** @type {number} */ t) => {
                // @ts-ignore
                let n = amount * t;
                let r2 = amount - (amount - threshold);
                let r = Math.floor(((n * r2) / amount) + (amount - threshold));
                node.textContent = `+${r}`;
            }
        }
    }

</script>

<div use:inViewport on:enter={() => visible=true}>
    <i class="invisible">+{amount}</i>
    {#if visible}
        <span in:counter={{amount, delay}}>{amount}</span>
    {:else}
        <span>+{amount - threshold}</span>    
    {/if}
</div>

<style>
    div {
        position: relative;
    }
    div > span {
        position: absolute;
        left: 0;
        top: 0;
    }
</style>