<script>
	export let flair = '';
</script>

<div
	class="flair"
	class:item-article={flair === 'article'}
	class:item-reference={flair === 'reference'}
	class:item-podcast={flair === 'podcast'}
	class:item-event={flair === 'event'}
	class:item-tutorial={flair === 'tutorial'}
>
	{flair}
</div>

<style >
	.flair {
		display: grid;
		align-items: center;
		justify-content: center;
		text-transform: capitalize;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.item-event {
		color: var(--event-flair);
	}
	.item-article {
		color: var(--article-flair);
	}
	
	.item-reference {
		color: var(--reference-flair);
	}
	
	.item-podcast {
		color: var(--podcast-flair);
	}
	
	.item-tutorial {
		color: var(--tutorial-flair);
	}
</style>
