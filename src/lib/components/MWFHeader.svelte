<script>
	export let src = '';
	export let name = '';
	export let website = '';
</script>

<a class="container neutral-link" href={ website }>
	<img loading="lazy" alt={`${name} profile picture`} {src} />
	<h2>{ name }</h2>
	<div class="bio">
		<slot name="bio"></slot>
	</div>
</a>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
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

	.container > h2 {
		color: black;
	}

	img {
		min-width: 0px;
		max-width: 100%;
		border-radius: 0.25em;
	}

	.bio {
		color: grey;
		text-align: justify;
	}
</style>
