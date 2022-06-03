<script>
	import Masonry from 'svelte-bricks';
	import RefCategory from '$lib/components/mosaic/RefCategory.svelte';

	export let items = [];

	let [minColWidth, maxColWidth, gap] = [130, 400, 15];
	let width, height;
</script>

<Masonry {items} {minColWidth} {maxColWidth} {gap} idKey={'category'} animate={false} let:item bind:width bind:height>
	<RefCategory {item} />
</Masonry>
