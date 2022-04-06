<script>
    import LearnMoreArrow from '$lib/components/LearnMoreArrow.svelte';
</script>

<div class="main_wrapper">

    <h2>Getting Started</h2>

    <div class="installation_div">
        <h3>Installation</h3>

        <p>
            Click <a href="/installation">here</a> for a guide on how to install the FluCoMa for your favourite Creative Coding Environment.
        </p>
    </div>

    <div class="roadmap_div">

        <h3>Beginner to Expert Roadmap</h3>

        <p>
            Feeling a bit overwhelmed by all the possibilities? Why not follow this roadmap that takes you from beginner FluCoMa user to expert? You'll learn everything you need to knopw, and also build some exciting projects along the way! Feel free to start at any point or to skip some steps!
        </p>

        <ul>
            <li>
                <h4>First Steps Tutorial</h4>
                <p>
                    In this beginner tutorial you'll learn everything you need to get started navigating the FluCoMa framework, such as terminology, storing data and the kinds of operations you can accomplish using the toolkit.
                </p>
                <LearnMoreArrow link=""/>
            </li>

            <li>
                <h4>2d Corpus Explorer</h4>
                <p>
                    This four-part video tutorial walks you through building a two-dimensional corpus exploration patch. You'll cover workflows like segmentation, audio analysis and querying data.
                </p>
                <LearnMoreArrow link="https://youtu.be/4dsX5uRips8"/>
            </li>

            <li>
                <h4>MLP Classifier</h4>
                <p>
                    This video demonstrates how to use a neural network to distinguish between oboe and trombone timbre using the FluCoMa Toolbox in Max.
                </p>
                <LearnMoreArrow link="https://youtu.be/_QGQE-1RX-o"/>
            </li>

            <li>
                <h4>MLP Regressor</h4>
                <p>
                    This video demonstrates how to use a neural network to control a synthesizer that has 10 control parameters using just the 2 control parameters of an XY pad with the FluCoMa Toolkit.
                </p>
                <LearnMoreArrow link="https://youtu.be/3XSy297v9vk"/>
            </li>
        </ul>

        

    </div>

</div>

<style>

    .main_wrapper{
        width: 80%;
        margin: auto;
    }

    .main_wrapper > div{
        padding-top: 2em;
    }

    .roadmap_div{

    }

    .installation_div{

    }

</style>