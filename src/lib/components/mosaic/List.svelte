<script>
	import { db } from '$lib/app.js';
	import Article from '$lib/components/mosaic/Article.svelte';
	import Masonry from '$lib/components/mosaic/Masonry.svelte';

	export let section = 'learn';

	const items = db.filter(x => x.section === section);
	const [minColWidth, maxColWidth, gap] = [300, 800, 20];
	let width = 0;
	let height = 0;
</script>

<Masonry {items} {minColWidth} {maxColWidth} {gap} idKey={'url'} animate={false} let:item bind:width bind:height>
	<Article {item} />
</Masonry>
