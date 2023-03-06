<script>
	import Search from '$lib/components/Search.svelte';
	import Hamburger from '$lib/components/Hamburger.svelte';
	import PopoverNav from '$lib/components/PopoverNav.svelte';
	import { nav_expanded } from '$lib/app';

	const expandHandler = () => {
		$nav_expanded = !$nav_expanded;
	};

	let w = 0;
</script>

<svelte:window bind:innerWidth={w} />

<header>
	{#if w > 1200}
	<div class='logo-area'>
		<a class="logo-link" href="/">
			<img class="logo" src="/img/onlylogo.svg" alt="FluCoMa Logo" />
			<a class="title" href="/"> FluCoMa Learn </a>
		</a>
		<div class="links">
			<a href="/learn">Learn</a>
			<a href='/reference'>Reference</a>
			<a href="/explore">Explore</a>
			<a href="https://discourse.flucoma.org" target='_blank' rel='noreferrer'>Discourse</a>
		</div>
	</div>
	<Search />
	{:else}
	<Hamburger on:click={expandHandler} open={$nav_expanded} />
	<a class="logo-link" href="/">
		<img class="logo" src="/img/onlylogo.svg" alt="FluCoMa Logo" />
	</a>
	<Search />
	{/if}
</header>

<PopoverNav />

<style >
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background: var(--dark-blue);
		height: 55px;
		position: fixed;
		width: 100%;
		z-index: 10000;
		padding-left: 2em;
		padding-right: 2em;
	}

	.links {
		display: flex;
		flex-direction: row;
		justify-content: left;
		gap: 1em;
	}

	.links > a {
		color: white;
		text-decoration: none;
	}

	.links > a:hover {
		text-decoration: underline;
		background: transparent;
	}

	.title {
		color: white;
		text-decoration: none;
	}

	.title:hover {
		text-decoration: underline;
		background-color: transparent;
	}

	.logo-area {
		display: flex;
		align-items: center;
		justify-content: left;
		gap: 2em;
		font-family: var(--font);
	}

	.logo {
		width: 24px;
		height: 27px;
	}

	.logo-link {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
		text-decoration: none;
	}

	.logo-link:hover {
		background: transparent;
	}
</style>
