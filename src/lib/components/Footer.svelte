<script>
	import ArrowRight from '$lib/components/ArrowRight.svelte';

	const links = [
		{ href: "https://github.com/flucoma/learn-website/issues/new", text: "File an issue" },
		{ href: "https://flucoma.org", text: "FluCoMa Home" }
	];
</script>

<footer>
	<div class="content">
		{#each links as { href, text }}
			<a {href} target="_blank" rel="noreferrer">
				{text} <ArrowRight white={true} />
			</a>
		{/each}
	</div>
</footer>

<style>
	footer {
		min-height: var(--footer-height);
		background-color: var(--dark-blue);
		display: grid;
		place-items: center;
	}

	.content {
		display: flex;
		justify-content: space-around;
		width: 100%;
		padding: 1rem;
	}

	.content > a {
		color: white;
		font-size: 1rem;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: opacity 0.2s ease-in-out;
	}

	a:hover {
		opacity: 0.8;
	}
</style>
