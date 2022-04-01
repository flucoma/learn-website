<script>
    import InteractiveNetwork from '$lib/components/InteractiveNetwork.svelte';
</script>

<div class="main_wrapper">

    <h2>
        Getting Started with FluCoMa
    </h2>

    <div class="network_div">
        <div style="grid-area: network_vis;">
            <InteractiveNetwork />
        </div>
        
        <div class="network_texts" style="grid-area: network_texts;">
            <h3>The FluCoMa Network</h3>
            <p>
                Explore the FluCoMa universe...
            </p>

            <p id="display_name">
                Testing content change...
            </p>
        </div>
    </div>

    <div class="roadmap_div">
        <h2>
            Beginner to Expert Roadmap
        </h2>
        <div>
            <ul>
                <li>
                    <a href="/installation">Installation</a>
                    <p>Start here to install stuff otherwise you wont be able to use anything...</p>
                </li>

                <li>
                    <a href="/installation">Getting started basic tutorial video looooool</a>
                    <p>Learn all the basics about working in the FluCoMa framework...</p>
                </li>

                <li>
                    <a href="/installation">MLP Classifier</a>
                    <p>Get started using machine learning by building an MLP classifier.</p>
                </li>

                <li>
                    <a href="/installation">MLP Regressor</a>
                    <p>Take neural networks a step further with regression.</p>
                </li>

                <li>
                    <a href="/installation">2d visulaisation vid</a>
                    <p>Confused about a bunch of noisy crap? Make a 2d visualiser and fun.</p>
                </li>

                <li>
                    <a href="/installation">Audio query</a>
                    <p>LEarn whjat an audio is.</p>
                </li>
            </ul> 
        </div>
    </div>

</div>

<style>

    .main_wrapper{
		position: relative;
		left: 0;
		width: 100%;
		height: 100%;
    }

    .network_div{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 
        "network_vis network_texts";
    }

    .network_texts{
        margin-left: 1em;
        margin-right: 1em;
    }

    .roadmap_div{
        width: 100%;
        margin-left: 1em;
        margin-right: 1em;
    }

    @media (min-width: 1200px){
        .network_div{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 
        "network_vis network_texts";
    }
    }

    @media (max-width: 1200px) {
        .network_div{
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-areas: 
        "network_vis"
        "network_texts";
    }
    }

</style>