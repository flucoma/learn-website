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
		padding: 1em;
		cursor: pointer;
		color: #495057;
		font-size: 1rem;
		font-family: var(--font);
		margin: 0;
		min-width: 13ch; /* Number of characters in the word SuperCollider */
		transition: border-bottom 0.05s linear; 
		transition: background-color 0.05s linear;
	}

	button:hover {
		background-color: rgba(28, 164, 252, 0.05);
	}

	.selected {
		background-color: #fff;
		border-bottom: 4px solid var(--light-blue);
		color: black;
		background-color: rgba(28, 164, 252, 0.1);
	}
</style>
