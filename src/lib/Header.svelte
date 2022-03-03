<script>
	import Search from '$lib/components/Search.svelte';
	import Hamburger from '$lib/components/Hamburger.svelte';
	import PopoverNav from '$lib/components/PopoverNav.svelte';
	import { nav_expanded } from '$lib/app';

	const expandHandler = () => { $nav_expanded = !$nav_expanded };
</script>

<header>
	<Hamburger on:click={expandHandler} />
	<div class="central-area">
		<a class="logo-link" href="/">
			<img class="logo" src="/img/onlylogo.svg" alt="FluCoMa Logo" />
		</a>
	</div>
	<Search />
</header>

<PopoverNav />

<style lang="postcss">
	header {
		display: grid;
		grid-template-columns: 20% auto 20%;
		place-items: center;
		justify-content: space-around;
		background: var(--dark-blue);
		height: 40px;
	}

	.logo {
		width: 24px;
		height: 27px;
		margin-top: 0.3em;
	}

	.logo-link {
		width: 2em;
		height: 100%;
	}

	.logo-link:hover {
		background: transparent;
	}
</style>
