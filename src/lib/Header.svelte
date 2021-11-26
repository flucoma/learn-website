<div class="container">
	<div class="links">
		<a class="logo-link" href="/">
			<img class="logo" src="/img/onlylogo.svg" alt="FluCoMa Logo" />
		</a>
		<a class="nav-link" href="/overviews">Overviews</a>
		<a class="nav-link" href="/guides">Guides</a>
		<a class="nav-link" href="/reference">Reference</a>
		<a class="nav-link" href="/made-with-flucoma">Made with FluCoMa</a>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background: $dark-blue;
		justify-content: space-around;
		align-items: center;
		min-height: 3em;
		padding: 1em;
		gap: 2em;
	}

	.links {
		display: flex;
	}

	.logo {
		width: 2em;
		height: 100%;
	}

	.logo-link {
		width: 2em;
		height: 100%;
	}

	.nav-link {
		padding-right: 1em;
		padding-left: 1em;
		text-align: center;
		font-size: 1.5em;
		color: white;
	}

	.nav-link:visited {
		color: white;
	}

	.nav-link:hover {
		background: #0372b5;
	}

	.nav-link:visited {
		color: white;
	}

	/* Media Queries */
	@media (min-width: 1200px) {
	}
	@media (max-width: 1200px) {
		.container {
			gap: 0.5em;
		}

		.logo {
			display: none;
		}

		.links {
			flex-direction: column;
		}
	}
</style>
