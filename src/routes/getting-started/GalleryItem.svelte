<script>
	import CodeSnippet from './CodeSnippet.svelte';
	export let item;
</script>

<a class="gallery-item interactive" href={item.link}>
        
	<!--Text content alternates odd and even (see below)-->
	<div class="gallery_text_content" href={item.link}>
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
	<img class='feature-image' src={item.content.url} alt="">
	{:else if item.content.type == 'code'}
	<CodeSnippet code_key={item.content.url} />
	{/if}
</a>

<style>
	.gallery-item {
        display: flex;
        flex-direction: column;
        gap: 1em;
        height: fit-content;
        width: 300px;
        color: black;
    }

    .gallery-item > img {
        height: 100%;
        width: 100%;
    }

    .gallery-item > iframe {
        height: 100%;
    }

    a {
        text-decoration: none;
    }

    a:hover{
        background-color: white;
    }
</style>