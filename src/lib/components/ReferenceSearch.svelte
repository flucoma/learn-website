<script>
	import { info } from '$lib/app.js';
	import stringSimilarity from 'string-similarity';

	let searchTerm = '';
	let isFocused = false;
	const routes = $info.reference;
	export let result;

	function constructDistances() {
		result.forEach((r) => {
			const comparator = r.data.title.replace(/[^a-zA-Z]+/g, '').toLowerCase();
			r.similarity = stringSimilarity.compareTwoStrings(searchTerm.toLowerCase(), comparator);
		});

		result.sort((a, b) => a.similarity - b.similarity);
		return result.reverse();
	}

	function doSearch() {
		if (searchTerm === '') {
			// Dumb way to do a deep copy and make svelte trigger reactivity
			result = routes;
		} else {
			result = constructDistances();
		}
	}
</script>

<input
	class="search"
	type="text"
	bind:value={searchTerm}
	placeholder={ isFocused ? 'Type your search query...' : 'Search...'}
	on:input={doSearch}
	on:focus={ () => isFocused = true }
	on:blur={ () => isFocused = false}
/>

<style lang="scss">
	.search {
		width: 100%;
		height: 2em;
		margin-bottom: 0.5em;
		font-family: $font;
		font-size: 1.5rem;
		border-radius: 5px;
		border: 2px;
		border-color: solid $dark-blue;
	}

	.search, .search:focus {
		border: solid $dark-blue
	}
</style>
