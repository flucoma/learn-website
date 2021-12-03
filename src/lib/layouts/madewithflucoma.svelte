<script>
	export let title;
	export let blurb;
	export let tags;
</script>

<div class="title-box">
	<h1>{title}</h1>
	<p class="blurb">
		{blurb}
	</p>

	<div class="tagtainer">
		{#each tags as tag}
			<a class="tag" href="/search/{tag}">
				{tag}
			</a>
		{/each}
	</div>
</div>

<slot />

<style lang="scss">
	:global(p) {
		text-align: justify;
		text-justify: inter-word;
	}

	.blurb {
		color: grey;
	}
	.tagtainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
	}

	.tag {
		width: max-content;
		padding: 0.15em;
		border-radius: 0px;
		box-shadow: 0 1px 1.5px 2px rgba(0, 0, 0, 0.1);
		background-color: transparent;
		text-align: center;
	}

	.tag:hover {
		color: white;
		text-decoration: underline;
	}

	.title > h1 {
		margin-bottom: 0;
	}

	.title > p {
		margin-top: 0;
	}

	p {
		text-align: justify;
	}
</style>
