<script>
	import RefCategory from '$lib/components/mosaic/RefCategory.svelte';

	export let items = [];
</script>

<div class="ref-grid">
	{#each items as item}
		<RefCategory {item} />
	{/each}
</div>

<style>
	.ref-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--space-6);
	}
</style>
