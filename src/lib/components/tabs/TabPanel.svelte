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
		margin-bottom: 10px;
		border: 1px solid #dee2e6;
    	border-radius: 0 0 .5rem .5rem;
	}
</style>
