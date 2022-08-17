<script>
	
</script>

<div class="container">

    <h2 style="text-align: center;">First Steps</h2>

    <p style="text-align: center;">
        A quick and recommended start is to follow these introductory YouTube tutorials (after having <a href="/installation">installed</a> the software of course!).
    </p>

    <div class="first_tutorial">

        <h3 style="grid-area: ft_title;" class="ft_title">Train a neural network to classify sound based on timbre. <a href="/learn/classification-neural-network" class="ft_link">[article]</a></h3>

        <iframe
            title=""
            width="100%"
			height="200px"
            src={`https://www.youtube.com/embed/cjk9oHw7PQg`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid1;"
        />

        <iframe
            title=""
            width="100%"
			height="200px"
            src={`https://www.youtube.com/embed/Y1cHmtbQPSk`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid2;"
            class="ft_vid"
        />

        <p style="grid-area: ft_desc;" class="ft_desc">
            This video tutorial guides you through building a flexible sound classifier.
        </p>
    </div>

    <div class="first_tutorial">

        <h3 style="grid-area: ft_title;" class="ft_title">Train a neural network to control a synthesizer. <a href="/learn/regression-neural-network" class="ft_link">[article]</a></h3>

        <iframe
            title=""
            width="100%"
			height="200px"
            src={`https://www.youtube.com/embed/XfNZzQPdPG0`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid1;"
        />

        <iframe
            title=""
            width="100%"
			height="200px"
            src={`https://www.youtube.com/embed/mxmMBvi3Cb0`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid2;"
            class="ft_vid"
        />

        <p style="grid-area: ft_desc;" class="ft_desc">
            Video tutorial introducing the FluidMLPRegressor neural network.
        </p>
    </div>

    <div class="first_tutorial">

        <h3 style="grid-area: ft_title;" class="ft_title">Code a 2 dimensional sound sample explorer. <a href="/learn/2d-corpus-explorer" class="ft_link">[article]</a></h3>

        <iframe
            title=""
            width="100%"
			height="200px"
            src={`https://www.youtube.com/embed/9yoAGbs2eJ8`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid1;"
        />

        <iframe
            title=""
            width="100%"
			height="200px"
            src={`https://www.youtube.com/embed/4dsX5uRips8`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="grid-area: ft_vid2;"
            class="ft_vid"
        />

        <p style="grid-area: ft_desc;" class="ft_desc">
            A video tutorial guiding that teaches you how to build a two-dimensional corpus exploration patch in Max.
        </p>
    </div>

</div>

<style>

    .container{
        width: 90%;
        margin: auto;
    }

    .ft_title{
        text-align: center;
    }

    .first_tutorial{
        display: grid;
        grid-template-areas: 
            'ft_title ft_title'
            'ft_vid1 ft_vid2'
            'ft_desc ft_desc';
        padding-bottom: 1em;
        padding-top: 1em;
    }

    .ft_vid{
        padding-left: 1em;
        padding-right: 1em;
    }

    .ft_link{
        background-color: blue;
        color: white;
        text-decoration: none;
    }

    .ft_link:hover{
        background-color: grey;
        color: blue;
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

        }
	}

</style>