<script>
	import { docs } from '$lib/app';
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import FuzzySearch from 'fuzzy-search';	
	import { fade } from 'svelte/transition';

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

<div class="navigation">

</div>

<main class="main">

    <h1 class='title'>Reference</h1>

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
					<a transition:fade={{ duration: 90 }} href={r.url}>{r.title} <ArrowRight /></a>
				</li>
			</ul>
			{/each}
		</section>
		{/if}
		{/each}
	</div>

</main>

<div class="related">
    
</div>

<style>

	.main {
        grid-area: main;
        min-width: var(--min-text-width);
        max-width: var(--max-text-width);
        display: flex;
        flex-direction: column;
    }

    .navigation {
        grid-area: navigation;
        width: 25ch;
        height: max-content;
    }

    .related {
        grid-area: related;
        width: 25ch;
    }

    @media (max-width: 1200px) {
        .navigation {
            width: 100%;
        }

        .related {
            display: none;
        }
    }

	form > input {
		margin-bottom: 0.5em;
		font-size: 1.5rem;
		border: none;
		outline: none;
		border-bottom: 1px solid grey;
	}

	.container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		max-height: 550px;
	}

	@media (max-width: 750px) {
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