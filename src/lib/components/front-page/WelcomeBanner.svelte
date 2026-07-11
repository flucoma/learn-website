<script>
	import Button from '$lib/components/Button.svelte';
</script>

<section class="welcome-banner">
	<div class="welcome-left">
		<h1>Welcome to the Fluid Corpus Manipulation Learn Platform</h1>
		<p class="welcome-subtitle">
			The Fluid Corpus Manipulation project (FluCoMa) instigates new musical ways of
			exploiting ever-growing banks of sound and gestures within the digital composition
			process, by bringing breakthroughs of signal decomposition DSP and machine learning
			to the toolset of techno-fluent computer composers, creative coders and digital artists.
		</p>
		<div class="welcome-buttons">
			<Button href="/learn/getting-started" label="Getting Started" width="160px" height="44px" />
			<Button href="/learn" label="Learn" width="160px" height="44px" />
			<Button href="/reference" label="Reference" width="160px" height="44px" />
			<Button href="/explore" label="Explore" width="160px" height="44px" />
		</div>
	</div>
	<div class="welcome-right">
		<img class="welcome-logo" src="/img/onlylogo.svg" alt="FluCoMa Logo" />
	</div>
</section>

<style>
	.welcome-banner {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-12);
		padding: var(--space-12) var(--space-8);
		margin: var(--space-4) 0 var(--space-8);
		background:
			linear-gradient(
				105deg,
				rgba(255, 255, 255, 0) 40%,
				rgba(146, 200, 246, 0.15) 70%,
				rgba(71, 158, 248, 0.2) 100%
			);
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.welcome-banner::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			var(--color-primary-200) 30%,
			var(--color-primary-200) 70%,
			transparent
		);
	}

	.welcome-left {
		flex: 1;
		max-width: 55%;
		display: flex;
		flex-direction: column;
	}

	.welcome-left h1 {
		font-size: var(--text-3xl);
		font-weight: var(--font-extrabold);
		margin: 0 0 var(--space-5);
		line-height: var(--leading-tight);
		color: var(--color-primary-900);
	}

	.welcome-subtitle {
		font-size: var(--text-md);
		line-height: var(--leading-relaxed);
		color: var(--color-text-muted);
		margin: 0 0 var(--space-8);
		max-width: 55ch;
	}

	.welcome-buttons {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--space-3);
	}

	.welcome-right {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.welcome-logo {
		width: 100%;
		max-width: 280px;
		max-height: 280px;
		opacity: 0.85;
		filter: drop-shadow(0 4px 12px rgba(8, 60, 100, 0.12));
	}

	@media (max-width: 768px) {
		.welcome-right {
			display: none;
		}
		.welcome-left {
			max-width: 100%;
		}
		.welcome-banner {
			padding: var(--space-8) var(--space-5);
		}
		.welcome-left h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
