<script>
    import { db } from '$lib/app.js';

    let results = [];
    let query = '';
    let searchBar;

    function search() {
        results = db.search(query)
    }

    function keyDown(e) {
        if (e.key === 'k' && e.metaKey) {
            searchBar.focus();
        }
    }
</script>

<svelte:window on:keydown={keyDown} />

<div class="search">
    <input 
    class='query'
    bind:value={query} 
    on:input={search} 
    placeholder='Site search... (CMD+K)'
    bind:this={searchBar}
    />
    
    {#if results.length >= 1}
    <div class='results'>
        {#each results as r}
        <a class='result' href={r.url} on:click={ () => {results = []; query='';}}>
            <div class="text">
                {r.title}
            </div>
        </a>
        {/each}
    </div>
    {/if}
</div>

<style lang='scss'>
    $radius: 0px;
    $w: 400px;
    $border: 2px solid $dark-blue;

    .search {
        width: $w;
        margin: 0 auto;
    }

    .query {
        font-size: 1rem;
        border-radius: $radius;
        padding: 10px;
        width: 100%;
    }

    .results {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: calc($w - 12px);
        background: rgb(255, 255, 255);
        border: $border;
        padding: 1em;
        border-radius: $radius;
        z-index: 0;
    }

    .result {
        .text {
            width: 100%;
        }
    }
</style>