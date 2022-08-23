<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { fly } from 'svelte/transition';
	import { nav_expanded, blur } from '$lib/app';

	const scroll = e => {
		if ($nav_expanded) {
			e.preventDefault();
		}
	};
</script>

<svelte:head>
	<title>Learn FluCoMa</title>
</svelte:head>

<svelte:body class:noscroll={$nav_expanded === true} on:mousewheel|nonpassive={scroll} />

{#if $nav_expanded || $blur}
	<div
		transition:fly={{ duration: 200 }}
		class="overlay"
		on:click={() => {
			$nav_expanded = false;
		}}
	/>
{/if}

<div class="container">
	<Header />

	<main class="content">
		<slot />
	</main>

	<Footer />
</div>

<style lang="postcss">
	.overlay {
		background-color: hsl(240, 11%, 81%);
		height: 1000vh;
		width: 100%;
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;
		cursor: pointer;
		z-index: 98;
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
</style>
