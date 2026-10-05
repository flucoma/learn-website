<script>
	export let title = '';
	export let url = '';
	export let blurb = '';

	$: domain = (() => {
		try {
			const u = new URL(url);
			return u.hostname.replace(/^www\./, '');
		} catch {
			return url;
		}
	})();
</script>

<a
	class="resource-link"
	href={url}
	target="_blank"
	rel="noopener noreferrer"
>
	<span class="resource-icon" aria-hidden="true">↗</span>
	<div class="resource-body">
		<h3 class="resource-title">{title}</h3>
		{#if blurb}
			<p class="resource-blurb">{blurb}</p>
		{/if}
		<span class="resource-domain">{domain}</span>
	</div>
</a>

<style>
	.resource-link {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: var(--space-4);
		margin: var(--space-4) 0;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-neutral-200);
		border-left: 4px solid var(--color-primary-400);
		background: linear-gradient(
			90deg,
			rgba(28, 164, 252, 0.03) 0%,
			transparent 50%
		);
		text-decoration: none;
		color: inherit;
		transition: all var(--transition-base);
	}

	.resource-link:hover {
		border-left-color: var(--color-primary-600);
		border-color: var(--color-primary-200);
		background: linear-gradient(
			90deg,
			rgba(28, 164, 252, 0.06) 0%,
			transparent 60%
		);
		color: inherit;
		transform: translateX(2px);
	}

	.resource-link:focus-visible {
		outline: 2px solid var(--color-primary-400);
		outline-offset: 2px;
		border-radius: var(--radius-md);
	}

	.resource-icon {
		flex-shrink: 0;
		font-size: var(--text-lg);
		color: var(--color-primary-400);
		margin-top: 1px;
		transition: color var(--transition-fast), transform var(--transition-fast);
	}

	.resource-link:hover .resource-icon {
		color: var(--color-primary-600);
		transform: translateX(2px) translateY(-2px);
	}

	.resource-body {
		flex: 1;
		min-width: 0;
	}

	.resource-title {
		font-size: var(--text-base);
		font-weight: var(--font-bold);
		color: var(--color-primary-800);
		margin: 0 0 var(--space-1);
		line-height: var(--leading-snug);
	}

	.resource-blurb {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0 0 var(--space-1);
		line-height: var(--leading-normal);
	}

	.resource-domain {
		display: inline-block;
		font-size: var(--text-xs);
		font-weight: var(--font-semibold);
		color: var(--color-primary-500);
		background-color: var(--color-primary-50);
		padding: 0.15em 0.5em;
		border-radius: var(--radius-sm);
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
