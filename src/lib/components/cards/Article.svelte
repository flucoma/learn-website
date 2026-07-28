<script>
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import Flair from '$lib/components/Flair.svelte';
	import _ from 'lodash';

	export let data = {};

	$: featuredSrc = data.feature.featuredimage ||
		_.sample(data.feature.images) ||
		'/general/learn_default.jpeg';
	$: featuredBase = featuredSrc.replace(/\.(png|jpe?g|webp|gif)$/i, '');
</script>

<a class="list-card raisedbox" href={data.url}>
	<div class="card-header">
		<h2 class="card-title">{data.title}</h2>
		<Flair flair={data.flair} />
	</div>

	<div class="card-image-wrap">
		<picture>
			<source srcset={featuredBase + '-640w.jpeg'} type="image/jpeg" />
			<img
				class="card-image"
				src={featuredSrc}
				alt={data.title}
				loading="lazy"
			/>
		</picture>
	</div>

	<p class="card-blurb">{data.blurb}</p>
	<span class="card-cta">Learn More <ArrowRight /></span>
</a>

<style>
	.list-card {
		display: flex;
		flex-direction: column;
		border-radius: var(--card-radius);
		border: 1px solid var(--color-border);
		padding: var(--space-5);
		margin: var(--space-2) 0;
		background: var(--color-background);
		color: var(--color-text);
		text-decoration: none;
		transition: var(--card-transition);
		position: relative;
	}

	.list-card:hover {
		color: var(--color-text);
		background: var(--color-background);
		cursor: pointer;
		border-color: var(--color-primary-200);
	}

	.card-header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: start;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.card-title {
		font-size: var(--text-lg);
		font-weight: var(--font-bold);
		margin: 0;
		line-height: var(--leading-snug);
	}

	.card-image-wrap {
		border-radius: var(--radius-sm);
		overflow: hidden;
		margin-bottom: var(--space-3);
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border: 1px solid var(--color-neutral-200);
		border-radius: var(--radius-sm);
		transition: transform 0.5s ease;
	}

	.list-card:hover .card-image {
		transform: scale(1.02);
	}

	.card-blurb {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		margin: 0 0 var(--space-3);
		text-align: justify;
		text-justify: inter-word;
	}

	.card-cta {
		display: inline-grid;
		grid-template-columns: auto auto;
		align-items: center;
		gap: 0.2em;
		font-size: var(--text-sm);
		font-weight: var(--font-semibold);
		color: var(--color-link);
		transition: gap var(--transition-fast), color var(--transition-fast);
		margin-top: auto;
	}

	.list-card:hover .card-cta {
		gap: 0.4em;
		color: var(--color-primary-700);
	}

	.card-cta:hover {
		background: transparent;
	}
</style>
