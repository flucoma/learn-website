<script>
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import { nav_expanded } from '$lib/app';
	export let link = '/';
</script>

<div class="landing-card">
	<slot name="title" />
	<slot name="blurb" />
	<a
		on:click={() => {
			$nav_expanded = false;
		}}
		class="landing-cta"
		href={link}>Learn More <ArrowRight /></a
	>
</div>

<style>
	.landing-card {
		margin: var(--space-2) 0;
	}

	.landing-card :global(h2) {
		margin: 0;
		font-size: var(--text-xl);
	}

	.landing-card :global(p) {
		margin: 0 0 var(--space-2);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
	}

	.landing-cta {
		display: inline-grid;
		grid-template-columns: auto auto;
		align-items: center;
		gap: 0.2em;
		font-size: var(--text-sm);
		font-weight: var(--font-semibold);
		color: var(--color-link);
		text-decoration: none;
		transition: gap var(--transition-fast), color var(--transition-fast);
	}

	.landing-cta:hover {
		background: transparent;
		color: var(--color-primary-700);
		gap: 0.4em;
	}
</style>
