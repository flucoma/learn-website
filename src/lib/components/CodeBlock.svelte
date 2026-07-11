<script>
	import { browser } from '$app/environment';
	import Copy from '$lib/components/Copy.svelte';

	export let title = '';
	export let snippet = false;

	let block;

	const copyCode = () => {
		if (browser) {
			const code = block.querySelectorAll('pre > code');
			code.forEach(c => {
				navigator.clipboard.writeText(c.innerText);
			});
		}
	};
</script>

<div bind:this={block} class="code-block" class:snippet>
	{#if title}
		<div class="code-header">
			<span class="code-label">{title}</span>
			<Copy on:click={copyCode} />
		</div>
	{/if}
	<div class="code-body">
		<slot />
	</div>
</div>

<style>
	.code-block {
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-6) 0;
		border: 1px solid var(--color-neutral-200);
		box-shadow: var(--shadow-sm);
	}

	.snippet {
		border-left: 4px solid var(--color-primary-400);
	}

	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-2) var(--space-4);
		background-color: var(--color-neutral-100);
		border-bottom: 1px solid var(--color-neutral-200);
	}

	.code-label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: var(--font-semibold);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	.code-body {
		position: relative;
	}

	.code-body :global(pre) {
		margin: 0;
		border-radius: 0;
	}
</style>
