<script>
	export let flair = '';

	const colorMap = {
		article: 'var(--color-article)',
		reference: 'var(--color-reference)',
		podcast: 'var(--color-podcast)',
		event: 'var(--color-event)',
		tutorial: 'var(--color-tutorial)'
	};
	$: flairColor = colorMap[flair] ?? 'var(--color-text-muted)';
</script>

<div class="flair" style="color: {flairColor}">
	{flair}
</div>

<style>
	.flair {
		display: grid;
		align-items: center;
		justify-content: center;
		text-transform: capitalize;
		font-size: var(--text-xs);
		font-weight: var(--font-bold);
	}
</style>
