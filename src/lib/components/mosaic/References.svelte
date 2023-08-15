<script>
	import RefCategory from '$lib/components/mosaic/RefCategory.svelte';

	export let items = [];
</script>

<div class="items">
	{#each items as item}
		<RefCategory {item} />
	{/each}
</div>

<style>
	.items {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
	}
</style>