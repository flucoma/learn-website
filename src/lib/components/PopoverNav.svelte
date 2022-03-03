<script>
	import Landing from '$lib/components/cards/Landing.svelte';
	import { fly } from 'svelte/transition';
	import { nav_expanded } from '$lib/app';
</script>

{#if $nav_expanded}
<nav class='popover' 
transition:fly={{ duration:200, y:0, x:-200 }}
>
	<h3>Navigation</h3>
	<Landing link='/learn'>
		<h2 slot="title">Learn</h2>
		<p slot="blurb" class='blurb'>
		Articles discussing machine learning and machine listening, sometimes relating to FluCoMa technology and sometimes reflecting more broadly.
		</p>
	</Landing>
	
	<Landing link='/reference'>
		<h2 slot="title">References</h2>
		<p slot="blurb" class='blurb'>
		The references outline the underlying algorithms of the FluCoMa toolkit in more detail.
		</p>
	</Landing>
	
	<Landing link='/explore'>
		<h2 slot="title">Explore</h2>
		<p slot="blurb" class='blurb'>
		Explore draws attention to the FluCoMa community. It highlights how people are using FluCoMa (and related technology) through podcasts and deep explorations of their work.
		</p>
	</Landing>
</nav>
{/if}

<style>
    .popover {
		opacity: 1;
		display: flex;
		flex-direction: column;
		gap: 1em;
		position: fixed;
		top: 50px; left: 0;
		background-color: white;
		opacity: 1;
		width: min(500px, 50%);
		height: 100vh;
		text-align: left;
		padding: 1.5em;
		z-index: 99;
	}

	.blurb {
		color: grey;
		text-align: left;
	}
</style>