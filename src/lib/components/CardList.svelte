<!-- 
This component abstracts the rendering process for each "card" in madewith and overview sections.
References are slightly different and use the ReferenceEntry component.
-->
<script>
	import { docs } from '$lib/app.js';
	import Flair from '$lib/components/Flair.svelte';
	export let section = 'overviews';

	const items = docs.filter((x) => x.section === section);
</script>

<div class="overview-list">
	{#each items as item}
		<a class="entry" href={item.url}>
			<div class="overview">
				<div class="top">
					<h2 class="overview-title">{item.title}</h2>
					<Flair flair={item.flair} />
				</div>
				<p class="overview-blurb">{item.blurb}</p>
			</div>
		</a>
	{/each}
</div>

<style lang="postcss">
	h2 {
		margin: 0;
	}

	.overview-list {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.entry {
		text-decoration: none;
		color: black;
		width: 100%;
		max-width: 100%;
	}

	.entry:hover {
		background-color: transparent;
		color: black;
	}

	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.overview {
		cursor: pointer;
		padding: 0.4em;
		box-shadow: 0 1px 1.5px 2px rgba(0, 0, 0, 0.1);
		background-color: transparent;
	}

	.overview:hover {
		scale: 1.03;
	}

	.overview-blurb {
		color: grey;
	}
</style>
