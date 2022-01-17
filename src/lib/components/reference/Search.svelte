<script lang="ts">
	import { docs } from '$lib/app.js';
	import FuzzySearch from 'fuzzy-search';

	export let result = [];

	let query: string = '';
	let isFocused: boolean = false;

	const references = docs.filter(d => d.section === 'reference');

	const referenceSearch = new FuzzySearch(references, ['title', 'tags', 'blurb'], {
		caseSensitive: false,
		sort: true
	});

	// Send out an initial search with no constraints to update the parents props.
	result = referenceSearch.search('');

	function doSearch() {
		result = referenceSearch.search(query);
		console.log(result)
	}
</script>

<input
	class="search"
	type="text"
	placeholder={isFocused ? 'Type your search query...' : 'Search...'}
	bind:value={query}
	on:input={doSearch}
	on:focus={() => (isFocused = true)}
	on:blur={() => (isFocused = false)}
/>

<style lang="postcss">
	.search {
		height: 2em;
		margin-bottom: 0.5em;
		font-family: var(--font);
		font-size: 1.5rem;
		border-radius: 5px;
		border: 2px;
		border-color: solid var(--med-blue);
	}

	.search,
	.search:focus {
		border: solid var(--med-blue);
	}
</style>
