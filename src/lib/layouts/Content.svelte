<script>
	export let title = '';
	export let blurb = '';
	export let author = '';
	import TOC from '$lib/components/TOC.svelte';
	import RelatedLinks from '$lib/components/RelatedLinks.svelte';
	import AuthorTag from '$lib/components/AuthorTag.svelte';
</script>


<div class="wrapper">
	<div class="navigation">
		<TOC />
	</div>

	<main class="main">
		<h1>{title}</h1>
		{#if author}
			<AuthorTag {author} />
		{/if}
		<p class="blurb">{blurb}</p>
		<RelatedLinks />

		<slot />
	</main>

	<div class="blank" />
</div>

<style >

	h1 {
		margin: 0;
		margin-top: 0.25em;
	}
	.wrapper {
		display: grid;
		grid-template-columns: repeat(3, auto);
		justify-content: center;
		
		margin: 1em;
		margin-top: 60px;
	}

	@media (max-width: 1200px) {
		.wrapper {
			grid-template-rows: auto auto;
			grid-template-areas:
				'navigation'
				'main';
		}
		.blank {
			display: none;
		}
	}

	@media (min-width: 1200px) {
		.wrapper {
			grid-template-columns: auto min(var(--max-text-width), 100%) auto;
			grid-template-areas: 'navigation main blank';
		}
		.navigation {
			width: 25ch;
		}
	}

	:global(p) {
		text-align: justify;
		text-justify: inter-word;
	}

	.blurb {
		color: var(--grey);
	}

	p {
		text-align: justify;
	}

	.main {
		grid-area: main;
		min-width: var(--min-text-width);
		max-width: var(--max-text-width);
	}

	.navigation {
		grid-area: navigation;
		height: max-content;
	}

	.blank {
		grid-area: blank;
		width: 25ch;
	}
</style>
