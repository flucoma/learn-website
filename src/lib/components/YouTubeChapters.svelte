<script>
    import YouTube from 'svelte-youtube';
    export let videoId = '';
    let instance;

    export let chapters = [];

    function chapterClick(ev) {
        var selected_chap = chapters[parseInt(ev.target.id)];

        instance.seekTo(convertTime(selected_chap));
    };

    function convertTime(entry){
        return (entry.start[0] * 60) + entry.start[1];
    };
</script>

<div class="container">
<YouTube
    videoId={videoId}
    on:ready={ e => instance = e.detail.target }
/>
</div>

<div class="chapter_container">
    {#each chapters as chapter, i}
        <div id={i} class="chap" on:click={event => chapterClick(event)}>
            <p id={i}>{chapter.label} ({chapter.start[0]}:{chapter.start[1]})</p>   
        </div>
    {/each}
</div>

<style>
    .chap{
        padding: 0.25em;
		text-decoration: none;
		border-radius: 0.25rem;
        cursor: pointer;
        border: 2px solid;
        border-color: grey;
    }

    .chap>p{
        margin: 0px;
    }

    .chapter_container{
        font-size: 0.8rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
		margin-bottom: 1.5em;
    }

    .container {
        padding-top: 1em;
        padding-bottom: 1em;
        max-width: 100%;
        margin: 0 auto;
        display: block;
    }
</style>