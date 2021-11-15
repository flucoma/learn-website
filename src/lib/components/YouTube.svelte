<script>
    export let url = "";
    export let title = "";
    export let caption = title;
    export let width = 560;
    export let height = 315;
</script>

<div class='container'>
    <iframe 
    title={title} 
    width={width} 
    height={height} 
    src={`https://www.youtube.com/embed/${url}`} 
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
    <div class="caption">
        <p>{caption}</p>
    </div>
</div>

<style>
    .container {
        padding-top: 1em;
        padding-bottom: 1em;
    }
    
    iframe {
        max-width: 100%;
        margin: 0 auto;
        display: block;
    }

    .caption :global(p) {
        font-style: italic;
        text-align: center;
        width: 80%;
        margin: 0 auto;
    }
</style>