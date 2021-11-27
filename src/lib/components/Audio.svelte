<script lang="ts">
	export let src: string = '';
</script>

<div class="container">
	<audio controls>
		<source {src} type="audio/mp3" />
		Your browser does not support the audio tag.
	</audio>
</div>

<style>
	.container {
		display: grid;
		place-items: center;
	}
</style>
