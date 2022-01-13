<script>
	import { docs } from '$lib/app';
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import FuzzySearch from 'fuzzy-search';	

	let references = docs.filter(d => d.section === 'reference');

	let categorised = {
		'Analyse Data' : [],
		'Analyse Sound' : [],
		'Utility' : [],
		'Decompose' : [],
		'Slicing' : [],
		'Transform' : []
	}

	references.forEach(r => { categorised[r.category].push(r) });

	let query = ''
	const search = new FuzzySearch(references, ['title', 'tags', 'blurb', 'category'], {
		caseSensitive: false,
		sort: true
	})

	function doSearch() {
		const searchResult = search.search(query);

		// Clear categorised table
		Object.keys(categorised).forEach(c => {
			categorised[c] = [];
		});

		searchResult.forEach(r => { categorised[r.category].push(r) });
	}
</script>

<h1>Reference</h1>
<p>
	This section of the learn platform outlines each algorithm of the Fluid Corpus Manipulation toolbox. The aim of these outlines is to help you develop a fundamental understanding of the algorithms themselves while also nurturing a musical intuition for how it might be used and applied to creative problems and goals. Use the search box below to search for a specific algorithm.
</p>

<form>
	<label class="visually-hidden" for="query"></label>
	<input 
	bind:value={query} 
	on:input={doSearch}
	placeholder='Enter a search term'
	>
</form>

<div class="container">
	{#each Object.entries(categorised) as [category, ref]}
	{#if ref.length > 0}
	<section>
		<h3>{ category }</h3>
		{#each ref as r}
		<ul>
			<li>
				<a href={r.url}>{r.title} <ArrowRight /></a>
			</li>
		</ul>
		{/each}
	</section>
	{/if}
	{/each}
</div>

<style>
	form > input {
		margin-bottom: 1em;
		font-size: 1.5rem;
		border: none;
		outline: none;
		border-bottom: 1px solid grey;
	}

	.container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		max-height: 620px;
	}

	@media (max-width: 500px) {
		.container {
			max-height: 1000px;
		}
	}

	section {
		width: max-content;
	}

	section > h3 {
		margin-top: 0.25em;
		margin-bottom: 0.25em;
	}

	section ul {
		margin: 0;
		padding: 0;
	}

	section ul li {
		display: block;
		margin: 0;
	}

	section ul li a {
		text-decoration: none;
		display: grid;
		grid-template-columns: auto auto;
		place-items: center;
		gap: 0.125em;
	}
</style>






