<script lang="ts">
	export let src: string = '';
	export let label: string = '';

	let fileName = src.split('/').slice(-1);
</script>

<div class="container">
	<audio controls class="audio-player">
		<source {src} type="audio/mp3" />
		Your browser does not support the audio tag.
	</audio>
	<div class="label">
		<a href={src}>{fileName} :</a>
		{label}
	</div>
</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		gap: 1em;
		align-items: center;
	}

	.audio-player {
		max-width: 50%;
	}

	.label {
		font-size: 0.75rem;
	}
</style>
