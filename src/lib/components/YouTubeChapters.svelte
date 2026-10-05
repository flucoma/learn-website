<script>
	import YouTube from 'svelte-youtube';
	export let url = '';
	let instance;

	export let chapters = [];

	function chapterClick(chapter) {
		instance.seekTo(convertTime(chapter));
	}

	function convertTime(entry) {
		if (entry.start.length == 2) {
			return entry.start[0] * 60 + entry.start[1];
		} else {
			return entry.start[0] * 60 * 60 + entry.start[1] * 60 + entry.start[2];
		}
	}
</script>

<div class="youtube-container">
	<YouTube videoId={url} on:ready={e => (instance = e.detail.target)} />
</div>

<h2>Chapters</h2>

<div class="chapter-container">
	{#each chapters as chapter, i}
		<button
			class="chapter"
			on:click={() => chapterClick(chapter)}
			on:keypress={() => chapterClick(chapter)}
		>
			<span class="chapter-time">
				{#if chapter.start.length == 2}
					{chapter.start[0]}:{chapter.start[1].toString().padStart(2, '0')}
				{:else}
					{chapter.start[0]}:{chapter.start[1].toString().padStart(2, '0')}:{chapter.start[2].toString().padStart(2, '0')}
				{/if}
			</span>
			{chapter.label}
		</button>
	{/each}
</div>

<style>
	.youtube-container {
		padding-top: 1em;
		padding-bottom: 1em;
		max-width: 100%;
		margin: 0 auto;
		display: block;
	}

	.chapter-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		margin: calc(2 * var(--heading-spacing)) 0;
		padding: 0;
	}

	.chapter {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		padding: 0.4em 0.75em;
		border: 1px solid var(--med-blue);
		border-radius: 999px;
		background: transparent;
		color: var(--med-blue);
		font-size: 0.875em;
		line-height: 1.4;
		cursor: pointer;
		transition: background-color 0.15s, color 0.15s;
	}

	.chapter:hover {
		background-color: var(--med-blue);
		color: white;
	}

	.chapter:active {
		background-color: rgb(96, 96, 96);
		border-color: rgb(96, 96, 96);
		color: white;
	}

	.chapter-time {
		font-variant-numeric: tabular-nums;
		opacity: 0.8;
	}
</style>
