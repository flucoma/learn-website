<!-- 
This component abstracts the rendering process for each "card" in madewith and overview sections.
References are slightly different and use the ReferenceEntry component.
-->
<script>
	import { docs } from '$lib/app.js';
	import Article from '$lib/components/cards/Article.svelte';
	export let section = 'learn';

	const items = docs.filter((x) => x.section === section);
</script>

<div class="overview-list">
	{#each items as item}
		<Article data={item}/>
	{/each}
</div>

<style lang="postcss">
	.overview-list {
		display: flex;
		flex-direction: column;
	}
</style>
