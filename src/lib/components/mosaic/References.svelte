<script>
	import Masonry from 'svelte-bricks';
	import RefCategory from '$lib/components/mosaic/RefCategory.svelte'
	
	export let items = [];

	let [minColWidth, maxColWidth, gap] = [100, 400, 50]
	let width, height;
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
<RefCategory {item} />
</Masonry>

