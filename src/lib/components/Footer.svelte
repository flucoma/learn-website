<script>
	import ArrowRight from '$lib/components/ArrowRight.svelte';
</script>

<footer>
	<div class="content">
		<a target="_blank" rel='noreferrer' href="https://github.com/flucoma/learn-website/issues/new">
			Problem? File an issue <ArrowRight white={true}/>
		</a>

		<a target="_blank" rel="noreferrer" href="https://flucoma.org">
			Go to FluCoMa Home Page <ArrowRight white={true}/>
		</a>
	</div>
</footer>

<style>
	footer {
		position: relative;
		min-height: var(--footer-height);
		background-color: var(--dark-blue);
		display: grid;
		place-items: center;
	}
	.content {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-content: space-around;
		place-items: center;
		padding: 0;
		margin: 0;
		height: 100%;
		width: var(--max-text-width);
	}

	.content > a {
		color: white;
		font-size: 1rem;
		text-decoration: none;
		display: grid;
		grid-template-columns: auto auto;
		place-items: center;
	}

	a:hover {
		background-color: transparent;
	}
</style>
