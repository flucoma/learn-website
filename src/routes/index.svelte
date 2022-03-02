<script>
    import { docs } from '$lib/app.js';
    import { manual_config } from '$lib/app.js';
    import _ from 'lodash';
    import ArrowRight from '$lib/components/ArrowRight.svelte';

    const learn = docs.filter(x => x.section === 'learn');
    const explore = docs.filter(x => x.section === 'explore');
    const reference = docs.filter(x => x.section === 'reference');

    const rng_learn = _.sample(learn);
    const rng_explore = _.sample(explore);
    const rng_ref = _.sample(reference);
    _.remove(learn, rng_learn);
    _.remove(explore, rng_explore);
    _.remove(reference, rng_ref);

    const learn_1 = _.sample(learn);
    _.remove(learn, learn_1);
    const learn_2 = _.sample(learn);
    _.remove(learn, learn_2);
    const learn_3 = _.sample(learn);
    _.remove(learn, learn_3);

    const explore_1 = _.sample(explore);
    _.remove(explore, explore_1);
    const explore_2 = _.sample(explore);
    _.remove(explore, explore_2);
    const explore_3 = _.sample(explore);
    _.remove(explore, explore_3);

</script>

<div class="main_wrapper">

    <div class="top_container">
        <p class="text-block">
            Welcome to the <strong>Fluid Corpus Manipulation Learn platform</strong>. 
            A lot of music making with computers involves working with collections of audio, and these collections are getting bigger and bigger. At the same time, techniques for analysing sound and manipulating data keep being developed. Our project seeks to enable music making with collections of audio by making some of these techniques available for musical creative coding environments, alongside a set of supporting resources on these pages.
        </p>
    </div>

    <div class="row_parent">
        <h2 class="row_title">
            Featured
        </h2>

        <div class="container">
            <div class='feature_image' style="background-image: url({rng_learn.feature.featuredimage || _.sample(rng_learn.feature.images) || '/general/learn_default.jpeg' });"></div>
        </div>

        <div class="container">
            <div class='feature_image' style="background-image: url({rng_explore.feature.featuredimage || _.sample(rng_explore.feature.images) || '/general/explore_default.jpeg' });"></div>
        </div>

        <div class="container">
            <div class='feature_image' style="background-image: url({rng_ref.feature.featuredimage || _.sample(rng_ref.feature.images) || '/general/reference_default.jpeg' });"></div>
        </div>

        <div class='flaired-title'>
            <div class="flair {rng_learn.flair}" />
            <div>Learn: {rng_learn.title}</div>
        </div>

        <div class='flaired-title'>
            <div class="flair {rng_explore.flair}" />
            <div>Explore: {rng_explore.title}</div>
        </div>

        <div class='flaired-title'>
            <div class="flair {rng_ref.flair}" />
            <div>Reference: {rng_ref.title}</div>
        </div>

        <a class="learn_more_link" href={rng_learn.url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" href={rng_explore.url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" href={rng_ref.url}>
            Learn More <ArrowRight />
        </a>   
    </div>
    
    <div class="video_row">

        <div class="front_page_video_container">
            <iframe
            title=""
                width=100%
                height=300px
                src={`https://www.youtube.com/embed/6p_R2pVSMVg`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            />
        </div>

        <div>

            <h3>
                Liminal spaces yeah
            </h3>
            <p>
                Video description
            </p>
           
        </div>

    </div>


    <div class="row_parent">
        <h2 class="row_title_secondary">
            Learn
        </h2>

        <p class="row_blurb">
            A variety of articles and guides discussing machine listening and machine learning, sometimes relating to specific FluCoMa technology and sometimes reflecting more broadly.
        </p>

        <div class="container">
            <div class='feature_image' style="background-image: url({learn_1.feature.featuredimage || _.sample(learn_1.feature.images) || '/general/learn_default.jpeg' });"></div>
        </div>

        <div class="container">
            <div class='feature_image' style="background-image: url({learn_2.feature.featuredimage || _.sample(learn_2.feature.images) || '/general/learn_default.jpeg' });"></div>
        </div>

        <div class="container">
            <div class='feature_image' style="background-image: url({learn_3.feature.featuredimage || _.sample(learn_3.feature.images) || '/general/learn_default.jpeg' });"></div>
        </div>

        <div class='flaired-title'>
            <div class="flair {learn_1.flair}" />
            <div>Learn: {learn_1.title}</div>
        </div>

        <div class='flaired-title'>
            <div class="flair {learn_2.flair}" />
            <div>Explore: {learn_2.title}</div>
        </div>

        <div class='flaired-title'>
            <div class="flair {learn_3.flair}" />
            <div>Reference: {learn_3.title}</div>
        </div>

        <a class="learn_more_link" href={learn_1.url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" href={learn_2.url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" href={learn_3.url}>
            Learn More <ArrowRight />
        </a>   
    </div>

    <div class="row_parent">
        <h2 class="row_title_secondary">
            Explore
        </h2>

        <p class="row_blurb">
            The references outline the underlying algorithms of the FluCoMa toolkit in more detail. We try to steer clear from specific implementation details and instead focus on the concepts behind each algorithm and to help illuminate what goes on under the hood.
        </p>

        <div class="container">
            <div class='feature_image' style="background-image: url({explore_1.feature.featuredimage || _.sample(explore_1.feature.images) || '/general/explore_default.jpeg' });"></div>
        </div>

        <div class="container">
            <div class='feature_image' style="background-image: url({explore_2.feature.featuredimage || _.sample(explore_2.feature.images) || '/general/explore_default.jpeg' });"></div>
        </div>

        <div class="container">
            <div class='feature_image' style="background-image: url({explore_3.feature.featuredimage || _.sample(explore_3.feature.images) || '/general/explore_default.jpeg' });"></div>
        </div>

        <div class='flaired-title'>
            <div class="flair {explore_1.flair}" />
            <div>Learn: {explore_1.title}</div>
        </div>

        <div class='flaired-title'>
            <div class="flair {explore_2.flair}" />
            <div>Explore: {explore_2.title}</div>
        </div>

        <div class='flaired-title'>
            <div class="flair {explore_3.flair}" />
            <div>Reference: {explore_3.title}</div>
        </div>

        <a class="learn_more_link" href={explore_1.url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" href={explore_2.url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" href={explore_3.url}>
            Learn More <ArrowRight />
        </a>   
    </div>








    <div class="top_container">
            <h2>   
                Get Involved
            </h2>
            <p class="text-block">
                With these pages we're aiming to help musicians learn about how some of these techniques work, taking advantage of some of the excellent resources already online where possible. However, we also want to fill what we see as something of a gap, by exploring the creative musical possibilities of these techniques. This site will grow as these musical possibilities reveal themselves, particularly – we hope – through people sharing their discoveries and insights on our <a href="https://discourse.flucoma.org">discussion forum</a>! There many ways you can get involved with FluCoMa either by contributing to the code and documentation or just by using the software:
            </p>
                <ol>
                    <li>
                        Download the <a href="https://github.com/flucoma/flucoma-max/releases/latest">Max</a>, <a href="https://github.com/flucoma/flucoma-sc/releases/latest">SuperCollider</a> or <a href="https://github.com/flucoma/flucoma-pd/releases/latest">Pd</a> package. You can follow the <a href="/installation">installation instructions</a> for your environment of choice.
                    </li>
                    <li>
                        Discuss, ask questions, or share what you've been using FluCoMa for in the <a href="https://discourse.flucoma.org/">discourse forum</a>. This is a community-driven place where we welcome anyone and especially encourage beginners as part of their learning experience. 
                    </li>
                    <li>
                        Dive into all of our open-source code at <a href="https://github.com/flucoma">GitHub</a>.
                    </li>
                </ol>
        </div>
</div>

<style>

    .front_page_video_container{
        padding: 0.5em;
    }

    .learn_more_link{
        margin: 0em 0em 0.5em 0.5em;
    }

    .container p{
        font-size: 0.9em;
    }

    .row_title{
        grid-column: 1 / 4;
        padding: 0.75em 0.75em 0em 0.75em;
        margin-top: 0em;
        margin-bottom: 0em;
    }

    .row_title_secondary{
        padding: 0.75em 0.75em 0em 0.75em;
        margin-top: 0em;
        margin-bottom: 0em;
    }

    .row_blurb{
        padding: 0.75em 0.75em 0em 0.75em;
        margin-top: 0em;
        margin-bottom: 0em;
        grid-column: 2 / 4;
        font-size: 0.8em;
    }

    .main_wrapper{
        margin-left: 1em;
		margin-right: 1em;
		margin-bottom: 1em;
    }

    .feature_image {
        position: relative;
        max-width: 100%;
        height: 10em;
        margin: 0.5em 0em 0.5em 0em;
        border: 0.063rem solid #dcdee0;
        background-position: center; /* Center the image */
        background-repeat: no-repeat; /* Do not repeat the image */
        background-size: cover; 
    }

    .video_row{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        max-width: 80%;
        margin: 0 auto;
        margin-bottom: 5em;
        grid-gap : 1em;
        /*border: 0.063rem solid #dcdee0;*/
    }

    .row_parent{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        max-width: 80%;
        margin: 0 auto;
        margin-bottom: 5em;
        grid-gap : 1em;
       /* border: 0.063rem solid #dcdee0;*/
    }

    .container{
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        border-radius: 0.25rem;
        padding: 0em 0.75em 0em 0.75em;
        margin-top: 0em;
        margin-bottom: 0.5em;
    }

    .top_container{
        padding: 0.75em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        max-width: 80%;
        margin: 0 auto;
    }

    .top_container p {
        font-size: 0.8em;
    }

    .top_container li {
        font-size: 0.8em;
    }

    .flaired-title {
        display: grid;
        grid-template-columns: 10px auto;
        justify-content: left;
        align-items: center;
        margin: 0em 0em 0em 0.5em;
        font-family: var(--font);
        font-weight: bold;
        gap: 0.25em;
    }

    .flair {
        width: 10px;
        height: 10px;
    }

    .event {
		background-color: rgb(235, 161, 23);
	}

	.article {
		background-color: var(--light-blue);
	}

	.reference {
		background-color: forestgreen;
	}

	.podcast {
		background-color: palevioletred;
	}

	.tutorial {
		background-color: rgba(102, 103, 171, 255);
	}

</style>