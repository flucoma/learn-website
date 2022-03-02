<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import Crumbs from '$lib/components/Crumbs.svelte';
	import { fly } from 'svelte/transition';
	import { nav_expanded } from '$lib/app';
</script>

<svelte:head>
	<title>
		Learn FluCoMa
	</title>
</svelte:head>

<svelte:body class:noscroll={$nav_expanded} />

{#if $nav_expanded}
<div transition:fly={{duration:200}} class="overlay" on:click={ () => { $nav_expanded = false }}></div>
{/if}

<div class="container">
	<Header />
	<Crumbs />

	<main class="content">
		<slot />
	</main> 
	
	<Footer />
</div>

<style lang="postcss">
	.overlay {
		background-color: hsl(240, 11%, 81%);
		min-height: 100%;
		width: 100%;
		position: absolute;
		opacity: 0.6;
		top: 0;
		left: 0;
		cursor: pointer;
		z-index: 98
	}

	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		display: grid;
		justify-content: center;
		padding-left: 1em;
		padding-right: 1em;
		margin-bottom: 1em;
		flex: 1 0 auto;
	}

	@media (min-width: 1200px) {
		.content {
			grid-template-columns: auto min(var(--max-text-width), 100%) auto;
			grid-template-areas: 'navigation main blank';
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
