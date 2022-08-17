<script>
	
</script>

<div class="container">

    <h2 style="text-align: center;">Or maybe you have something more specific in mind?</h2>

    <div class="gallery">

        <div class="gallery_element_odd">
            <div class="gallery_text_content">
                <h3>Hear music made using FluCoMa</h3>
                <a href="https://www.youtube.com/watch?v=3GqYFDB425k&list=PLLzzOXU4pTgKanAykQnGNKCj-4LX_hg3L">Link</a>
            </div>
            <div class="gallery_pretty_content">
                <img src="/general/learn_default.jpeg">
            </div>
        </div>

        <div class="gallery_element_even">
            <div class="gallery_pretty_content">
                <img src="/general/learn_default.jpeg">
            </div>
            <div class="gallery_text_content">
                <h3>Discuss musical uses of FluCoMa</h3>
                <a href="https://discourse.flucoma.org/">Link</a>
            </div>
        </div>

        <div class="gallery_element_odd">
            <div class="gallery_text_content">
                <h3>Slice Audio</h3>
                <a href="/reference/ampslice">Link</a>
            </div>
            <div class="gallery_pretty_content">
                <img src="/general/learn_default.jpeg">
            </div>
        </div>

        <div class="gallery_element_even">
            <div class="gallery_pretty_content">
                <img src="/general/learn_default.jpeg">
            </div>
            <div class="gallery_text_content">
                <h3>Analyze real time audio for... [Pitch](/reference/pitch), [Loudness](/reference/loudness), [Timbre](/reference/mfcc), and more.</h3>
                <a href="https://discourse.flucoma.org/">Link</a>
            </div>
        </div>

        <div class="gallery_element_odd">
            <h3>Slice Audio</h3>
            <a href="/reference/ampslice">Link</a>
            <div class="gallery_pretty_content">
                <img src="/general/learn_default.jpeg">
            </div>
        </div>


        <!--
<p>

* **Download some example code to play with (for [Max](https://f003.backblazeb2.com/file/learnassets/examples/2d-plot/plotter-5.maxpat) or [SuperCollider](https://f003.backblazeb2.com/file/learnassets/examples/2d-plot/plotter-5-complete.scd))**
* **[Train a neural network](/learn/regression-neural-network)**
* **[Decompose audio based on spectral analysis](/reference/hpss)**
* **[Read an in-depth article about a FluCoMa project ](/explore/constanzo)**
* **[Batch analyze sound files](/learn/batch-processing)**
* **[Learn about statistics](/reference/bufstats)**
* **[Hear from an artist using machine listening and machine learning](/explore/abtan)**
* **[Check out the source code](https://github.com/orgs/flucoma/repositories)**
</p>
-->

        <p>
            We understand that sometimes you want to dig in really deep and sometimes you want to find a quick answer or example and get back to creating. There's a lot of information on this site, so take just what you need or use the rectangle links near the top to keep exploring.
        </p>

    </div>

</div>

<style>

    .container{
        width: 90%;
        margin: auto;
    }

    .gallery{

    }

    .gallery_element_odd{
        display: grid;
        grid-template-areas: 'text pretty';
        width: 80%;
        margin: auto;
        border: black;
    }

    .gallery_element_even{
        display: grid;
        grid-template-areas: 'pretty text';
    }

    .gallery_text_content{
        width: 40%;
        margin: auto;
        grid-area: text;
    }

    .gallery_pretty_content{
        width: 40%;
        margin: auto;
        grid-area: pretty;
    }

    .gallery_pretty_content > img{
        width: auto;
    }
</style>