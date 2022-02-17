<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import Crumbs from '$lib/components/Crumbs.svelte';
</script>

<svelte:head>
	<title>
		Learn FluCoMa
	</title>
</svelte:head>

<div class="container">
	<Header />
	<Crumbs />

	<div class="content">

		<slot />

	</div>
	
	<Footer />
</div>

<style lang="postcss">
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
		margin-bottom: 1em;
		flex: 1 0 auto;
	}

	@media (min-width: 1200px) {
		.content {
			grid-template-columns: auto min(var(--max-text-width), 100%) auto;
			grid-template-areas: 'navigation main related';
		}
	}

	@media (max-width: 1200px) {
		.content {
			grid-template-rows: auto auto;
			grid-template-areas:
				'navigation'
				'main';
		}
	}
</style>
