<script>
	import { db } from '$lib/app.js';
	import { goto } from '$app/navigation';
	import Flair from '$lib/components/Flair.svelte';

	let query = '';
	let searchBar;
	let focused = false;
	$: placeholder = focused ? 'Enter your search term' : 'Site search... (Press "CMD + /" to focus)';
	$: results = search(query);

	function clickResult(link) {
		query = '';
		goto(link);
	}

	function search(query) {
		return db.search(query);
	}

	function blurSearch() {
		focused = false;
	}

	function focusSearch() {
		focused = true;
	}

	function keyDown(e) {
		if (e.key === '/' && e.metaKey) {
			searchBar.focus();
		}
	}
</script>

<svelte:window on:keydown={keyDown} />

<div class="search">
	<input
		class="query"
		{placeholder}
		bind:value={query}
		bind:this={searchBar}
		on:focus={focusSearch}
		on:blur={blurSearch}
	/>

	{#if results.length >= 1 && focused}
		<div class="results">
			{#each results.slice(0, 15) as r, i}
				<div class="result" on:mousedown={() => clickResult(r.url)} role="button" tabindex={i}>
					<div class="top">
						<div class="title">{r.title}</div>
						<Flair flair={r.flair} />
					</div>

					<div class="bottom">
						{r.blurb}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	:root {
		--radius: 0px;
		--w: min(90%, 400px);
		--border: 2px solid var(--dark-blue);
		--search-pad: 10px;
	}

	.search {
		width: var(--w);
		position: relative;
	}

	.query {
		font-size: 1rem;
		border-radius: var(--radius);
		padding: var(--search-pad);
		width: 100%;
	}

	.results {
		display: flex;
		flex-direction: column;
		position: absolute;
		width: calc(100% + 2 * var(--search-pad));
		background: rgb(255, 255, 255, 1);
		border: var(--border);
		border-radius: var(--radius);
		z-index: 0;
		gap: 0em;
	}

	.result {
		max-width: 100%;
		padding: 0.5em;
		display: grid;
		grid-template-rows: repeat(2, auto);
		gap: 0.5em;
		text-align: justify;
	}

	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.title {
		font-weight: bold;
	}
	.bottom {
		color: grey;
		text-overflow: ellipsis;
		font-size: 0.8rem;
	}

	.result:hover {
		background-color: rgba(128, 128, 128, 0.112);
		cursor: pointer;
	}
</style>
