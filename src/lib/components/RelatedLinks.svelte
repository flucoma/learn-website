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
	class={`hoverable rel-${hoverInfo.flair}`}
	style:left={`${hoverPos.x}px`}
	style:top={`${hoverPos.y + hoverPos.offset}px`}
	bind:this={hoverable}
	>
		<div class="flair">{hoverInfo.flair}</div>
		<hr class={hoverInfo.flair} />
		<div class="blurb">{hoverInfo.blurb}</div>
	</div>
{/if}

<div class="container">
	{#each renderables as c}
		{#each c as link}
			<a
				class={`link rel-${link.flair}`}
				href={link.url}
				on:mouseenter={e => mouseEnter(e, link)}
				on:mouseleave={stopHover}
			>{link.title}
			</a>
		{/each}
	{/each}
</div>

<style>
	.container {
		font-size: 0.9rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.75em;
		margin-bottom: 1.5em;
	}
	.link {
		padding: 0.5em 0.75em;
		text-decoration: none;
		color: var(--dark-blue);
		border-radius: 12px;
		transition: all 0.3s ease;
		border: 1px solid transparent;
	}
	.link:hover {
		color: white;
		transform: translateY(-2px);
	}
	.hoverable {
		position: absolute;
		max-width: 300px;
		z-index: 98;
		background-color: white;
		padding: 1em;
		border-radius: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
		font-size: 0.9rem;
	}
	.flair {
		font-size: 0.75rem;
		font-weight: bold;
		text-transform: capitalize;
		margin-bottom: 0.5em;
	}
	.blurb {
		color: #595959;
		line-height: 1.4;
	}
	hr {
		border: none;
		height: 2px;
		margin: 0.5em 0;
	}

	.rel-tutorial {
		color: var(--tutorial-flair);
		border-color: var(--tutorial-flair);
	}
	.rel-tutorial:hover {
		background-color: var(--tutorial-flair);
	}
	.rel-tutorial hr {
		background-color: var(--tutorial-flair);
	}

	.rel-reference {
		color: var(--reference-flair);
		border-color: var(--reference-flair);
	}
	.rel-reference:hover {
		background-color: var(--reference-flair);
	}
	.rel-reference hr {
		background-color: var(--reference-flair);
	}

	.rel-article {
		color: var(--article-flair);
		border-color: var(--article-flair);
	}
	.rel-article:hover {
		background-color: var(--article-flair);
	}
	.rel-article hr {
		background-color: var(--article-flair);
	}
</style>
