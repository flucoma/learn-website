<script>
	import { page } from '$app/stores';
	import { structure } from '$lib/app.js';

	let headings = [];
	let activeHash = '';

	$: {
		let path = $page.url.pathname;
		path = path.endsWith('/') ? path.slice(0, -1) : path;
		headings = structure[path] || [];
		activeHash = $page.url.hash;
	}
</script>

{#if headings.length > 0}
	<aside class="toc">
		<h3 class="toc-title">Table of Contents</h3>
		<nav class="toc-nav">
			{#each headings as heading}
				<a
					href={heading.url}
					class="toc-link"
					class:active={heading.url === activeHash}
					style="--depth: {heading.depth}"
				>
					{heading.text}
				</a>
			{/each}
		</nav>
	</aside>
{/if}

<style>
	.toc {
		position: sticky;
		top: calc(var(--header-height) + var(--space-4));
		background-color: var(--color-background);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		padding: var(--space-4);
		margin-top: var(--space-4);
		width: 100%;
	}

	.toc-title {
		font-size: var(--text-md);
		font-weight: var(--font-bold);
		color: var(--color-primary-800);
		margin: 0 0 var(--space-3);
		padding-bottom: var(--space-2);
		border-bottom: 1px solid var(--color-neutral-200);
	}

	.toc-nav {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.toc-link {
		font-size: var(--text-sm);
		color: var(--color-primary-800);
		text-decoration: none;
		line-height: var(--leading-snug);
		padding: var(--space-1) var(--space-2);
		padding-left: calc(var(--space-2) + var(--depth, 0) * 0.75rem);
		border-left: 2px solid transparent;
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		transition: all var(--transition-fast);
	}

	.toc-link:hover {
		color: var(--color-primary-500);
		background-color: transparent;
		border-left-color: var(--color-primary-500);
		transform: translateX(2px);
	}

	.toc-link.active {
		color: var(--color-primary-700);
		background-color: var(--color-primary-50);
		border-left-color: var(--color-primary-600);
		font-weight: var(--font-semibold);
	}

	@media (max-width: 1200px) {
		.toc {
			margin: var(--space-4) var(--space-8) var(--space-4) 0;
		}
	}
</style>
