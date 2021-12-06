<script lang="ts">
	export let src: string = '';
	export let label: string = '';

	const fileName = src.split('/').slice(-1)
</script>

<div class="container">
	<audio controls>
		<source {src} type="audio/mp3" />
		Your browser does not support the audio tag.
	</audio>
	<div class="label">
		<a href={src}>{ fileName }:</a> { label } 
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		gap: 1em;
		align-items: center;
		
		audio {
			max-width: 50%;
		}
	
	}
	.label {
		font-size: 0.75rem;
	}
</style>
