<script>
	import _ from 'lodash';
	export let item = {
		url : '',
		title: '',
		flair : '',
		blurb : '',
		feature : {
			featuredimage: '',
			images: [
				'/image/path'
			],
		}
	}
</script>

<div class="container raisedbox">
	<a href={item.url}>
		<div class="img_container">
			<div
				class="feature_image"
				style="background-image: url({
					item.feature.featuredimage ||
					_.sample(item.feature.images) ||
					'/general/learn_default.jpeg'});"
			/>
		</div>

		<div class="text_cont">
			<h2>{item.title}</h2>
			<div class={`item-${item.flair} flair`}>{item.flair}</div>
			<p class="blurb">{item.blurb}</p>
		</div>
	</a>
</div>

<style>
	.blurb {
		font-size: 0.8rem;
		color: #595959;
	}

	.container > a {
		color: black;
		text-decoration: none;
		width: 100%;
	}

	.text_cont {
		/* margin: 0.75em; */
	}

	.img_container {
		background-repeat: no-repeat;
		background-size: cover;
		width: 100%;
	}

	.feature_image {
		position: relative;
		width: 100%;
		height: 10em;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.container {
		max-width: 100%;
		height: fit-content;
		margin-bottom: 1em;
		width: 100%;
	}

	/* Overwrite hover behaviour */
	.container,
	.container:hover {
		color: black;
		background-color: white;
		text-decoration: none;
	}

	.container:hover {
		cursor: pointer;
	}

	.linkout {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: left;
		place-items: center;
		gap: 0.2em;
		padding-left: 1em;
	}

	.linkout:hover {
		background-color: transparent;
		color: var(--med-blue);
		gap: 0.3em;
	}

	.linkout,
	.linkout:hover {
		transition: gap 80ms ease-in-out;
	}

	.flair {
		text-transform: capitalize;
		font-size: 0.75rem;
		font-weight: bold;
	}
	.item-event {
		color: var(--event-flair);
	}
	.item-article {
		color: var(--article-flair);
	}
	
	.item-reference {
		color: var(--reference-flair);
	}
	
	.item-podcast {
		color: var(--podcast-flair);
	}
	
	.item-tutorial {
		color: var(--tutorial-flair);
	}
</style>
