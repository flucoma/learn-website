<script>
	export let title;
	export let blurb;
	export let author;
	import TOC from '$lib/components/TOC.svelte';
	import RelatedLinks from '$lib/components/RelatedLinks.svelte';
	import EditHistory from '$lib/components/EditHistory.svelte';
	import AuthorTag from '$lib/components/AuthorTag.svelte';
	import Crumbs from '$lib/components/Crumbs.svelte';

	let display_author = author === undefined ? false : true;
</script>

<Crumbs />

<div class="wrapper">
	<div class="navigation">
		<TOC />
	</div>

	<div class="main">
		<div class="title-box">
			<h1>{title}</h1>
			{#if display_author}
				<AuthorTag {author} />
			{/if}
			<p class="blurb">{blurb}</p>
			<RelatedLinks />
		</div>

		<slot />

		<EditHistory />
	</div>

	<div class="blank" />
</div>

<style lang="postcss">
	.wrapper {
		display: grid;
		justify-content: center;
		margin: 0;
	}

	@media (max-width: 1200px) {
		.wrapper {
			grid-template-rows: auto auto;
			grid-template-areas:
				'navigation'
				'main';
		}
		.navigation {
			width: 100%;
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
		display: flex;
		flex-direction: column;
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
