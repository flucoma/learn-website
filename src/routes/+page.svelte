<script>
	import _ from 'lodash';
	import { config, db } from '$lib/app';
	import Item from '$lib/components/front-page/Item.svelte'
	import WelcomeButton from '../lib/components/WelcomeButton.svelte';
	
	var learn = db.filter(x => x.section === 'learn');
	var explore = db.filter(x => x.section === 'explore');
	
	// Retrieve the article details from the database
	const featuredLearn = learn.filter(x => x.url === config.frontPage.featuredLearn.url)[0];
	const featuredExplore = explore.filter(x => x.url === config.frontPage.featuredExplore.url)[0];
	
	learn = learn.filter(x => x.url !== config.frontPage.featuredLearn.url);
	explore = explore.filter(x => x !== config.frontPage.featuredExplore.url);
	
	const randomLearn = _.shuffle(learn).slice(0, 6);
	const randomExplore = _.shuffle(explore).slice(0, 6);
</script>

<section id='welcome-banner'>
	<div id="welcome-left">
		<h1><strong>Welcome to the Fluid Corpus Manipulation Learn Platform!</strong></h1>
		<p>The Fluid Corpus Manipulation project (FluCoMa) instigates new musical ways of exploiting ever-growing banks of sound and gestures within the digital composition process, by bringing breakthroughs of signal decomposition DSP and machine learning to the toolset of techno-fluent computer composers, creative coders and digital artists.</p>
		<div id="buttons">
			<WelcomeButton url='/getting-started' text='Getting Started'/>
			<WelcomeButton url='/learn' text='Learn'/>
			<WelcomeButton url='/explore' text='Explore'/>
			<WelcomeButton url='/reference' text='Reference'/>
		</div>
	</div>
	<div id='welcome-right'>
		<img id='logo' src="/img/onlylogo.svg" alt="FluCoMa Logo">
	</div>
</section>

<section class='manual-feature'>
	<Item item={featuredLearn} />
	<Item item={featuredExplore} />

</section>

<section class='learn feature'>
	<h2>Previously Featured: Learn</h2>
	<div class="feature-items">
		{#each randomLearn as item}
		<Item item={item}/>
		{/each}
	</div>
</section>

<section class='explore feature'>
	<h2>Previously Featured: Explore</h2>
	<div class="feature-items">
		{#each randomExplore as item}
		<Item item={item}/>
		{/each}
	</div>
</section>

			
<style>
	section {
		padding-left: 2em;
		padding-right: 2em;
		margin-bottom: 1em;
		margin-top: 1em;
	}
	.feature-items {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 2em;
		max-width: 100%;
	}
	#welcome-banner {
		padding-top: 2em;
		padding-bottom: 2em;
		gap: 2em;
		display: flex;
		flex-direction: row;
		background: rgb(255,255,255);
		background: linear-gradient(90deg, rgba(255,255,255,0.25) 55%, rgba(146,200,246,0.25) 82%, rgba(71,158,248,0.25) 100%);
		min-width: 200px;
	}
	#welcome-left {
		max-width: 50%;
		display: flex;
		flex-direction: column;
	}
	#welcome-left > p {
		max-width: 80%;
	}
	@media (max-width: 768px) {
		#logo, #welcome-right {
			display: none;
		}
		#welcome-left {
			max-width: 100%;
		}
	}
	#welcome-left > #buttons {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
	}
	#logo {
		width: 100%;
		max-height: 500px;
	}
</style>