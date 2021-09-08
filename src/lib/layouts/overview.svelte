<script>
    export let title;
    export let blurb;
    export let tags;
</script>

<h1>{ title }</h1>

<p class='blurb'>{ blurb }</p>

<h2>Tags</h2>
<div class='tagtainer'>
    {#each tags as tag}
    <a class='tag' href='/search/{tag.replace(' ', '+')}'>{tag}</a>
    {/each}
</div>

<slot />

<style>
    .blurb {
        color: grey;
    }
    .tagtainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
    }

    .tag {
        width: max-content;
        padding: 0.3em;
        border-radius: 5px;
        box-shadow: 0 1px 3px 4px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        -webkit-transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        background-color: transparent;
        padding: 0.5em;
        text-align: center;
        text-decoration: none;
    }
</style>