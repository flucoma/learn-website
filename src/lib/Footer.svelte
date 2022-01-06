<script>
	import HR from '$lib/components/HR.svelte';
</script>

<footer>
	<HR />
	<div class="content">
		<a target='_blank' href='https://github.com/flucoma/learn-website/issues/new'>Problem? File an issue</a>
		<a target='_blank' href='https://flucoma.org'>Go to FluCoMa Home Page</a>

	</div>
</footer>

<style>
	footer {
		margin: 1em;
		text-align: right;
	}

	.content {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-around;
	}

	.content > a {
		font-size: 0.8rem;
		text-decoration: none;
	}

</style>