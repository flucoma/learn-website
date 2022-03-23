<script lang="ts">
	import { markdown } from 'markdown';

	export let src: string = '';
	export let alt: string = '';
	export let label: string = '';
	export let id: string = '';
</script>

<figure class="container" {id}>
	<a target="_blank" href={src}>
		<img loading="lazy" {alt} {src} />
	</a>
	<figcaption class="label">
		{@html markdown.toHTML(label)}
	</figcaption>
</figure >

<style lang="postcss">
	.container {
		display: grid;
		place-items: center;
		width: 80%;
		margin: 0 auto;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	img {
		padding-top: 1em;
		padding-bottom: 1em;
		max-width: 100%;
	}

	.container > a {
		max-width: 100%;
		transition: opacity linear 100ms;
	}

	.container > a:hover {
		background: transparent;
		opacity: 0.95;
	}

	.label {
		text-align: center;
		font-size: 0.8rem;
		font-style: italic;
	}
</style>
