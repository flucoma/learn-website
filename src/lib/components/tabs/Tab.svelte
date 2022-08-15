<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<button class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
	<slot />
</button>

<style>
	button {
		background: none;
		border: 1px solid transparent;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		color: #495057;
	}

	.selected {
		background-color: #fff;
		border-color: #dee2e6 #dee2e6 #fff;
		border-bottom: 1px solid var(--med-blue);
		color: black;
	}

	:not(.selected):hover {
		border-color: #e9ecef #e9ecef #dee2e6;
	}
</style>
