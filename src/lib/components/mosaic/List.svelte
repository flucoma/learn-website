<!-- 
This component abstracts the rendering process for each "card" in madewith and overview sections.
References are slightly different and use the ReferenceEntry component.
-->
<script>
	import { docs } from '$lib/app.js';
	import Article from '$lib/components/mosaic/Article.svelte';
	import Masonry from 'svelte-bricks';
	
	export let section = 'learn';
	
	let [minColWidth, maxColWidth, gap] = [300, 800, 15]
	let width, height;

	const items = docs.filter((x) => x.section === section);
</script>

<Masonry 
	{items}
	{minColWidth}
	{maxColWidth}
	{gap}
	let:item
	bind:width
	bind:height
>
<Article {item} />
</Masonry>
