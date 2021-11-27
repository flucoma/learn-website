<script lang='ts'>
	import { slide } from 'svelte/transition';
	export let id: string = '';
	export let caption: string = '';
	export let expanded: boolean = false;

	function clickHandler(e) {
		expanded = !expanded;
	}
</script>

<div class="container" {id}>
	<button id="top-bar" on:click={clickHandler}>
		<div id="caption">
			<div id="status">
				{#if expanded}-{:else}+{/if}
			</div>
			<div>
				{caption}
			</div>
		</div>
	</button>

	{#if expanded}
		<div id="content" in:slide={{ duration: 200 }} out:slide={{ duration: 200 }}>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	#top-bar {
		font-family: $font;
		display: flex;
		font-size: 15px;
		min-height: 40px;
		flex-direction: row;
		justify-content: space-between;
		border: 1px solid #f7f7f7;
		background: #ededed;
		box-shadow: none;
		border-radius: 0px;
		margin: 0px;
	}

	#top-bar:hover {
		background-color: #dfdfdf;
	}

	#top-bar:active {
		background-color: #cecece;
		color: black;
	}

	#top-cap {
		width: 15px;
		margin-top: 9px;
		margin-left: 5px;
		margin-right: 5px;
	}
	#figure {
		font-style: italic;
		min-width: 80px;
		white-space: nowrap;
	}

	#caption {
		text-align: left;
		margin-left: 1px;
		display: flex;
		flex-direction: row;
		gap: 0.3em;
	}

	#status {
		min-width: 10px;
	}

	#caption,
	#figure {
		margin-top: 8px;
		margin-bottom: 8px;
	}

	#top-cap {
		display: flex;
		flex-direction: row;
	}
</style>
