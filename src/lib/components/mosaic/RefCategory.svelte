<script>
	export let item = {
		category: 'Decomposition',
		refs: [{ url: '/', title: 'hpss' }]
	};
</script>

<section class="ref-category">
	<h3 class="ref-cat-title" class:faded={item.refs.length === 0}>{item.category}</h3>
	<ul class="ref-cat-list">
		{#each item.refs as r}
			<li><a href={r.url}>{r.title}</a></li>
		{/each}
	</ul>
</section>

<style>
	.ref-category {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		min-width: max-content;
	}

	.ref-cat-title {
		margin: 0;
		font-size: var(--text-base);
		min-width: max-content;
	}

	.faded {
		color: var(--color-text-muted);
	}

	.ref-cat-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.ref-cat-list li {
		display: block;
		margin: 0 0 var(--space-1);
	}

	.ref-cat-list a {
		min-width: max-content;
		text-decoration: none;
		font-size: var(--text-sm);
		color: var(--color-link);
	}

	.ref-cat-list a:hover {
		color: var(--color-link-hover-text);
	}
</style>
