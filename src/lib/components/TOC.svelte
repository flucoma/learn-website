<script>
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition'
	import { structure } from '$lib/app.js';
	let w;
	let expand = false;
	const breakpoint = 600;

	let headings = [];
	$: {
		let path = $page.url.pathname;
		path = path.endsWith('/') ? path.slice(0, -1) : path;
		headings = structure[path] || [];
	}
</script>

{#if w >= breakpoint}
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
{#if w < breakpoint}
<div class="mobile-toc">
	<button on:click={()=>{expand=!expand}}>On This Page</button>
	<div class="line"></div>
	{#if headings.length > 0 && expand}
	<div class="onthispage" transition:slide={{duration:200}}>
		{#each headings as h}
			<a href={h.url}>{h.text}</a>
		{/each}
	</div>
	{/if}
</div>
{/if}

<svelte:window bind:innerWidth={w}/>

<style lang="postcss">
	.mobile-toc {
		border-radius: 10px;
		background-color: var(--med-blue);
		width: 100%;
	}

	.mobile-toc > button {
		font-family: var(--font);
		width: 100%;
		border: 0;
		background: none;
		box-shadow: none;
		border-radius: 0px;
		color: white;
	}

	.onthispage {
		background-color: var(--med-blue);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		padding: 0.5em;
	}

	.line {
		height: 1px;
		background-color: white;
	}

	.onthispage > a {
		color: white;
		padding: 6px;
	}

	.onthispage > a:hover {
		background-color: var(--dark-blue);
		border-radius: 10px;
		
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		position: fixed;
		z-index: 1;
		max-width: 23ch;
	}

	.headings, .onthispage {
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
