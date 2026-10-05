<script>
	export let author = '';

	const authors = {
		Jacob: { name: 'Jacob Hart', website: 'https://jacob-hart.com/' },
		James: { name: 'James Bradbury', website: 'https://www.jamesbradbury.net/' },
		Ted: { name: 'Ted Moore', website: 'https://www.tedmooremusic.com/' },
		PA: { name: 'Pierre Alexandre Tremblay', website: 'https://www.pierrealexandretremblay.com/' },
		Owen: { name: 'Owen Green', website: 'http://owengreen.net/' }
	};
	$: info = authors[author] || { name: author, website: '#' };
</script>

<p class="author-tag">
	<span class="author-by">by</span>
	<a class="author-link" href={info.website} target="_blank" rel="noopener noreferrer">
		{info.name}
	</a>
</p>

<style>
	.author-tag {
		display: flex;
		align-items: center;
		gap: 0.4em;
		font-size: var(--text-sm);
		margin: 0 0 var(--space-2);
		color: var(--color-text-muted);
	}

	.author-by {
		font-style: italic;
	}

	.author-link {
		font-weight: var(--font-semibold);
		color: var(--color-primary-700);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.author-link:hover {
		color: var(--color-primary-500);
		background: transparent;
		text-decoration: underline;
	}
</style>
