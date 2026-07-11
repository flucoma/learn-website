<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
	<div class="panel" role="tabpanel">
		<slot />
	</div>
{/if}

<style>
	.panel {
		margin-top: var(--space-4);
		padding: var(--space-5);
		border: 1px solid var(--color-neutral-200);
		border-radius: var(--radius-md);
		background-color: var(--color-background);
	}
</style>
