<script lang="ts">
	import SearchIcon from '$lib/assets/images/search.svg?component';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import debounce from 'lodash.debounce';

	export let placeholder: string = '';
	export let value: string = '';

	let dispatch = createEventDispatcher();

	let currentQuery = value;

	const dispatchQueryChange = (q: string) => {
		if (currentQuery == q) return;
		currentQuery = q;
		dispatch('search', q);
	};

	// Un único debounce a nivel de componente. Crear uno nuevo por pulsación
	// (debounce(...)()) no cancela el anterior: sería un retraso de 400 ms por
	// tecla, no un debounce.
	const onSearch = debounce(dispatchQueryChange, 400, { leading: false });

	// Que no quede un dispatch pendiente si se navega antes de que expire.
	onDestroy(() => onSearch.cancel());
</script>

<div class="search-input w-full">
	<input
		{placeholder}
		{value}
		class="control w-full border border-accent rounded text-light"
		type="search"
		on:input={(e) => onSearch(e.currentTarget.value)}
	/>
	<div class="icon">
		<SearchIcon fill="#7856ff" />
	</div>
</div>

<style>
	.search-input {
		position: relative;
	}
	.search-input .icon {
		position: absolute;
		right: 12px;
		top: 0;
		bottom: 0;
		margin: auto;
		height: 24px;
	}
	.search-input .control {
		background-color: transparent;
	}
	.search-input .control:focus {
		--tw-ring-color: #7856ff;
		border-color: #7856ff;
	}
</style>
