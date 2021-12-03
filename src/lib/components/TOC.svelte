<script>
	import { page } from '$app/stores';
	import { structure } from '$lib/app.js';


	$: headings = $structure[$page.path] || [];
	$: console.log(headings)
</script>

{#if headings.length > 0}
	<div class="toc">Table of Contents</div>
	<div class="headings">
		{#each headings as h}
			<a href={h.url}>{h.text}</a>
		{/each}
	</div>
{/if}


<style>
	.toc {
		font-size: 1.1rem;
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
</style>
