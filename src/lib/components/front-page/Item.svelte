<script>
	export let item = {
		url : '',
		title: '',
		flair : '',
		feature : {
			featuredimage: ''
		}
	}
	console.log(item)
</script>

<a href={item.url} class='raisedbox'>
	<img class='image' src={item.feature.featuredimage} alt='cover artwork for article' />
	<div class={`item-${item.flair} flair`}>{item.flair}</div>
	<h3 class="title">{item.title}</h3>
</a>

<style>
	a {
		display: flex;
		flex-direction: column;
		color: black;
		text-decoration: none;
		gap: 0.5em;
		max-height: 250px;
		padding: 1em;
		font-weight: 700;
		border-radius: 0.25rem;
		border: 0.063rem solid #dcdee0;
		max-width: 100%;
		margin-bottom: 1em;
	}

	.title {
	}

	a:hover {
		cursor: pointer;
		background: white;
		color: black;
		text-decoration: none;
	}
	.image {
		box-sizing: border-box;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		height: 10em;
		max-width: 100%;
	}
	.flair {
		text-transform: capitalize;
		font-size: 0.75rem;
	}
	
	.item-event {
		color: var(--event-fliair);
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