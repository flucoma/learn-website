<script>
	export let src = '';
	export let name = '';
	export let website = '';
</script>

<a class="container neutral-link" href={website}>
	<div class="top">
		<img loading="lazy" alt={`${name} profile picture`} {src} />
		<h3>{name}</h3>
	</div>
	<!-- <div class="bio"> -->
	<!-- <slot name="bio"></slot> -->
	<!-- </div> -->
</a>

<style lang="postcss">
	.container {
		gap: 0.5em;
		margin-top: 1em;
		margin-right: 2em;
	}

	.top {
		display: flex;
		flex-direction: row;
		place-items: center;
		gap: 1em;
	}

	h3 {
		color: var(--med-blue);
	}

	h3:hover {
		text-decoration: underline;
	}

	img {
		max-width: 80px;
		max-height: 80px;
		width: auto;
		height: auto;
		border-radius: 50%;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	}
</style>
