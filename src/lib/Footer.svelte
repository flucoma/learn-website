<script>
	import HR from '$lib/components/HR.svelte';
	import ArrowRight from '$lib/components/ArrowRight.svelte';
</script>

<footer>
	<HR />
	<div class="content">
		<a 
		target='_blank' 
		href='https://github.com/flucoma/learn-website/issues/new'
		>
		Problem? File an issue <ArrowRight />
		</a>
		
		<a 
		target='_blank'
		rel="external"
		href='https://flucoma.org'
		>
		Go to FluCoMa Home Page <ArrowRight />
		</a>
	</div>
</footer>

<style>
	footer {
		min-height: var(--footer-height);
	}
	.content {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-around;
		max-width: var(--max-text-width);
		margin: 0 auto;
	}

	.content > a {
		font-size: 0.8rem;
		text-decoration: none;
		display: grid;
		grid-template-columns: auto auto;
		place-items: center;
	}

	a:hover {
		background-color: transparent;
		color: var(--med-blue);
	}

</style>