<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<button
	role="tab"
	aria-selected={$selectedTab === tab}
	class:selected={$selectedTab === tab}
	on:click={() => selectTab(tab)}
>
	<slot />
</button>

<style>
	button {
		background: none;
		border: 1px solid transparent;
		padding: var(--space-2) var(--space-4);
		cursor: pointer;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-family: var(--font-sans);
		font-weight: var(--font-semibold);
		margin: 0;
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	button:hover {
		color: var(--color-primary-700);
		background-color: rgba(28, 164, 252, 0.08);
	}

	.selected {
		background-color: var(--color-background) !important;
		color: var(--color-primary-800) !important;
		box-shadow: var(--shadow-sm);
		border-color: var(--color-neutral-200);
	}
</style>
