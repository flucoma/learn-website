<script>
	export let title = '';
	export let url = '';
	export let blurb = '';
</script>

<div class='container raisedbox'>
	<a href={url}>
		<div>{title}</div>
		<p>{blurb}</p>
		<a href={url}>{url}</a>
	</a>
</div>

<style>
	.container {
		margin-top: 1em;
		margin-bottom: 1em;
		padding-top: 1em;
		padding-bottom: 0.5em;
	}
	.container:hover {
		box-shadow: rgb(255, 255, 255) -5px 5px, rgba(3, 113, 181, 0.2) -10px 10px, rgba(3, 113, 181, 0.1) -15px 15px, rgba(3, 113, 181, 0.05) -20px 20px;

	}
	a > p {
		color: var(--grey);
		margin: 0;
	}

	a:hover {
		background: transparent;
		color: var(--med-blue);
	}
	.container > a {
		color: black;
		text-decoration: none;
		width: 100%;
	}
</style>
