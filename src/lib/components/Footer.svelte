<script>
	import ArrowRight from '$lib/components/ArrowRight.svelte';

	const links = [
		{ href: 'https://github.com/flucoma/learn-website/issues/new', text: 'File an issue' },
		{ href: 'https://flucoma.org', text: 'FluCoMa Home' }
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
		background-color: var(--color-primary-800);
		display: grid;
		place-items: center;
	}

	.content {
		display: flex;
		justify-content: space-around;
		width: 100%;
		padding: var(--space-4);
	}

	.content > a {
		color: var(--color-text-inverted);
		font-size: var(--text-base);
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: var(--space-2);
		transition: opacity var(--transition-fast);
		border-radius: var(--radius-sm);
		padding: var(--space-1) var(--space-2);
	}

	.content > a:hover {
		opacity: 0.8;
		background: transparent;
	}
</style>
