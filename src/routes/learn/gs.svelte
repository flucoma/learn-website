<script>
	import Map from '$lib/components/getting-started/Map.svelte';
	import Classifier from '$lib/components/getting-started/Classifier.svelte';
</script>

<div class="grid">
	<Map />
	<Classifier />
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, auto);
		gap: 1em;
		width: 100%;
		align-content: center;
		justify-content: space-around;
	}
</style>
