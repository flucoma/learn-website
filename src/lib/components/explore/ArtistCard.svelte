<script>
	export let src = '';
	export let name = '';
	export let website = '';
</script>

<a class="artist-card neutral-link" href={website}>
	<div class="card-top">
		<img loading="lazy" alt={`${name} profile picture`} {src} />
		<span class="card-name">{name}</span>
	</div>

	{#if $$slots.bio}
		<div class="card-bio">
			<slot name="bio" />
		</div>
	{/if}
</a>

<style>
	.artist-card {
		display: block;
		margin: var(--space-4) 0;
	}

	.card-top {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	img {
		flex-shrink: 0;
		width: 80px;
		height: 80px;
		border-radius: var(--radius-full);
		object-fit: cover;
		box-shadow: var(--shadow-sm);
	}

	.card-name {
		font-size: var(--text-2xl);
		font-weight: var(--font-semibold);
		color: var(--color-primary-800);
		line-height: var(--leading-snug);
	}

	.artist-card:hover .card-name {
		text-decoration: underline;
	}

	.card-bio {
		margin-top: var(--space-3);
		line-height: var(--leading-normal);
	}

	.card-bio :global(p) {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
</style>
