<script lang='ts'>
	import { edits } from '$lib/app.js';
	import { page } from '$app/stores';
	const editHistory = $edits[$page.path];
	const source: string = `https://github.com/flucoma/learn-website/tree/main/${editHistory.url}`;
	const commit: string = `https://github.com/flucoma/learn-website/commit/${editHistory.commit}`;
</script>

<div class="history">
	<div class="last-edit">Last modified: {editHistory.time} by {editHistory.author}</div>
	<a target="_blank" class="edit" href={commit}>Commit: {editHistory.commit.slice(0, 6)}</a>
	<a target="_blank" class="edit" href={source}>Edit File on GitHub</a>
</div>

<style lang="scss">
	.history {
		margin-top: 1em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		font-size: 0.65rem;
	}
</style>
