<script lang="ts">
	import SearchIcon from '$lib/assets/images/search.svg?component';
	import { createEventDispatcher } from 'svelte';
    import debounce from 'lodash.debounce';

	let dispatch = createEventDispatcher();

	let currentQuery = "";

	const dispatchQueryChange = (q: string) => {
		if (currentQuery == q) return;
		dispatch('search', q);
		currentQuery = q;
	};

	const onSearch = (e: any) => debounce(() => dispatchQueryChange(e.target.value), 400, { leading: false })();

</script>

<div class="search-input w-full">
	<input
		class="control w-full border border-accent rounded text-light"
		type="search"
		on:keydown={onSearch}
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
