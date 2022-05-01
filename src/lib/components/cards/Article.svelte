<script lang="ts">
    import ArrowRight from '$lib/components/ArrowRight.svelte';
    import Flair from '$lib/components/Flair.svelte';
    import _ from 'lodash';

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

    <div class="img_container">
        <div class='feature_image' style="background-image: url({data.feature.featuredimage || _.sample(data.feature.images) || '/general/learn_default.jpeg' });"></div>
    </div>

    <p>{data.blurb}</p>
    <a  class='linkout' href={data.url}>Learn More <ArrowRight /></a>
</a>

<style>

    .img_container{ 
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        border-radius: 0.25rem;
        padding: 0em 0em 0em 0em;
        margin-top: 0em;
        margin-bottom: 0.25em;
    }

    .feature_image {
        position: relative;
        max-width: 100%;
        height: 10em;
        margin: 0.5em 0em 0.5em 0em;
        border: 0.063rem solid #dcdee0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover; 
    }

    .container {
        border-radius: 0.25rem;
        border: 0.063rem solid #dcdee0;
        padding: 0.75em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        max-width: 100%;
    }

    .container > p {
        color: var(--grey);
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