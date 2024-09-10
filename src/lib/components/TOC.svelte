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

{#if headings.length > 0}
<div class="toc-container">
		<h3 class="toc-title">Table of Contents</h3>
		<nav class="toc-nav">
			{#each headings as heading}
				<a href={heading.url} class="toc-link" style="padding-left: {heading.depth * 0.5}em">
					{heading.text}
				</a>
			{/each}
		</nav>
	</div>
{/if}

<style>
	.toc-container {
		background-color: white;
		border-radius: 12px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 1em;
		margin-top: 1em;
		max-width: 300px;
		width: 100%;
	}

	.toc-title {
		font-size: 1.2rem;
		font-weight: bold;
		color: var(--dark-blue);
		margin: 0 0 0.5em;
		/* line-height: 1.3; */
	}

	.toc-nav {
		display: flex;
		flex-direction: column;
	}

	.toc-link {
		font-size: 0.9rem;
		color: var(--dark-blue);
		text-decoration: none;
		padding: 0.25em 0.5em;
		border-left: 2px solid transparent;
	}

	.toc-link:hover {
		color: var(--med-blue);
		background-color: rgba(146, 200, 246, 0.15);
		border-left-color: var(--med-blue);
	}

	/* Media query for smaller screens */
	@media (max-width: 1200px) {
		.toc-container {
			max-width: 250px;
			margin: 1em 2em 1em 0;
		}
	}

	@media (max-width: 768px) {
		.toc-container {
			max-width: none;
			width: 100%;
			margin: 1em 0;
		}
	}
</style>
