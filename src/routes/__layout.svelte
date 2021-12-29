<script>
	import "../app.css";
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import Crumbs from '$lib/components/Crumbs.svelte';
    import TOC from '$lib/components/TOC.svelte';
</script>

<div class="container">
	<Header></Header>
	<Crumbs></Crumbs>

	<div class="content">
		<div class="navigation"> 
			<TOC />
		</div>

		<main class="main"> 
			<slot/> 
		</main>

		<div class="empty-right"></div>
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
	}

	.main {
		grid-area: main;
		min-width: var(--min-text-width);
		max-width: var(--max-text-width);
	}

	.navigation {
		grid-area: navigation;
		width: 25ch;
		height: max-content;
	}

	.empty-right {
		grid-area: empty-right;
		width: 25ch;
	}

	/* Media Queries */
	@media (min-width: 1200px) {
		.content {
			grid-template-columns: auto min(var(--max-text-width), 100%) auto;
			grid-template-areas: 'navigation main empty-right';
		}
	}

	@media (max-width: 1200px) {
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