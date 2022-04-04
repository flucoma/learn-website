<script>
    import InteractiveNetwork from '$lib/components/InteractiveNetwork.svelte';
    import ArrowRight from '$lib/components/ArrowRight.svelte';
</script>



<div class="main_wrapper">

    <a href="/other/creeper">
        CREEPER
    </a>

    <h2>
        Getting Started with FluCoMa
    </h2>

    <div class="network_div">
        <div style="grid-area: network_vis;">
           <!-- <InteractiveNetwork /> -->
        </div>
        
        <div class="network_texts" style="grid-area: network_texts;">
            <h3>The FluCoMa Network</h3>
            <p>Explore the FluCoMa universe...</p>

            <h4 id="display_name">FluCoMa</h4>

            <p id="display_blurb">FluCoMa stands for Fluid Corpus Manipulation. It's all about dealing with large amounts of digital audio.</p>

            <a class='linkout' id="display_link" href="/">Learn More <ArrowRight /></a>

        </div>
    </div>

    <div class="roadmap_div">
        <div class="roadmap_text_content">
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
        <div class="roadmap_img">
            <img src="/img/notbuilt.png" style="max-width: 100%;">
        </div>
        
    </div>

</div>

<style>

    .main_wrapper{
        width: 100%;
        height: 100%;
        min-width: 100%;
    }

    .network_div{
        width: 100%;
        min-width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 
        "network_vis network_texts";
        align-items: center;
    }

    .network_texts{
        margin-left: 1em;
        margin-right: 1em;
    }

    .roadmap_div{
        width: 100%;
        min-width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 
        "rm_txt rm_img";
    }

    .roadmap_text_content{
        grid-area: rm_txt;
    }

    .roadmap_img{
        grid-area: rm_img;
    }

    @media (min-width: 1200px){
        .network_div{
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas: 
            "network_vis network_texts";
        }

        .roadmap_div{
            width: 100%;
            min-width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas: 
            "rm_txt rm_img";
            }
    }

    @media (max-width: 1200px) {
        .network_div{
            width: 100%;
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-template-areas: 
            "network_vis"
            "network_texts";
        }

        .roadmap_div{
            width: 100%;
            min-width: 100%;
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-template-areas: 
            "rm_txt"
            "rm_img";
            }
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