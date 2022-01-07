<script lang="ts">
	export let src: string = '';
	export let alt: string = '';
	export let label: string = '';
	export let id: string = '';
</script>

<div class="container" {id}>
	<a target="_blank" href={src}>
		<img loading="lazy" {alt} {src} />
	</a>
	<div class="label">
		{label}
	</div>
</div>

<style lang="postcss">
	.container {
		display: grid;
		place-items: center;
		width: 80%;
		margin: 0 auto;
	}

	img {
		padding-top: 1em;
		padding-bottom: 1em;
		max-width: 100%;
	}

	a {
		max-width: 100%;
	}

	a:hover {
		background: transparent;
	}

	.label {
		text-align: center;
		font-size: 0.8rem;
	}
</style>
