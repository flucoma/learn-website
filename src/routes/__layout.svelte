<script>
	import '../app.scss';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import Crumbs from '$lib/components/Crumbs.svelte';
	import TOC from '$lib/components/TOC.svelte';
</script>

<div class="container">
	<Header />
	<Crumbs />

	<div class="content">
		<div class="navigation">
			<TOC />
		</div>
		<div class="main">
			<slot />
		</div>

		<div class="empty-right" />
	</div>

	<Footer />
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		display: grid;
		justify-content: center;
		margin-left: 1em;
		margin-right: 1em;
	}

	.main {
		grid-area: main;
		min-width: $min-text-width;
		max-width: $max-text-width;
	}

	.navigation {
		grid-area: navigation;
		width: 20ch;
		height: max-content;
	}

	.empty-right {
		grid-area: empty-right;
		width: 20ch;
	}

	/* Media Queries */
	@media (min-width: $breakpoint) {
		.content {
			grid-template-columns: auto min($max-text-width, 100%) auto;
			grid-template-areas: 'navigation main empty-right';
		}
	}

	@media (max-width: $breakpoint) {
		.content {
			grid-template-rows: auto auto;
			grid-template-areas:
				'navigation'
				'main';
		}

		.empty-right {
			display: none;
		}
	}
</style>
