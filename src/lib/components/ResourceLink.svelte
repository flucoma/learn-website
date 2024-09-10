<script>
	export let title = '';
	export let url = '';
	export let blurb = '';
</script>

<div class='container'>
	<a href={url}>
		<div class="content">
			<h3 class="title">{title}</h3>
			<p class="blurb">{blurb}</p>
			<span class="url">{url}</span>
		</div>
	</a>
</div>

<style>
	.container {
		margin: 1em 0;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.container:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
	}

	.container > a {
		text-decoration: none;
		color: inherit;
		display: block;
		background-color: white;
	}

	.content {
		padding: 1.5em;
	}

	.title {
		font-size: 1.2rem;
		font-weight: bold;
		color: var(--dark-blue);
		margin: 0 0 0.5em;
		line-height: 1.3;
	}

	.blurb {
		font-size: 0.9rem;
		color: #595959;
		margin: 0 0 0.5em;
		line-height: 1.4;
	}

	.url {
		font-size: 0.8rem;
		color: var(--med-blue);
		word-break: break-all;
	}

	.container:hover .title {
		color: var(--med-blue);
	}
</style>
