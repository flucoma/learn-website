<script>
	import TOC from '$lib/components/TOC.svelte';
	import Crumbs from '$lib/components/Crumbs.svelte';
</script>

<Crumbs />

<div class="wrapper">
	<div class="navigation">
		<TOC />
	</div>

	<div class="main">
		<slot />
	</div>

	<div class="related" />
</div>

<style >
	.wrapper {
		display: grid;
		justify-content: center;
		margin-left: 1em;
		margin-right: 1em;
		margin-bottom: 1em;
		flex: 1 0 auto;
	}

	@media (min-width: 1200px) {
		.wrapper {
			grid-template-columns: auto 75% auto;
			grid-template-areas: 'navigation main blank';
		}
	}

	@media (max-width: 1200px) {
		.wrapper {
			grid-template-rows: auto auto;
			grid-template-areas:
				'navigation'
				'main';
		}
	}

	.main {
		grid-area: main;
		display: flex;
		flex-direction: column;
	}

	.navigation {
		grid-area: navigation;
		width: 25ch;
		height: max-content;
	}

	.related {
		grid-area: related;
		width: 25ch;
	}

	@media (max-width: 1200px) {
		.navigation {
			width: 100%;
		}

		.related {
			display: none;
		}
	}
</style>
