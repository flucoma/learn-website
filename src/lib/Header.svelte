<script>
	import Search from '$lib/components/Search.svelte';
	import Hamburger from '$lib/components/Hamburger.svelte';
	let w;
	const breakpoint = 1200;
	let userExpand = false;
	const expandHandler = () => {
		userExpand = !userExpand;
	};

	$: navExpand = w >= breakpoint || userExpand;
</script>

<header class="container" role="navigation">
	{#if w < breakpoint}
		<Hamburger on:click={expandHandler} />
	{/if}
	{#if navExpand}
		<div class="links">
			{#if w >= breakpoint}
				<a class="logo-link" href="/">
					<img class="logo" src="/img/onlylogo.svg" alt="FluCoMa Logo" />
				</a>
			{/if}
			<a  class="nav-link" href="/learn">Learn</a>
			<a  class="nav-link" href="/explore">Explore</a>
			<a  class="nav-link" href="/reference">Reference</a>
		</div>
	{/if}
	<Search />
</header>

<svelte:window bind:innerWidth={w} />

<style lang="postcss">
	.container {
		display: grid;
		grid-template-columns: auto auto;
		place-items: center;
		background: var(--dark-blue);
		padding: 1em;
		gap: 3em;
	}

	@media (max-width: 1200px) {
		.container {
			display: flex;
			flex-direction: column;
			gap: 0.5em;
		}
	}

	.links {
		display: flex;
		flex-direction: row;
		margin: 0 auto;
		gap: 1em;
	}

	@media (max-width: 1200px) {
		.links {
			flex-direction: column;
			gap: 0.3em;
		}
	}

	.logo {
		width: 2em;
		height: 100%;
	}

	.logo-link {
		width: 2em;
		height: 100%;
	}

	.logo-link:hover {
		background: transparent;
	}

	.nav-link {
		font-family: var(--font);
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
