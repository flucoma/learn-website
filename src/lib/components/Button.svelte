<script>
	export let label = 'button';
	export let variant = 'primary';
	export let width = undefined;
	export let height = undefined;
	export let disabled = false;
	export let href = '';
</script>

{#if href}
	<a
		class="btn {variant}"
		class:disabled
		style:width
		style:height
		{href}
		on:click
	>
		{label}
	</a>
{:else}
	<button
		class="btn {variant}"
		class:disabled
		style:width
		style:height
		{disabled}
		on:click
	>
		{label}
	</button>
{/if}

<style>
	.btn {
		display: inline-grid;
		place-items: center;
		font-family: var(--font-sans);
		font-size: var(--text-base);
		font-weight: var(--font-bold);
		text-decoration: none;
		color: var(--color-text-inverted);
		border: 2px solid transparent;
		border-radius: var(--radius-lg);
		cursor: pointer;
		padding: var(--space-2) var(--space-5);
		min-width: fit-content;
		white-space: nowrap;
		transition:
			background-color var(--transition-fast),
			transform var(--transition-base),
			box-shadow var(--transition-base);
		line-height: 1.2;
	}

	.primary {
		background-color: var(--color-primary-800);
		box-shadow: 0 4px 6px rgba(3, 113, 181, 0.2),
					0 1px 3px rgba(3, 113, 181, 0.1);
	}
	.primary:hover {
		background-color: var(--color-primary-600);
		transform: translateY(-2px);
		box-shadow: 0 8px 12px rgba(3, 113, 181, 0.2),
					0 3px 6px rgba(3, 113, 181, 0.1);
	}
	.primary:active {
		background-color: var(--color-primary-400);
		transform: translateY(0);
	}

	.secondary {
		background-color: var(--color-primary-400);
		border-color: var(--color-primary-600);
		border-style: outset;
	}
	.secondary:hover {
		background-color: var(--color-primary-600);
	}
	.secondary:active {
		background-color: var(--color-primary-800);
	}

	.outline {
		background-color: transparent;
		color: var(--color-primary-800);
		border-color: var(--color-primary-600);
	}
	.outline:hover {
		background-color: var(--color-primary-600);
		color: var(--color-text-inverted);
		transform: translateY(-2px);
	}

	.disabled,
	.disabled:hover,
	.disabled:active {
		cursor: not-allowed;
		background-color: var(--color-neutral-400);
		border-color: var(--color-neutral-400);
		color: var(--color-text-inverted);
		opacity: 0.5;
		transform: none;
		box-shadow: none;
	}
</style>
