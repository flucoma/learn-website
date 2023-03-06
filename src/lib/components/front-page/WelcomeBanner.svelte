<script>
	import WelcomeButton from '$lib/components/front-page/WelcomeButton.svelte';
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

<style>
	#welcome-banner {
		padding-left: 2em;
		padding-right: 2em;
		margin-bottom: 1em;
		margin-top: 1em;
		padding-top: 2em;
		padding-bottom: 2em;
		gap: 2em;
		display: flex;
		flex-direction: row;
		background: rgb(255,255,255);
		background: linear-gradient(90deg, rgba(255,255,255,0.25) 55%, rgba(146,200,246,0.25) 82%, rgba(71,158,248,0.25) 100%);
		min-width: 100%;
		position: relative;
	}
	#welcome-left {
		max-width: 50%;
		display: flex;
		flex-direction: column;
	}
	#welcome-left > p {
		max-width: 100%;
		font-size: 20px;
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