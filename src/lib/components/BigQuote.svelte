<script>
	export let txt = '';
</script>

<blockquote class="container">
	{@html txt}
</blockquote>

<style>
	.container {
		font-size: 1.25rem;
		margin: 1.5em;
		padding: 1.5em;
		font-style: italic;
		border-left: 4px solid rgb(191, 191, 191);
		background-color: rgba(128, 128, 128, 0.04);
	}
	.container:before {
		color: #ccc;
		content: open-quote;
		font-size: 3em;
		margin-right: 0.25em;
	}
	.container:after {
		color: #ccc;
		content: close-quote;
	}
	.container:after,
	.container:before {
		font-size: 2em;
		line-height: 0.1em;
		vertical-align: -0.4em;
	}
</style>
