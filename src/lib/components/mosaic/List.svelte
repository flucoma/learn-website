<!-- 
This component abstracts the rendering process for each "card" in madewith and overview sections.
References are slightly different and use the ReferenceEntry component.
-->
<script>
	import { docs } from '$lib/app.js';
	import Article from '$lib/components/mosaic/Article.svelte';
	export let section = 'learn';

	const items = docs.filter((x) => x.section === section);
</script>

<div class="overview-list">

	<div class="list_col">
		{#each items as item, i}
			{#if i % 3 == 0}
				<Article data={item}/>
			{/if}
		{/each}
	</div>

	<div class="list_col">
		{#each items as item, i}
			{#if i % 3 == 1}
				<Article data={item}/>
			{/if}
		{/each}
	</div>

	<div class="list_col">
		{#each items as item, i}
			{#if i % 3 == 2}
				<Article data={item}/>
			{/if}
		{/each}
	</div>


</div>

<style lang="postcss">

	.list_col{
		width: 100%;
	}

	.overview-list {
		display: grid;
		grid-gap: 0.75em;
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 1200px){
		.overview-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 1200px) {
		.overview-list {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
