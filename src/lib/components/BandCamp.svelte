<script lang="ts">
	export let url: string = '';
	export let id: string = '';
	export let title: string = '';
	export let caption: string = title;
	export let width: number = 560;
	export let height: number = 315;
</script>

<div class="container">
	<iframe
	title={title} 
	src="https://bandcamp.com/EmbeddedPlayer/album={id}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" 
	seamless
	/>
		
	<div class="caption">
		<p>{caption}</p>
	</div>
</div>

<style lang='scss'>
	.container {
		padding-top: 1em;
		padding-bottom: 1em;

		iframe {
			max-width: 100%;
			margin: 0 auto;
			display: block;
			height: 120px;
		}
	}

	.caption :global(p) {
		font-style: italic;
		text-align: center;
		width: 80%;
		margin: 0 auto;
		font-size: 0.8rem;
	}
</style>
