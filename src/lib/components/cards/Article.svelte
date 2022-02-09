<script lang="ts">
    import ArrowRight from '$lib/components/ArrowRight.svelte';
    import Flair from '$lib/components/Flair.svelte';

    type ArticleData = {
        title: string,
        blurb: string,
        tags: string[],
        flair: string,
        url: string,
        section: string,
        artist?: string,
        crumb?: string,
        related?: string
    }

    export let data: ArticleData = {};
</script>

<a class="container raisedbox" href={data.url}>
    <div class="top">
        <h2>{data.title}</h2>
        <Flair flair={data.flair}/>
    </div>
    <p>{data.blurb}</p>
    <a class='linkout' href={data.url}>Learn More <ArrowRight /></a>
</a>

<style>
    .container {
        border-radius: 0.25rem;
        border: 0.063rem solid #dcdee0;
        padding: 0.75em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        max-width: 100%;
    }

    .container > p {
        color: grey;
        text-align: justify;
        text-justify: inter-word;
    }

    /* Overwrite hover behaviour */
    .container, .container:hover {
        color:black;
        background-color: white;
        text-decoration: none;
    }

    .container:hover {
        cursor: pointer;
    }

    .top {
        display: grid;
        grid-template-columns: auto auto;
        place-items: center;
        justify-content: space-between;
        margin-bottom: 0.5em;
    }

    .top > :global(h2) {
        margin: 0;
    }

    .linkout {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: left;
        place-items: center;
        gap: 0.2em;
    }

    .linkout:hover {
        background-color: transparent;
        color: var(--med-blue);
        gap: 0.3em;
    }

    .linkout, .linkout:hover {
        transition: gap 80ms ease-in-out;
    }
</style>