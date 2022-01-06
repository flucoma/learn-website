<script>
	export let src = '';
	export let name = '';
	export let website = '';
	export let bio = '';
</script>

<h2>Artist Bio</h2>
<div class="container">
	<div class="photo">
		<a target="_blank" href={website}>
			<img loading="lazy" alt={`${name} profile picture`} {src} />
		</a>
	</div>
	<div class="bio">
		{@html bio}
	</div>

	<a href={website}>Website</a>
</div>

<style lang="postcss">
	.container {
		display: grid;
		grid-template-rows: auto auto;
		gap: 1em;
		margin-top: 1em;
	}
	.photo {
		margin: 0 auto;
	}

	img {
		min-width: 0px;
		max-width: 500px;
	}

	.bio {
		color: grey;
		text-align: justify;
	}
</style>
