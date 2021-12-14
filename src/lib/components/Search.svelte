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
            <div class="text">{r.title}</div>
        </a>
        {#if r.flair}
        <div></div>
        {/if}
        {/each}
    </div>
    {/if}
</div>

<style lang='scss'>
    $radius: 0px;
    $w: min(90%, 400px);
    $border: 2px solid $dark-blue;
    $search-pad: 10px;

    .search {
        width: $w;
        position: relative;
    }

    .query {
        font-size: 1rem;
        border-radius: $radius;
        padding: $search-pad;
        width: 100%;
    }

    .results {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: calc(100% + 2*$search-pad);
        background: rgb(255, 255, 255, 1.0);
        border: $border;
        border-radius: $radius;
        z-index: 0;
    }

    .result {
        height: 30px;
        max-width: 100%;
        padding: 0.5em;
    }

    .result::hover{
        color:black;
    }
</style>