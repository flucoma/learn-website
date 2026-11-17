<script>
	export let items = [];
	export let minColWidth = 330;
	export let maxColWidth = 500;
	export let gap = 20;
	export let idKey = 'id';
	export let animate = false;
	export let width = 0;
	export let height = 0;

	let el;

	// animate reserved for API compatibility (currently unused)
	animate;

	/** Number of columns derived from container width */
	$: nCols =
		width <= 0
			? Math.min(items.length, Math.floor((1920 + gap) / (minColWidth + gap)) || 1)
			: Math.min(items.length, Math.floor((width + gap) / (minColWidth + gap)) || 1);

	/** Round-robin column distribution */
	$: cols = (() => {
		const result = Array.from({ length: nCols }, () => []);
		items.forEach((item, idx) => {
			result[idx % nCols].push({ item, idx });
		});
		return result;
	})();

	function keyOf(item) {
		if (typeof item === 'number') return item;
		if (typeof item === 'string') return item;
		if (idKey in item) return item[idKey];
		return JSON.stringify(item);
	}
</script>

<div
	bind:this={el}
	bind:clientWidth={width}
	bind:clientHeight={height}
	class="svelte-bricks"
	style="display:flex;gap:{gap}px;justify-content:center;width:100%;box-sizing:border-box;overflow-wrap:anywhere"
>
	{#each cols as col (col)}
		<div
			class="col"
			style="flex:1 1 0;min-width:0;display:grid;gap:{gap}px;height:max-content;max-width:{maxColWidth}px"
		>
			{#each col as { item, idx } (keyOf(item))}
				<slot {item} {idx} />
			{/each}
		</div>
	{/each}
</div>
