<script>
	export let txt = '';
</script>

<figure class="big-quote">
	<blockquote>
		{@html txt}
	</blockquote>
</figure>

<style>
	.big-quote {
		margin: var(--space-10) auto;
		padding: 0;
		max-width: 85%;
		text-align: center;
	}

	blockquote {
		margin: 0;
		padding: var(--space-6) var(--space-8);
		font-size: var(--text-xl);
		font-weight: var(--font-normal);
		font-style: italic;
		line-height: var(--leading-relaxed);
		color: var(--color-primary-800);
		position: relative;
		border: none;
		background: linear-gradient(
			135deg,
			rgba(28, 164, 252, 0.04) 0%,
			rgba(28, 164, 252, 0.01) 100%
		);
		border-radius: var(--radius-md);
	}

	blockquote::before {
		content: '“';
		position: absolute;
		top: -0.2em;
		left: -0.05em;
		font-size: 5rem;
		font-weight: var(--font-extrabold);
		line-height: 1;
		color: rgba(28, 164, 252, 0.12);
		font-style: normal;
		font-family: Georgia, 'Times New Roman', serif;
		pointer-events: none;
	}

	blockquote::after {
		content: '”';
		position: absolute;
		bottom: -0.5em;
		right: -0.05em;
		font-size: 5rem;
		font-weight: var(--font-extrabold);
		line-height: 1;
		color: rgba(28, 164, 252, 0.12);
		font-style: normal;
		font-family: Georgia, 'Times New Roman', serif;
		pointer-events: none;
	}

	@media (max-width: 768px) {
		.big-quote {
			max-width: 95%;
		}
		blockquote {
			font-size: var(--text-md);
			padding: var(--space-5) var(--space-6);
		}
		blockquote::before,
		blockquote::after {
			font-size: 3rem;
		}
	}
</style>
