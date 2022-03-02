<script>
	import Landing from '$lib/components/cards/Landing.svelte';
	import { fly } from 'svelte/transition';
	import { nav_expanded } from '$lib/app';
</script>

{#if $nav_expanded}
<nav class='popover' 
transition:fly={{ duration:200, y:0, x:-200 }}
>
	<h2>Navigation</h2>
	<Landing link='/learn'>
		<h2 slot="title">Learn</h2>
		<p slot="blurb" class='blurb'>
		A variety of articles and guides discussing machine listening and machine learning, sometimes relating to specific FluCoMa technology and sometimes reflecting more broadly.
		</p>
	</Landing>
	
	<Landing link='/reference'>
		<h2 slot="title">References</h2>
		<p slot="blurb" class='blurb'>
		The references outline the underlying algorithms of the FluCoMa toolkit in more detail. We try to steer clear from specific implementation details and instead focus on the concepts behind each algorithm and to help illuminate what goes on under the hood.
		</p>
	</Landing>
	
	<Landing link='/explore'>
		<h2 slot="title">Explore</h2>
		<p slot="blurb" class='blurb'>
		Made with FluCoMa draws attention to people like you. Makers who use the FluCoMa toolkit or are involved in the wider community. We want to highlight what is out there to try and cultivate opportunities for learning and to situate this technology within a community of techno-fluent musicians.
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