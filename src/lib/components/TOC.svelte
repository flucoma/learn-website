<script>
	import { page } from '$app/stores';
	import { structure } from '$lib/app.js';

	$: headings = $structure[$page.url.pathname] || [];
</script>

{#if headings.length > 0}
<nav class="container">
	<div class="toc">Table of Contents</div>
	<div class="headings">
		{#each headings as h}
			<a href={h.url}>{h.text}</a>
		{/each}
	</div>
</nav>
{/if}

<style lang="postcss">
	.container {
		position: fixed;
		z-index: 1;
		max-width: 23ch;
	}

	.toc {
		font-size: 1rem;
		margin-bottom: 1em;
		font-weight: bold;
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
		}
	}
</style>
