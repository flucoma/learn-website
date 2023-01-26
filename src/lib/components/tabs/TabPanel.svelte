<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
	<div class="panel">
		<slot />
	</div>
{/if}

<style>
	.panel {
		margin-bottom: 1em;
		border-radius: 0.25rem;
	}
</style>
