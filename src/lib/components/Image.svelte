<script>
	import { markdown } from 'markdown';

	/** Width breakpoints matching the pre-build script */
	const WIDTHS = [480, 960, 1440];

	/** @type {string} */
	export let src = '';
	/** @type {string} */
	export let alt = '';
	/** @type {string} */
	export let label = '';
	/** @type {string} */
	export let id = '';

	let loaded = false;

	/**
	 * Strip the extension to get the base name used by the pre-build script.
	 * "/explore/pluta/img.png" → "/explore/pluta/img"
	 */
	$: baseName = src.replace(/\.(png|jpe?g|webp|gif)$/i, '');

	/** Build a srcset string like "img-480w.avif 480w, img-960w.avif 960w, ..." */
	function buildSrcSet(format) {
		return WIDTHS.map((w) => `${baseName}-${w}w.${format} ${w}w`).join(', ');
	}

	$: jpegSrcset = buildSrcSet('jpeg');
</script>

<figure class="image-figure" {id}>
	<a target="_blank" href={src} rel="noreferrer" class:loaded>
		<picture>
			<source srcset={jpegSrcset} type="image/jpeg" sizes="(max-width: 640px) 100vw, 900px" />
			<img
				loading="lazy"
				{alt}
				src={src}
				on:load={() => (loaded = true)}
				class:loaded
			/>
		</picture>
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
		height: auto;
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
