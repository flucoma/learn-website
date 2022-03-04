<script lang="ts">
	export let url: string = '';
	export let title: string = '';
	export let caption: string = title;
	export let width: number = 560;
	export let height: number = 315;
</script>

<div class="container">
	<iframe src={url} width="{width}" height="{height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
	</iframe>
	<div class="caption">
		<p>{caption}</p>
	</div>
</div>

<style>
	.container {
		padding-top: 1em;
		padding-bottom: 1em;
	}

	iframe {
		max-width: 100%;
		margin: 0 auto;
		display: block;
	}

	.caption :global(p) {
		font-style: italic;
		text-align: center;
		width: 80%;
		margin: 0 auto;
		font-size: 0.8rem;
	}
</style>
