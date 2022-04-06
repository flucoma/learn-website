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

<div class="container raisedbox">

    <a href="{data.url}">
    
    <div class="img_container">
        <div class='feature_image' style="background-image: url({data.feature.featuredimage || _.sample(data.feature.images) || '/general/learn_default.jpeg' });"></div>
    </div>

    <div class="text_cont">
        <h2>{data.title}</h2>
        <p>{data.blurb}</p>
    
        <div class="flair_link_wrapper">
            <div class="flair_wrapper"><Flair flair={data.flair}/></div>
            <a  class='linkout' href={data.url}>Learn More <ArrowRight /></a>
        </div>
        
    </div>

</a>

</div>

<style>

.container >a{
    color: black;
    text-decoration: none;
}

    .flair_link_wrapper{
        display: flex;
        
    }

    .flair_wrapper{
        width: fit-content;
    }

    .text_cont{
        margin: 0.75em;
    }

    .img_container{ 
        background-repeat: no-repeat;
        background-size: cover;
    }

    .feature_image {
        position: relative;
        max-width: 100%;
        height: 10em;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover; 
    }

    .container {
        border-radius: 0.25rem;
        border: 0.063rem solid #dcdee0;
        max-width: 100%;
        width: fit-content;
        height: fit-content;
        margin-bottom: 1em;
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

    .linkout {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: left;
        place-items: center;
        gap: 0.2em;
        padding-left: 1em;
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