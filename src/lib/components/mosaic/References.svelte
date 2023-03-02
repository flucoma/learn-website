<script>
	import Masonry from 'svelte-bricks';
	import RefCategory from '$lib/components/mosaic/RefCategory.svelte';

	export let items = [];

	let [minColWidth, maxColWidth, gap] = [150, 250, 25];
	let width, height;
</script>

<Masonry {items} {minColWidth} {maxColWidth} {gap} idKey={'category'} animate={true} let:item bind:width bind:height>
	<RefCategory {item} />
</Masonry>
