<script>
	import { page } from '$app/stores';
	import { structure } from '$lib/app.js';

	$: headings = $structure[$page.path] || [];
</script>

{#if headings.length > 0}
<div class="container">
	<div class="toc">Table of Contents</div>
	<div class="headings">
		{#each headings as h}
		<a href={h.url}>{h.text}</a>
		{/each}
	</div>
</div>
{/if}

<style lang='scss'>
	.container {
		position: fixed;
	}
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

	@media (max-width: $breakpoint) {
		.container {
			position: relative;
		}
	}
</style>
