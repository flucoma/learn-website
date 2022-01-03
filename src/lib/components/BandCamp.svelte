<script lang="ts">
	export let id: string = '';
	export let title: string = '';
	export let caption: string = title;
</script>

<div class="container">
	<iframe
		class="bandcamp-frame"
		{title}
		src="https://bandcamp.com/EmbeddedPlayer/album={id}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
		seamless
	/>

	<div class="caption">
		<p>{caption}</p>
	</div>
</div>

<style lang="postcss">
	.container {
		padding-top: 1em;
		padding-bottom: 1em;
	}

	.bandcamp-frame {
		max-width: 100%;
		margin: 0 auto;
		display: block;
		height: 120px;
	}

	.caption :global(p) {
		font-style: italic;
		text-align: center;
		width: 80%;
		margin: 0 auto;
		font-size: 0.8rem;
	}
</style>
