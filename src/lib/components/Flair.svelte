<script>
	export let flair = '';
</script>

<div
	class="flair"
	class:article={flair === 'article'}
	class:reference={flair === 'reference'}
	class:podcast={flair === 'podcast'}
	class:event={flair === 'event'}
	class:tutorial={flair === 'tutorial'}
>
	{flair}
</div>

<style >
	.flair {
		text-align: center;
		font-size: 0.75rem;
		border-radius: 0.25rem;
		color: white;
		line-height: 15px;
		padding: 3px;
		height: 15px;
	}
</style>
