<script>
	export let src = '';
	export let name = '';
	export let website = '';
</script>

<a class="container neutral-link" href={ website }>
	<div class="top">
		<img loading="lazy" alt={`${name} profile picture`} {src} />
		<h2>{ name }</h2>
	</div>
	<div class="bio">
		<slot name="bio"></slot>
	</div>
</a>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-top: 1em;
        border: 0.063rem solid #dcdee0;
		border-radius: 0.25em;
		padding: 1em;
	}

    .container:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .container, .container:hover {
        transition: box-shadow 200ms ease-in-out;
    }

	.top {
		display: grid;
		grid-template-rows: auto auto;
		gap: 0.5em;
		place-items: center;
	}
	.top > h2 {
		color: black;
		margin-top: 0;
	}

	img {
		max-width: 200px;
		max-height: 200px;
		width: auto; height: auto;
		border-radius: 0.25rem;
	}

	.bio {
		color: grey;
		text-align: justify;
	}

	.bio > :global(p) {
		margin-bottom: 0;
	}
</style>
