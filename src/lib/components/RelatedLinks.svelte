<script>
	import { page } from '$app/stores';
	import { related } from '$lib/app';

	let links = [];
	$: {
		let path = $page.url.pathname;
		path = path.endsWith('/') ? path.slice(0, -1) : path;
		links = related[path] || [];
	}
	$: references = links.filter(x => x.flair === 'reference') || [];
	$: articles = links.filter(x => x.flair === 'article') || [];
	$: tutorials = links.filter(x => x.flair === 'tutorial') || [];
	$: renderables = [articles, tutorials, references];

	let hoverable;
	let hover = false;
	let hoverInfo = { flair: '', blurb: '' };
	let hoverPos = { x: 0, y: 0 };

	function stopHover() {
		hover = false;
	}

	function mouseEnter(e, link) {
		hoverInfo = link;
		hover = true;
		const rect = e.target.getBoundingClientRect();
		hoverPos.x = rect.x + window.scrollX;
		hoverPos.y = rect.y + window.scrollY + 2.5;
		hoverPos.offset = rect.height + 5;
	}
</script>

{#if hover}
	<div
		class="tooltip tooltip-{hoverInfo.flair}"
		style:left={`${hoverPos.x}px`}
		style:top={`${hoverPos.y + hoverPos.offset}px`}
		bind:this={hoverable}
	>
		<div class="tooltip-flair">{hoverInfo.flair}</div>
		<hr class="tooltip-divider" />
		<div class="tooltip-blurb">{hoverInfo.blurb}</div>
	</div>
{/if}

<div class="related-container">
	{#each renderables as c}
		{#each c as link}
			<a
				class="related-link related-link-{link.flair}"
				href={link.url}
				on:mouseenter={e => mouseEnter(e, link)}
				on:mouseleave={stopHover}
			>
				{link.title}
			</a>
		{/each}
	{/each}
</div>

<style>
	.related-container {
		font-size: 0.9rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.related-link {
		padding: var(--space-2) var(--space-3);
		text-decoration: none;
		color: var(--color-primary-800);
		border-radius: var(--radius-lg);
		transition: all var(--transition-slow);
		border: 1px solid transparent;
	}

	.related-link:hover {
		color: var(--color-text-inverted);
		transform: translateY(-2px);
	}

	/* Per-flair colors using accent tokens */
	.related-link-tutorial {
		color: var(--color-tutorial);
		border-color: var(--color-tutorial);
	}
	.related-link-tutorial:hover {
		background-color: var(--color-tutorial);
	}

	.related-link-reference {
		color: var(--color-reference);
		border-color: var(--color-reference);
	}
	.related-link-reference:hover {
		background-color: var(--color-reference);
	}

	.related-link-article {
		color: var(--color-article);
		border-color: var(--color-article);
	}
	.related-link-article:hover {
		background-color: var(--color-article);
	}

	/* Tooltip */
	.tooltip {
		position: absolute;
		max-width: 300px;
		z-index: 98;
		background-color: var(--color-background);
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		font-size: 0.9rem;
	}

	.tooltip-flair {
		font-size: var(--text-xs);
		font-weight: var(--font-bold);
		text-transform: capitalize;
		margin-bottom: var(--space-2);
	}

	.tooltip .tooltip-flair {
		color: var(--color-text-muted);
	}

	.tooltip-blurb {
		color: var(--color-text-muted);
		line-height: 1.4;
	}

	.tooltip-divider {
		border: none;
		height: 2px;
		margin: var(--space-2) 0;
	}

	.tooltip-article .tooltip-flair { color: var(--color-article); }
	.tooltip-article .tooltip-divider { background-color: var(--color-article); }

	.tooltip-reference .tooltip-flair { color: var(--color-reference); }
	.tooltip-reference .tooltip-divider { background-color: var(--color-reference); }

	.tooltip-tutorial .tooltip-flair { color: var(--color-tutorial); }
	.tooltip-tutorial .tooltip-divider { background-color: var(--color-tutorial); }
</style>
