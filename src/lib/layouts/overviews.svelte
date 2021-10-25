<script>
    export let title;
    export let blurb;
    export let tags;
</script>

<div class='title-box'>
    <h1>{ title }</h1>  
    <p class='blurb'>{ blurb }</p>
</div>


<h2>Tags</h2>
<div class='tagtainer'>
    {#each tags as tag}
    <a class='tag' href='/search/{tag}'>
        { tag }
    </a>
    {/each}
</div>

<slot />

<style>
    h1 {
        text-align: center;
    }
    .blurb {
        color: grey;
        text-align: center;
    }
    .tagtainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
    }

    .tag {
        width: max-content;
        padding: 0.15em;
        border-radius: 0px;
        box-shadow: 0 1px 1.5px 2px rgba(0, 0, 0, 0.1);
        background-color: transparent;
        text-align: center;
    }

    .tag:hover {
        text-decoration: underline;
        font-style: italic;
    }

    .title > h1 {
        margin-bottom: 0;
    }

    .title > p {
        margin-top: 0;
    }
</style>