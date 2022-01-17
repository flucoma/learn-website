<script lang="ts">
	export let src: string = '';
	export let label: string = '';
</script>

<video controls>

    <source src={src}
            type="video/mp4">

    Sorry, your browser doesn't support embedded videos.
</video>

<figcaption class="label">
	{label}
</figcaption>

<style lang="postcss">
	.label {
		text-align: center;
		font-size: 0.8rem;
		font-style: italic;
	}
</style>
