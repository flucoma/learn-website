<script>
	import { markdown } from 'markdown';

	export let src = '';
	export let alt = '';
	export let label = '';
	export let id = '';

	let loaded = false;
</script>

<figure class="image-figure" {id}>
	<a target="_blank" href={src} rel="noreferrer" class:loaded>
		<img
			loading="lazy"
			{alt}
			{src}
			on:load={() => (loaded = true)}
			class:loaded
		/>
	</a>
	{#if label}
		<figcaption class="image-caption">
			{@html markdown.toHTML(label)}
		</figcaption>
	{/if}
</figure>

<style>
	.image-figure {
		display: grid;
		place-items: center;
		width: 80%;
		margin: var(--space-8) auto;
	}

	.image-figure > a {
		max-width: 100%;
		border-radius: var(--radius-sm);
		overflow: hidden;
		display: block;
		background-color: var(--color-neutral-100);
	}

	.image-figure > a:hover {
		background: transparent;
	}

	img {
		display: block;
		max-width: 100%;
		padding-top: var(--space-4);
		padding-bottom: var(--space-4);
		opacity: 0;
		transform: scale(0.98);
		transition: opacity 0.5s ease, transform 0.5s ease;
	}

	img.loaded {
		opacity: 1;
		transform: scale(1);
	}

	.image-caption {
		text-align: center;
		font-size: var(--text-sm);
		font-style: italic;
		color: var(--color-text-muted);
		margin-top: var(--space-2);
		line-height: var(--leading-normal);
	}
</style>
