<script>
    import Flair from '$lib/components/Flair.svelte';
</script>

<div class="container">

    <h2 style="text-align: center;">First Steps...</h2>

    <p style="text-align: center;">
        A quick and recommended start is to follow these introductory YouTube tutorials <br>(after having <a href="/installation">installed</a> the toolkit of course!).
    </p>

    <a class="first_tutorial raisedbox" href="/learn/classification-neural-network">

        <div style="grid-area: ft_title;" class="title_container">
            <h3 class="ft_title">Train a neural network to classify sound based on timbre.</h3>
            <Flair flair={'article'} />
        </div>

        <iframe
            title=""
            width="90%"
			height="200px"
            src={`https://www.youtube.com/embed/cjk9oHw7PQg`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid1; margin: auto;"
            class="ft_vid"
        />

        <iframe
            title=""
            width="90%"
			height="200px"
            src={`https://www.youtube.com/embed/Y1cHmtbQPSk`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid2; margin: auto;"
            class="ft_vid"
        />

        <p style="grid-area: ft_desc;" class="ft_desc">
            This video tutorial guides you through building a flexible sound classifier.
        </p>
    </a>

    <a class="first_tutorial raisedbox" href="/learn/regression-neural-network">

        <div style="grid-area: ft_title;" class="title_container">
            <h3 class="ft_title">Train a neural network to control a synthesizer.</h3>
            <Flair flair={'article'} />
        </div>

        <iframe
            title=""
            width="90%"
			height="200px"
            src={`https://www.youtube.com/embed/XfNZzQPdPG0`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid1; margin: auto;"
            class="ft_vid"
        />

        <iframe
            title=""
            width="90%"
			height="200px"
            src={`https://www.youtube.com/embed/mxmMBvi3Cb0`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid2; margin: auto;"
            class="ft_vid"
        />

        <p style="grid-area: ft_desc;" class="ft_desc">
            Video tutorial introducing the FluidMLPRegressor neural network.
        </p>
    </a>

    <a class="first_tutorial raisedbox" href="/learn/2d-corpus-explorer">

        <div style="grid-area: ft_title;" class="title_container">
            <h3 class="ft_title">Code a 2 dimensional sound sample explorer.</h3>
            <Flair flair={'article'} />
        </div>

        <iframe
            title=""
            width="90%"
			height="200px"
            src={`https://www.youtube.com/embed/9yoAGbs2eJ8`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid1; margin: auto;"
            class="ft_vid"
        />

        <iframe
            title=""
            width="90%"
			height="200px"
            src={`https://www.youtube.com/embed/4dsX5uRips8`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid2; margin: auto;"
            class="ft_vid"
        />

        <p style="grid-area: ft_desc;" class="ft_desc">
            A video tutorial guiding that teaches you how to build a two-dimensional corpus exploration patch in Max.
        </p>
    </a>

</div>

<style>

    .container{
        width: 90%;
        margin: auto;
    }

    

    .ft_title{
        text-align: center;
        padding: 0.2em;
    }

    .title_container{
        display: flex;
        margin: auto;
        justify-content: center;
        align-items: center;
    }

    .first_tutorial{
        display: grid;
        grid-template-areas: 
            'ft_title ft_title'
            'ft_vid1 ft_vid2'
            'ft_desc ft_desc';
        padding-bottom: 1em;
        padding-top: 1em;
        border-radius: 0.25rem;
		border: 0.063rem solid #dcdee0;
        margin-bottom: 1em;
        max-width: 100%;
        width: 100%;
    }

    .first_tutorial > p {
		color: var(--grey);
		text-align: center;
		text-justify: inter-word;
        text-decoration: none;
	}

	/* Overwrite hover behaviour */
	.first_tutorial,
	.first_tutorial:hover {
		color: black;
		background-color: white;
		text-decoration: none;
	}

	.first_tutorial:hover {
		cursor: pointer;
	}

    .ft_vid{
        padding-left: 1em;
        padding-right: 1em;
    }

    .ft_link{
        padding-left: 0.5em;
        padding-right: 0.5em;
        border-radius: 5px;
        background-color: var(--article-flair);
        color: white;
        text-decoration: none;
    }

    .ft_link:hover{
        background-color: grey;
        color: var(--article-flair);
        text-decoration: none;
    }

    .ft_desc{
        padding-top: 0.5em;
        text-align: center;
    }

    @media (min-width: 1200px) {
        .first_tutorial{
            grid-template-areas: 
                'ft_title ft_title'
                'ft_vid1 ft_vid2'
                'ft_desc ft_desc';
        }

        .ft_vid{
            padding-left: 1em;
            padding-right: 1em;
            padding-top: 0em;
        }

        .title_container{
            display: flex;
            margin: auto;
            justify-content: center;
            align-items: center;
        }
	}

	@media (max-width: 1200px) {
        .first_tutorial{
            grid-template-areas: 
                'ft_title'
                'ft_vid1'
                'ft_vid2'
                'ft_desc';
        }

        .ft_vid{
            padding-left: 1em;
            padding-right: 1em;
            padding-top: 1em;
        }

        .title_container{
            display: inline;
            margin: auto;
            justify-content: center;
            align-items: center;
        }
	}

</style>