<script>
	import { page } from '$app/stores';
	import { structure } from '$lib/app.js';
	import Related from '$lib/components/Related.svelte'

	let headings = [];
	$: {
		let path = $page.url.pathname;
		path = path.endsWith('/') ? path.slice(0, -1) : path;
		headings = $structure[path] || [];
	}
</script>

<nav class="container">
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
	<Related />
</nav>


<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		position: fixed;
		z-index: 1;
		max-width: 23ch;
	}

	.headings {
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
