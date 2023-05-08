<script>
	import Map from './Map.svelte';
	import Regressor from './Regressor.svelte';
	import Classifier from './Classifier.svelte';
	import ContentGallery from './ContentGallery.svelte';
</script>

<br>
<br>
<br>
<h1>Getting Started</h1>
<h2>Installation</h2>
<p class='installation-description'>
	Start by installing the package in your creative coding environement. Max users can download the latest public version via the built-in package manager. To install the latest copy, see the detailled <a href='/installation'>installation instructions</a>.
</p>
<br>
<h2>Tutorials</h2>

<div class="widgets">
	<Map />
	<div class="pair">
		<Regressor width={150} height={150} />
		<Classifier width={300} height={150} />
	</div>
	<ContentGallery />
</div>

<style>
	h1,
	h2 {
		text-align: center;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
	.widgets {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
	}
	.pair {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
		justify-content: center;
		margin-bottom: 3em;
	}

	.installation-description {
		max-width: max(70ch, 50%);
		margin: 0 auto;
	}
</style>
