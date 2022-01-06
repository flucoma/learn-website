<script>
	export let flair = '';
</script>

<div
	class="flair"
	class:article={flair === 'article'}
	class:reference={flair === 'reference'}
	class:podcast={flair === 'podcast'}
	class:event={flair === 'event'}
>
	{flair}
</div>

<style lang="postcss">
	.flair {
		font-size: 0.75rem;
		border-radius: 3px;
		color: white;
		padding: 3px;
		height: 15px;
	}

	.event {
		background-color: rgb(235, 161, 23);
	}

	.article {
		background-color: var(--light-blue);
	}

	.reference {
		background-color: forestgreen;
	}

	.podcast {
		background-color: palevioletred;
	}

	.tutorial {
		background-color: rgba(102, 103, 171, 255);
	}
</style>
