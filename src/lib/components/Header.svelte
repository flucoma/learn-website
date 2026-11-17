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
		<div class="logo-area">
			<a class="logo-link" href="/">
				<img class="logo" src="/img/onlylogo.svg" alt="FluCoMa Logo" />
				<span class="title">FluCoMa Learn</span>
			</a>
			<nav class="links">
				<a href="/learn">Learn</a>
				<a href="/reference">Reference</a>
				<a href="/explore">Explore</a>
				<a href="/podcast">Podcast</a>
				<a href="https://discourse.flucoma.org" target="_blank" rel="noreferrer">Discourse</a>
			</nav>
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

<style>
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background: var(--color-primary-800);
		height: var(--header-height);
		position: fixed;
		width: 100%;
		z-index: 10000;
		padding-left: var(--space-8);
		padding-right: var(--space-8);
	}

	.links {
		display: flex;
		flex-direction: row;
		gap: var(--space-4);
	}

	.links > a {
		color: var(--color-text-inverted);
		text-decoration: none;
		font-size: var(--text-base);
	}

	.links > a:hover {
		text-decoration: underline;
		background: transparent;
		color: var(--color-text-inverted);
	}

	.title {
		color: var(--color-text-inverted);
		font-size: var(--text-md);
		font-weight: var(--font-bold);
	}

	.logo-area {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		font-family: var(--font-sans);
	}

	.logo {
		width: 24px;
		height: 27px;
	}

	.logo-link {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-2);
		text-decoration: none;
	}

	.logo-link:hover {
		background: transparent;
	}
</style>
