<script>
	import Audio from '$lib/components/Audio.svelte';
</script>

<div class="container">
	<div class="title">Self-similarity matrix constructed from spectral analsis of Tremblay-AaS-VoiceQC-B2K-M</div>
	<img src="/ref/noveltyslice/ssm.svg" alt="self similarity matrix" />
	<Audio src="/audio/Tremblay-AaS-VoiceQC-B2K-M.mp3" />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		place-items: center;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	.title {
		font-style: italic;
	}

	img {
		max-width: 100%;
	}
</style>
