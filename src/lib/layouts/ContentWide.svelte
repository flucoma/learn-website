<script>
	import Crumbs from '$lib/components/Crumbs.svelte';
</script>

<Crumbs />

<div class="wrapper">
	<div class="main">
		<slot />
	</div>
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
</style>
