<script>
	import { page } from '$app/stores';
	import { structure } from '$lib/app.js';
	let headings = [''];

	$: {
		let path = $page.url.pathname;
		path = path.endsWith('/') ? path.slice(0, -1) : path;
		headings = structure[path] || [];
	}
</script>

<div class="container">
	{#if headings.length > 0}
		<h3 class="toc">Table of Contents</h3>
		<div class="headings">
			{#each headings as heading}
				<a href={heading.url}>{heading.text}</a>
			{/each}
		</div>
	{/if}
</div>


<style >
	.container {
		display: flex;
		flex-direction: column;
		position: fixed;
		max-width: 20ch;
		position: relative;
		margin-top: 0.25em;
		z-index: 0;
	}

	.headings {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	a {
		text-decoration: none;
		font-size: 1rem;
	}
</style>
