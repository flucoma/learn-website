<script>
	import Search from '$lib/components/Search.svelte';
</script>
<div class="container">
	<div class="links">
		<a class="logo-link" href="/">
			<img class="logo" src="/img/onlylogo.svg" alt="FluCoMa Logo" />
		</a>
		<a class="nav-link" href="/overviews">Overviews</a>
		<a class="nav-link" href="/reference">Reference</a>
		<a class="nav-link" href="/madewithflucoma">Made with FluCoMa</a>
	</div>
	<Search />
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background: $dark-blue;
		padding: 1em;
	}

	/* Media Queries */
	@media (max-width: $breakpoint) {
		.container {
			gap: 0.5em;
			display: flex;
			flex-direction: column;
		}
	}

	.links {
		display: flex;
		flex-direction: row;
		margin: 0 auto;
		gap: 1em;
	}

	.logo {
		width: 2em;
		height: 100%;
	}

	.logo:hover {
		background: transparent;
	}

	.logo-link {
		width: 2em;
		height: 100%;
	}

	.nav-link {
		display: block;
		margin-top: auto;
		margin-bottom: auto;
		text-align: center;
		font-size: 1.5em;
		color: white;
		text-decoration: none;
	}

	.nav-link:hover {
		background: transparent;
		text-decoration: underline;

	}

	.nav-link:visited {
		color: white;
	}

	.nav-link:visited {
		color: white;
	}
</style>
