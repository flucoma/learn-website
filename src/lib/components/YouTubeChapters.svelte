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

<ol class="chapter-container">
	{#each chapters as chapter, i}
		<li class="chapter" 
		on:keypress={() => chapterClick(chapter)} 
		on:click={() => chapterClick(chapter)}
		>
			<p>
				{#if chapter.start.length == 2}
				<div>{chapter.label} ({chapter.start[0]}:{chapter.start[1]})</div>
				{:else}
				<div>{chapter.label} ({chapter.start[0]}:{chapter.start[1]}:{chapter.start[2]})</div>
				{/if}
			</p>
		</li>
	{/each}
</ol>

<style>
	.youtube-container {
		padding-top: 1em;
		padding-bottom: 1em;
		max-width: 100%;
		margin: 0 auto;
		display: block;
	}

	.chapter-container {
		margin-left: -1em;
		line-height: 1.0em;
	}

	.chapter {
		text-decoration: none;
		cursor: pointer;
		color: var(--med-blue);
		max-width: fit-content;
		line-height: 1.7em;
	}

	.chapter:hover {
		background-color: var(--med-blue);
		color: white;
	}

	.chapter:active {
		background-color: rgb(96, 96, 96);
		color: white;
	}
</style>
