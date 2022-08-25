<script>
	export let item;
</script>

<a class="gallery-item interactive" href={item.link}>
        
	<!--Text content alternates odd and even (see below)-->
	<div class="gallery-text" href={item.link}>
		<h3>{item.title}</h3>
		<p>{item.desc}</p>
	</div>

	<!--Pretty content goes here-->
	{#if item.content.type == 'yt'}
	<iframe
		title={item.content.title}
		src={item.content.url}
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	/>
	{:else if item.content.type == 'img'}
	<img src={item.content.url} alt={item.content.description}>
	{/if}
</a>

<style>
	.gallery-item {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 300px;
        color: black;
    }

    .gallery-item > img {
        height: fit-content;
    }

    .gallery-item > iframe {
        height: 100%;
    }

	.gallery-text > h3 {
	}

	.gallery-text > p {
		color: rgb(104, 104, 104);
		text-align: left;
		font-size: 0.8rem;
	}

    a {
        text-decoration: none;
    }

    a:hover{
        background-color: white;
    }
</style>