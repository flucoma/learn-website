<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	let showToast = false;

	const dispatch = createEventDispatcher();

	function forwardedEvent() {
		dispatch('click');
	}

	const compositeEvent = () => {
		forwardedEvent();
		showToast = true;
		setTimeout(() => (showToast = false), 2000);
	};
</script>

<button aria-label="copy code" on:click={compositeEvent}>
	{#if showToast}
		<span class="toast" transition:fade>copied!</span>
	{:else}
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
		</svg>
	{/if}
</button>

<style>
	button {
		display: inline-grid;
		place-items: center;
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		border: none;
		background: none;
		cursor: pointer;
		padding: var(--space-1);
		color: inherit;
		border-radius: var(--radius-sm);
		transition: background-color var(--transition-fast);
	}

	button:hover {
		background-color: rgba(0,0,0,0.08);
	}

	.toast {
		color: var(--color-primary-600);
		font-weight: var(--font-semibold);
	}
</style>
