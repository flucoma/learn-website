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

<div class="container">
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
	.container {
		max-width: 100%;
		height: 100%;
		width: 100%;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.container:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
	}

	.container > a {
		color: inherit;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: transparent;  /* Add this line */
	}

	.container > a:hover {
		background-color: transparent;  /* Add this line */
	}

	.img_container {
		flex: 0 0 auto;
	}

	.text_cont {
		flex: 1 0 auto;
		padding: 1.5em;
		display: flex;
		flex-direction: column;
	}

	.feature_image {
		width: 100%;
		height: 200px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		transition: transform 0.3s ease;
	}

	.container:hover .feature_image {
		transform: scale(1.05);
	}

	h2 {
		margin: 0 0 0.5em;
		font-size: 1.2rem;
		line-height: 1.3;
	}

	.blurb {
		font-size: 0.9rem;
		color: #595959;
		margin-top: 0.5em;
		flex-grow: 1;
	}

	.flair {
		align-self: flex-start;
		text-transform: capitalize;
		font-size: 0.75rem;
		font-weight: bold;
		padding: 0.3em 0.8em;
		border-radius: 20px;
		margin-top: auto;
	}

	.item-event { background-color: var(--event-flair); color: white; }
	.item-article { background-color: var(--article-flair); color: white; }
	.item-reference { background-color: var(--reference-flair); color: white; }
	.item-podcast { background-color: var(--podcast-flair); color: white; }
	.item-tutorial { background-color: var(--tutorial-flair); color: white; }
</style>
