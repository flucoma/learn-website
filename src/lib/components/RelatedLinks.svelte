<script>
	import { page } from '$app/stores';
    import related from '../../../static/related.json';
    
    let links = [];
    $: {
		let path = $page.url.pathname;
		path = path.endsWith('/') ? path.slice(0, -1) : path;
        links = related[path ] || [];
    }
    $: references = links.filter(x => x.flair === 'reference') || []
    $: articles = links.filter(x => x.flair === 'article') || []
    $: tutorials = links.filter(x => x.flair === 'tutorial') || []
	$: renderables = [articles, tutorials, references]
	let hoverable;
	let hover = false;
	let hoverInfo = { flair : '', blurb : '' };
	let hoverPos = { x : 0, y : 0 };
	function stopHover() { hover = false };

	function mouseenter(e, link) {
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
class={`hoverable ${hoverInfo.flair}`} 
style:left={`${hoverPos.x}px`}
style:top={`${hoverPos.y + hoverPos.offset}px`}
bind:this={hoverable}
>
	<div class="flair">{ hoverInfo.flair }</div>
	<hr class=hoverInfo.flair>
	<div class="blurb">{ hoverInfo.blurb }</div>
</div>
{/if}

<h2>Related Links</h2>
<div class='container'>
	{#each renderables as c}
	{#each c as link}
	<a
	class={`link ${link.flair}`}
	href="{link.url}" 
	on:mouseenter={(e) => mouseenter(e, link)} 
	on:mouseleave={stopHover}>{link.title}
	</a>
	{/each}
	{/each}
</div>

<style>
	.flair {
		font-size: 1rem;
		font-weight: bold;
	}
	.flair::first-letter { 
    	text-transform:capitalize;
	}
	.blurb {
		color: black;
	}
	.hoverable {
		position: absolute;
		max-width: 300px;
		z-index: 98;
		background-color: rgba(255, 255, 255, 0.95);
		padding: 0.5em;
		outline-width: 2px;
		font-size: 0.8rem;
	}
	.container {
		font-size: 0.8rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
	}

	.link {
		padding: 0.25em;
		text-decoration: none;
	}

	.link:hover {
		color: white;
	}

	.tutorial {
		color: var(--tutorial-flair); 
		outline: 2px solid var(--tutorial-flair);
	}

	.tutorial:hover {
		background-color: var(--tutorial-flair); 
	}

	.reference {
		color: var(--reference-flair);
		outline: 2px solid var(--reference-flair);
	}

	.reference:hover {
		background-color: var(--reference-flair); 
	}

	.article {
		color: var(--article-flair);
		outline: 2px solid var(--article-flair);
	}

	.article:hover {
		background-color: var(--article-flair);
	}
</style>