<script>
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import Flair from '$lib/components/Flair.svelte';
	import _ from 'lodash';

	export let item = {};
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
			<p class="blurb">{item.blurb}</p>

			<div class="flair_link_wrapper">
				<div class="flair_wrapper"><Flair flair={item.flair} /></div>
				<a class="linkout" href={item.url}>Learn More <ArrowRight /></a>
			</div>
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

	.flair_link_wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.flair_wrapper {
		width: fit-content;
	}

	.text_cont {
		margin: 0.75em;
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
		border-radius: 0.25rem;
		border: 0.063rem solid #dcdee0;
		max-width: 100%;
		width: fit-content;
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
</style>
