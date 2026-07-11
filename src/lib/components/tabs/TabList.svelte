<div class="tab-list" role="tablist">
	<slot />
</div>

<style>
	.tab-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-1);
		padding: var(--space-1);
		background-color: var(--color-neutral-100);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-neutral-200);
	}
</style>
