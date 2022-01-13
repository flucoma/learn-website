<script>
	import { docs } from '$lib/app';
	import ArrowRight from '$lib/components/ArrowRight.svelte';

	let references = docs.filter(d => d.section === 'reference');

	const categorised = {
		'Analyse Data' : [],
		'Analyse Sound' : [],
		'Slicing' : [],
		'Decompose' : [],
		'Utility' : [],
		'Transform' : []
	}

	references.forEach(r => { categorised[r.category].push(r) });
</script>

<h1>Reference</h1>
<p>
	This section of the learn platform outlines each algorithm of the Fluid Corpus Manipulation toolbox. The aim of these outlines is to help you develop a fundamental understanding of the algorithms themselves while also nurturing a musical intuition for how it might be used and applied to creative problems and goals. Use the search box below to search for a specific algorithm.
</p>

<div class="container">
	{#each Object.entries(categorised) as [category, ref]}
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
	{/each}
</div>

<style>
	.container {
		column-count: 3;
		column-gap: 1em;
		gap: 1.5em;
	}

	section {
		margin: 0;
		display: grid;
		grid-template-rows: 1fr auto;
		margin-bottom: 0.125em;
		break-inside: avoid;
		grid-row: 1 / -1;
  		grid-column: 1;
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






