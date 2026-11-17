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
		searchBar.blur();
	}

	function focusSearch() {
		searchBar.focus();
		focused = true;
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
					on:mouseleave={() => { focusedEntry = -1; }}
					on:mouseenter={() => { focusedEntry = i; }}
					on:click={() => clickResult(r.item.url)}
					on:keypress={() => clickResult(r.item.url)}
					on:focus={focusSearch}
					on:blur={blurSearch}
					bind:this={entries[i]}
					role="button"
					tabindex="0"
					class:hovered={i === focusedEntry}
				>
					<div class="top">
						<h3 class="title">{r.item.title}</h3>
						{#if r.item.flair}
							<div class="result-flair flair-{r.item.flair}">{r.item.flair}</div>
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
		font-family: var(--font-sans);
		font-size: 0.9rem;
		border: 1px solid var(--color-border);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-lg);
		width: 100%;
		height: 36px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		transition: all var(--transition-slow);
		background-color: var(--color-background);
		color: var(--color-text);
	}

	.query:hover,
	.query:focus {
		border-color: var(--color-primary-600);
		box-shadow: var(--shadow-sm);
		outline: none;
	}

	.results {
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 0;
		width: min(90vw, 400px);
		background: var(--color-background);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
		z-index: 1000;
		margin-top: var(--space-2);
	}

	.result {
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		text-align: left;
		transition: all var(--transition-slow);
		border-left: 4px solid transparent;
	}

	.hovered,
	.result:hover,
	.result:focus {
		background-color: rgba(146, 200, 246, 0.15);
		border-left-color: var(--color-primary-600);
		cursor: pointer;
	}

	.result:hover .title,
	.result:focus .title {
		color: var(--color-primary-600);
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.title {
		font-weight: var(--font-bold);
		font-size: var(--text-md);
		line-height: var(--leading-snug);
		margin: 0;
		color: var(--color-primary-800);
		transition: color var(--transition-slow);
	}

	.bottom {
		color: var(--color-text-muted);
		font-size: 0.9rem;
		margin: 0;
		line-height: 1.4;
	}

	.result-flair {
		align-self: flex-start;
		text-transform: capitalize;
		font-size: var(--text-xs);
		font-weight: var(--font-bold);
		padding: 0.3em 0.8em;
		border-radius: var(--radius-full);
		color: var(--color-text-inverted);
	}

	.flair-event    { background-color: var(--color-event); }
	.flair-article  { background-color: var(--color-article); }
	.flair-reference { background-color: var(--color-reference); }
	.flair-podcast  { background-color: var(--color-podcast); }
	.flair-tutorial { background-color: var(--color-tutorial); }

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
