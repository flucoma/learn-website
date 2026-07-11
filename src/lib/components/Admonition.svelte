<script>
	export let type = 'note';

	const labels = {
		note: 'Note',
		warn: 'Warning',
		danger: 'Danger',
		pointer: 'Pointer'
	};
</script>

<div class="admonition {type}">
	<div class="admonition-header">{labels[type] ?? 'Note'}</div>
	<div class="admonition-body">
		<slot />
	</div>
</div>

<style>
	.admonition {
		--_bg: var(--color-note-bg);
		--_border: var(--color-note-border);
		border-left: 4px solid var(--_border);
		color: var(--color-note-text);
		border-radius: var(--radius-lg);
		margin: var(--space-6) 0;
		box-shadow: var(--shadow-sm);
		overflow: hidden;
	}

	.admonition-body :global(p) {
		padding: var(--space-5);
		margin: 0;
		font-size: 0.95rem;
		line-height: var(--leading-normal);
	}

	.admonition-header {
		background-color: var(--_bg);
		font-weight: var(--font-extrabold);
		padding: var(--space-3) var(--space-5);
		font-size: var(--text-md);
	}

	.note {
		--_bg: var(--color-note-bg);
		--_border: var(--color-note-border);
	}

	.warn {
		--_bg: var(--color-warning-bg);
		--_border: var(--color-warning-border);
	}

	.danger {
		--_bg: var(--color-danger-bg);
		--_border: var(--color-danger-border);
	}

	.pointer {
		--_bg: var(--color-success-bg);
		--_border: var(--color-success-border);
	}
</style>
