<script>
	import _ from 'lodash';
	export let item = {
		url: '',
		title: '',
		flair: '',
		blurb: '',
		feature: {
			featuredimage: '',
			images: ['/image/path']
		}
	};
</script>

<a class="mosaic-card" href={item.url}>
	<div class="card-image-wrap">
		<img
			class="card-image"
			src={item.feature.featuredimage || _.sample(item.feature.images) || '/general/learn_default.jpeg'}
			alt={item.title}
			loading="lazy"
		/>
		<div class="card-image-overlay" />
		<div class="card-flair-pill flair-{item.flair}">{item.flair}</div>
	</div>

	<div class="card-body">
		<h2 class="card-title">{item.title}</h2>
		<p class="card-blurb">{item.blurb}</p>
	</div>
</a>

<style>
	.mosaic-card {
		display: flex;
		flex-direction: column;
		border-radius: var(--card-radius);
		overflow: hidden;
		background: var(--color-background);
		box-shadow: var(--card-shadow);
		text-decoration: none;
		color: inherit;
		transition: var(--card-transition);
		height: 100%;
		width: 100%;
	}

	.mosaic-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--card-shadow-hover);
		color: inherit;
		background: var(--color-background);
	}

	.card-image-wrap {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background-color: var(--color-neutral-100);
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.mosaic-card:hover .card-image {
		transform: scale(1.06);
	}

	.card-image-overlay {
		position: absolute;
		inset: 0;
		background: var(--card-image-overlay);
		pointer-events: none;
	}

	.card-flair-pill {
		position: absolute;
		bottom: var(--space-3);
		left: var(--space-3);
		text-transform: capitalize;
		font-size: var(--text-xs);
		font-weight: var(--font-bold);
		padding: 0.25em 0.75em;
		border-radius: var(--radius-full);
		color: #fff;
		letter-spacing: var(--tracking-wide);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.flair-article  { background-color: var(--color-article); }
	.flair-event    { background-color: var(--color-event); }
	.flair-reference { background-color: var(--color-reference); }
	.flair-podcast  { background-color: var(--color-podcast); }
	.flair-tutorial { background-color: var(--color-tutorial); }

	.card-body {
		padding: var(--space-4) var(--space-5) var(--space-5);
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.card-title {
		font-size: var(--text-lg);
		font-weight: var(--font-bold);
		margin: 0 0 var(--space-1);
		line-height: var(--leading-snug);
		color: var(--color-neutral-900);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-blurb {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		line-height: var(--leading-normal);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		flex: 1;
	}
</style>
