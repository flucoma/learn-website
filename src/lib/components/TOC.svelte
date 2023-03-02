<script>
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { structure } from '$lib/app.js';
	let w;
	let expand = false;
	let headings = [''];
	const breakpoint = 600;

	$: {
		let path = $page.url.pathname;
		path = path.endsWith('/') ? path.slice(0, -1) : path;
		headings = structure[path] || [];
	}
</script>

{#if w < breakpoint}
	<div class="mobile-toc">
		<button
			on:click={() => {
				expand = !expand;
			}}
			class:expand
			class:closed={!expand}>On This Page</button
		>
		{#if headings.length > 0 && expand}
			<div class="line" />
			<div class="onthispage" transition:slide={{ duration: 130 }}>
				{#each headings as h}
					<a href={h.url}>{h.text}</a>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="container">
		<div>
			{#if headings.length > 0}
				<h3 class="toc">Table of Contents</h3>
				<div class="headings">
					{#each headings as h}
						<a href={h.url}>{h.text}</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<svelte:window bind:innerWidth={w} />

<style >
	.mobile-toc {
		display: flex;
		flex-direction: column;
		place-items: center;
		margin-top: 1em;
		border-radius: 10px;
		border: 2px solid var(--med-blue);
		width: 100%;
	}

	.mobile-toc > button {
		flex: auto;
		font-family: var(--font);
		width: 100%;
		border: 0;
		background: none;
		box-shadow: none;
		border-radius: 0px;
		color: var(--med-blue);
	}

	.mobile-toc > button:hover {
		text-decoration: underline;
	}

	.onthispage {
		background: none;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		padding: 0.5em;
	}

	.line {
		height: 1px;
		background-color: var(--med-blue);
		width: 90%;
		margin: 0 auto;
	}

	.onthispage > a {
		color: var(--med-blue);
		padding: 6px;
	}

	.onthispage > a:hover {
		text-decoration: underline;
		background-color: white;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		position: fixed;
		z-index: 1;
		max-width: 23ch;
	}

	.headings,
	.onthispage {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	a {
		text-decoration: none;
		font-size: 0.8rem;
	}

	@media (max-width: 1200px) {
		.container {
			position: relative;
			display: grid;
			grid-template-columns: auto auto;
			max-width: 100%;
			width: 100%;
		}
	}
</style>
