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

<a href={item.url}>
	<div class='image' style:background-image={`url(${item.feature.featuredimage}`}></div>
	<div class={`item-${item.flair} flair`}>{item.flair}</div>
	<div class="title">{item.title}</div>
</a>

<style>
	a {
		display: flex;
		flex-direction: column;
		color: black;
		text-decoration: none;
		min-width: 200px;
		max-width: 400px;
	}
	.title {
		font-weight: bold;
	}
	a:hover {
		cursor: pointer;
		background: white;
		color: black;
		text-decoration: none;
	}
	.image {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		min-height: 10em;
	}
	.flair {
		text-transform: capitalize;
		font-size: 0.75rem;
		font-weight: bold;
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