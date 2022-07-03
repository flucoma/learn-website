<script>
	import { edits } from '$lib/app.js';
	import { page } from '$app/stores';
	let path = $page.url.pathname;
	path = path.endsWith('/') ? path.slice(0, -1) : path;
	const editHistory = edits[path];
	const source = `https://github.com/flucoma/learn-website/tree/main/${editHistory.url}`;
</script>

<div class="history">
	<div class="last-edit">Last modified: {editHistory.time} by {editHistory.author}</div>
	<a class="edit" target="_blank" href={source}>Edit File on GitHub</a>
</div>

<style lang="postcss">
	.history {
		margin-top: 1em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		font-size: 0.65rem;
	}
</style>
