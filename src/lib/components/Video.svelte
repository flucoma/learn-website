<script type="ts">
	export let url: string = '';
	export let label = '';

	url = url.replace(/\.[^/.]+$/, ''); // remove file extension
</script>

<figure>
	<video controls loop>
		<source src={`${url}.mp4`} type="video/mp4" />
		<source src={`${url}.webm`} type="video/webm" />
		<p>Your browser doesn't support HTML5 video.</p>
		<track kind="captions" />
	</video>

	<figcaption class="caption">
		{label}
	</figcaption>
</figure>

<style>
	figure {
		display: grid;
		grid-template-rows: auto auto;
		place-items: center;
		gap: 1em;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	video {
		max-width: 100%;
	}

	.caption {
		font-size: 0.75rem;
	}
</style>
