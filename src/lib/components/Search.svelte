<script>
	import { fuse, blur } from '$lib/app';
	import { wrap } from '$lib/util';
	import { goto } from '$app/navigation';
	import Flair from '$lib/components/Flair.svelte';

	let searchBar;
	let query = '';
	let focused = false;
	let focusedEntry = -1;
	let entries = [];
	$: placeholder = focused ? '' : 'Search';
	$: results = fuse.search(query).slice(0, 8);

	function clickResult(link) {
		query = '';
		goto(link);
	}

	function blurSearch() {
		focused = false;
		// $blur = false;
		searchBar.blur();
	}

	function focusSearch(e) {
		searchBar.focus();
		focused = true;
		// $blur = true;
	}

	function updateFocus() {
		focusedEntry = wrap(focusedEntry, 0, entries.length);
		entries[focusedEntry].focus();
	}

	function formpress(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}

	function keyDown(e) {
		if (e.key === '/' && e.metaKey) {
			focusSearch();
		}
		if (e.key === 'Escape') {
			blurSearch();
		}
		if (focused) {
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				focusedEntry -= 1;
				updateFocus();
			}

			if (e.key === 'ArrowDown') {
				e.preventDefault();
				focusedEntry += 1;
				updateFocus();
			}

			if (e.key === 'Enter') {
				if (focusedEntry !== -1) {
					clickResult(results[focusedEntry].item.url);
					e.preventDefault();
				}
			}
		}
	}
</script>

<svelte:window on:keydown={keyDown} />
<div class="search">
	<form id="search-input" role="search" on:keypress={formpress} on:keydown={formpress}>
		<label class="visually-hidden" for="search-term">Search The Learn Platform</label>
		<input
			class="query"
			{placeholder}
			bind:value={query}
			bind:this={searchBar}
			on:focus={focusSearch}
			on:blur={blurSearch}
			id="search-term"
		/>
	</form>

	{#if results.length >= 1 && focused}
	<div class="results">
		{#each results as r, i}
			<div
				class="result"
				on:mousedown={() => clickResult(r.item.url)}
				on:mouseleave={() => { focusedEntry = -1 }}
				on:mouseenter={() => { focusedEntry = i }}
				class:entryhover={i === focusedEntry}
				on:click={() => clickResult(r.item.url)}
				on:keypress={() => clickResult(r.item.url)}
				on:focus={focusSearch}
				on:blur={blurSearch}
				bind:this={entries[i]}
				role="button"
				tabindex="0"
			>
				<div class="top">
					<h3 class="title">{r.item.title}</h3>
					{#if r.item.flair}
					<div class={`item-${r.item.flair} flair`}>{r.item.flair}</div>
					{/if}
				</div>
				<p class="bottom">
					{r.item.blurb.slice(0, 150) + '...'}
				</p>
			</div>
		{/each}
	</div>
	{/if}
</div>

<style>
	.search {
		z-index: 999;
		position: relative;
	}
	.query {
		font-family: var(--font);
		font-size: 0.9rem;
		border: 1px solid #e0e0e0;
		padding: 0.5em 0.75em;
		border-radius: 12px;
		width: 100%;
		height: 36px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
	}
	.query:hover, .query:focus {
		border-color: var(--med-blue);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		outline: none;
	}
	.results {
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 0;
		width: min(90vw, 400px);
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
		z-index: 1000;
		margin-top: 0.5em;
	}
	.result {
		padding: 1em;
		display: flex;
		flex-direction: column;
		text-align: left;
		transition: all 0.3s ease;
		border-left: 4px solid transparent;
	}
	.entryhover, .result:hover, .result:focus {
		background-color: rgba(146, 200, 246, 0.15);
		border-left-color: var(--med-blue);
		cursor: pointer;
	}
	.result:hover .title, .result:focus .title {
		color: var(--med-blue);
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.5em;
	}
	.title {
		font-weight: bold;
		font-size: 1.1rem;
		line-height: 1.3;
		margin: 0;
		color: var(--dark-blue);
		transition: color 0.3s ease;
	}
	.bottom {
		color: #595959;
		font-size: 0.9rem;
		margin: 0;
		line-height: 1.4;
	}
	.flair {
		align-self: flex-start;
		text-transform: capitalize;
		font-size: 0.75rem;
		font-weight: bold;
		padding: 0.3em 0.8em;
		border-radius: 20px;
		color: white;
	}
	.item-event { background-color: var(--event-flair); }
	.item-article { background-color: var(--article-flair); }
	.item-reference { background-color: var(--reference-flair); }
	.item-podcast { background-color: var(--podcast-flair); }
	.item-tutorial { background-color: var(--tutorial-flair); }

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
