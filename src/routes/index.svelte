<script>
    import { docs } from '$lib/app.js';
    import { manual_config } from '$lib/app.js';
    import _ from 'lodash';
    import ArrowRight from '$lib/components/ArrowRight.svelte';

    var learn = docs.filter(x => x.section === 'learn');
    var explore = docs.filter(x => x.section === 'explore');
    var reference = docs.filter(x => x.section === 'reference');

    const rng_learn = get_item_by_key(learn, 'url', manual_config.front_page.featured_learn.url);
    const rng_explore = get_item_by_key(explore, 'url', manual_config.front_page.featured_explore.url);
    learn = remove_element_from_array(learn, rng_learn);
    explore = remove_element_from_array(explore, rng_explore);

    const learn_random_array = get_random_elements(learn, 3);
    const explore_random_array = get_random_elements(explore, 3);
    const reference_random_array = get_random_elements(reference, 3);

    function get_random_elements(search_array, num_entries){
        // Build an array of three random entries.
        var to_return = [];
        for(var i = 0; i < num_entries; i++){
            var entry_to_add = _.sample(search_array);
            to_return.push(entry_to_add);
            _.remove(search_array, entry_to_add);
        };
        return to_return;
    };

    function remove_element_from_array(the_array, element){
        // Retruns a new array with the element removed.
        var to_return = [];
        for(var i = 0; i < the_array.length; i++){
            if(the_array[i] != element){
                to_return.push(the_array[i]);
            };
        };
        return to_return;
    };

    function get_item_by_key(search_array, key_name, val){
        // For retrieving the manually set content.
        var to_return = {};
        for(var i = 0; i < search_array.length; i++){
            if (search_array[i][key_name] == val){
                to_return =  search_array[i];
            };
        };
        return to_return;
    };

</script>

<div class="main_wrapper">

    <!--Introductory text-->
    <div class="full_text_container">
        <p>
            Welcome to the <strong>Fluid Corpus Manipulation Learn platform</strong>. 
            A lot of music making with computers involves working with collections of audio, and these collections are getting bigger and bigger. At the same time, techniques for analysing sound and manipulating data keep being developed. Our project seeks to enable music making with collections of audio by making some of these techniques available for musical creative coding environments, alongside a set of supporting resources on these pages.
        </p>
    </div>

    <!--Top featured section-->
    <div class="row_featured">
        <h2 class="row_title">
            Featured
        </h2>

        <div class="row_featured_article" style="grid-area: featuredArticle1;">
            <div class='feature_image' style="background-image: url({rng_learn.feature.featuredimage || _.sample(rng_learn.feature.images) || '/general/learn_default.jpeg' });"></div>

            <div class='flaired-title-featured'>
                <div class="flair {rng_learn.flair}" />
                <div>Learn: {rng_learn.title}</div>
            </div>

            <a class="learn_more_link-featured" href={rng_learn.url}>
                Learn More <ArrowRight />
            </a>  
        </div>

        

        <div class="row_featured_article" style="grid-area: featuredArticle2;">
            <div class='feature_image' style="background-image: url({rng_explore.feature.featuredimage || _.sample(rng_explore.feature.images) || '/general/explore_default.jpeg' });"></div>
        
            <div class='flaired-title-featured'>
                <div class="flair {rng_explore.flair}" />
                <div>Explore: {rng_explore.title}</div>
            </div>

            <a class="learn_more_link-featured" href={rng_explore.url}>
                Learn More <ArrowRight />
            </a> 
        </div>


        <div class="row_featured_video">

            <div class="front_page_video_container">
                <iframe
                title=""
                    width=100%
                    height=300px
                    src={`https://www.youtube.com/embed/${manual_config.front_page.featured_video.url}`}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            </div>
    
            <div class="video_description">
                <h3>
                    {manual_config.front_page.featured_video.title}
                </h3>
                <p>
                    {manual_config.front_page.featured_video.blurb}
                </p>
            </div>
    
        </div>

    </div>
    
    <!--Learn Section-->
    <div class="row_parent">
        <h2 class="row_title">
            Learn
        </h2>

        <div class="img_container" style="grid-area: contentImg1;">
            <div class='feature_image' style="background-image: url({learn_random_array[0].feature.featuredimage || _.sample(learn_random_array[0].feature.images) || '/general/learn_default.jpeg' });"></div>
        </div>

        <div class="img_container" style="grid-area: contentImg2;">
            <div class='feature_image' style="background-image: url({learn_random_array[1].feature.featuredimage || _.sample(learn_random_array[1].feature.images) || '/general/learn_default.jpeg' });"></div>
        </div>

        <div class="img_container" style="grid-area: contentImg3;">
            <div class='feature_image' style="background-image: url({learn_random_array[2].feature.featuredimage || _.sample(learn_random_array[2].feature.images) || '/general/learn_default.jpeg' });"></div>
        </div>

        <div class='flaired-title' style="grid-area: contentTitle1;">
            <div class="flair {learn_random_array[0].flair}" />
            <div>{learn_random_array[0].title}</div>
        </div>

        <div class='flaired-title' style="grid-area: contentTitle2;">
            <div class="flair {learn_random_array[1].flair}" />
            <div>{learn_random_array[1].title}</div>
        </div>

        <div class='flaired-title' style="grid-area: contentTitle3;">
            <div class="flair {learn_random_array[2].flair}" />
            <div>{learn_random_array[2].title}</div>
        </div>

        <a class="learn_more_link" style="grid-area: contentLink1;" href={learn_random_array[0].url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" style="grid-area: contentLink2;" href={learn_random_array[1].url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" style="grid-area: contentLink3;" href={learn_random_array[2].url}>
            Learn More <ArrowRight />
        </a>   
    </div>

    <!--Explore Section-->
    <div class="row_parent">
        <h2 class="row_title">
            Explore
        </h2>

        <div class="img_container" style="grid-area: contentImg1;">
            <div class='feature_image' style="background-image: url({explore_random_array[0].feature.featuredimage || _.sample(explore_random_array[0].feature.images) || '/general/explore_default.jpeg' });"></div>
        </div>

        <div class="img_container" style="grid-area: contentImg2;">
            <div class='feature_image' style="background-image: url({explore_random_array[1].feature.featuredimage || _.sample(explore_random_array[1].feature.images) || '/general/explore_default.jpeg' });"></div>
        </div>

        <div class="img_container" style="grid-area: contentImg3;">
            <div class='feature_image' style="background-image: url({explore_random_array[2].feature.featuredimage || _.sample(explore_random_array[2].feature.images) || '/general/explore_default.jpeg' });"></div>
        </div>

        <div class='flaired-title' style="grid-area: contentTitle1;">
            <div class="flair {explore_random_array[0].flair}" />
            <div>{explore_random_array[0].title}</div>
        </div>

        <div class='flaired-title' style="grid-area: contentTitle2;">
            <div class="flair {explore_random_array[1].flair}" />
            <div>{explore_random_array[1].title}</div>
        </div>

        <div class='flaired-title' style="grid-area: contentTitle3;">
            <div class="flair {explore_random_array[2].flair}" />
            <div>{explore_random_array[1].title}</div>
        </div>

        <a class="learn_more_link" style="grid-area: contentLink1;" href={explore_random_array[0].url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" style="grid-area: contentLink2;" href={explore_random_array[1].url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" style="grid-area: contentLink3;" href={explore_random_array[2].url}>
            Learn More <ArrowRight />
        </a>   
    </div>

     <!--Reference Section-->
     <div class="row_parent">
        <h2 class="row_title">
            Reference
        </h2>

        <div class="img_container" style="grid-area: contentImg1;">
            <div class='feature_image' style="background-image: url({reference_random_array[0].feature.featuredimage || _.sample(reference_random_array[0].feature.images) || '/general/reference_default.jpeg' });"></div>
        </div>

        <div class="img_container" style="grid-area: contentImg2;">
            <div class='feature_image' style="background-image: url({reference_random_array[1].feature.featuredimage || _.sample(reference_random_array[1].feature.images) || '/general/reference_default.jpeg' });"></div>
        </div>

        <div class="img_container" style="grid-area: contentImg3;">
            <div class='feature_image' style="background-image: url({reference_random_array[2].feature.featuredimage || _.sample(reference_random_array[2].feature.images) || '/general/reference_default.jpeg' });"></div>
        </div>

        <div class='flaired-title' style="grid-area: contentTitle1;">
            <div class="flair {reference_random_array[0].flair}" />
            <div>{reference_random_array[0].title}</div>
        </div>

        <div class='flaired-title' style="grid-area: contentTitle2;">
            <div class="flair {reference_random_array[1].flair}" />
            <div>{reference_random_array[1].title}</div>
        </div>

        <div class='flaired-title' style="grid-area: contentTitle3;">
            <div class="flair {reference_random_array[2].flair}" />
            <div>{reference_random_array[1].title}</div>
        </div>

        <a class="learn_more_link" style="grid-area: contentLink1;" href={reference_random_array[0].url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" style="grid-area: contentLink2;" href={reference_random_array[1].url}>
            Learn More <ArrowRight />
        </a>  

        <a class="learn_more_link" style="grid-area: contentLink3;" href={reference_random_array[2].url}>
            Learn More <ArrowRight />
        </a>   
    </div>
</div>

<style>

    .main_wrapper{
        margin-left: 1em;
		margin-right: 1em;
		margin-bottom: 1em;
    }

    /* Top featured div */
    .row_featured{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 
        "featuredTitle featuredTitle"
        "featuredArticle1 featuredVideo"
        "featuredArticle2 featuredVideo";

        max-width: 80%;
        margin: 0 auto;
        margin-bottom: 5em;
        grid-gap : 1em;
    }

    .row_featured_article{
        border-radius: 0.25rem;
        padding: 0em 0.75em 0em 0.75em;
        margin-top: 0em;
        margin-bottom: 0.5em;
    }

    .row_featured_video{
        grid-area: featuredVideo;
    }

    .row_title{
        grid-area: featuredTitle;
        padding: 0.75em 0.75em 0em 0.5em;
        margin-top: 0em;
        margin-bottom: 0em;
    }

    .front_page_video_container{
        padding: 0.5em;
    }

    .video_description{
        padding: 0em 0.5em 0em 0.5em;
    }

    .flaired-title-featured {
        display: grid;
        grid-template-columns: 10px auto;
        justify-content: left;
        align-items: center;
        margin: 0em 0em 0.5em 0em;
        font-family: var(--font);
        font-weight: bold;
        gap: 0.25em;
    }

    .learn_more_link-featured{
        margin: 0em 0em 0.5em 0em;
    }

    /*Other sections*/
    .row_parent{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        max-width: 80%;
        margin: 0 auto;
        margin-bottom: 5em;
        grid-gap : 1em;

        grid-template-areas: 
        "featuredTitle featuredTitle featuredTitle"
        "contentImg1 contentImg2 contentImg3"
        "contentTitle1 contentTitle2 contentTitle3"
        "contentLink1 contentLink2 contentLink3";
    }

    .img_container{
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        border-radius: 0.25rem;
        padding: 0em 0em 0em 0.75em;
        margin-top: 0em;
        margin-bottom: 0.25em;
    }

    .flaired-title {
        display: grid;
        grid-template-columns: 10px auto;
        justify-content: left;
        align-items: center;
        margin: 0em 0em 0.5em 0em;
        padding: 0em 0em 0em 0.75em;
        font-family: var(--font);
        font-weight: bold;
        gap: 0.25em;
    }

    .learn_more_link{
        margin: 0em 0em 0.5em 0em;
        padding: 0em 0em 0em 0.75em;
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

    .feature_image:hover {
        /*filter: blur(8px);*/
    }

    /*Screen size stuff*/
    @media (min-width: 1200px) {
		.row_featured {
			grid-template-columns: repeat(2, 1fr);
            grid-template-areas: 
        "featuredTitle featuredTitle"
        "featuredArticle1 featuredVideo"
        "featuredArticle2 featuredVideo";
		}

        .row_parent{
            grid-template-columns: repeat(3, 1fr);
            grid-template-areas: 
        "featuredTitle featuredTitle featuredTitle"
        "contentImg1 contentImg2 contentImg3"
        "contentTitle1 contentTitle2 contentTitle3"
        "contentLink1 contentLink2 contentLink3";
        }
	}

	@media (max-width: 1200px) {
		.row_featured {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas: 
        "featuredTitle"
        "featuredArticle1"
        "featuredArticle2"
        "featuredVideo";
		}

        .row_parent{
            grid-template-columns: repeat(1, 1fr);
            grid-template-areas: 
        "featuredTitle"
        "contentImg1"
        "contentTitle1"
        "contentLink1"
        "contentImg2"
        "contentTitle2"
        "contentLink2"
        "contentImg3"
        "contentTitle3"
        "contentLink3";
        }
	}

    /* The intro and get involved text like elements*/
    .full_text_container{
        padding: 3em 0.75em 0.75em 0.75em;
        margin-bottom: 0.5em;
        max-width: 80%;
        margin: 0 auto;
    }

    .full_text_container p {
        font-size: 0.8em;
    }

    .full_text_container li {
        font-size: 0.8em;
    }

    /* Coloured oxes for flairs */
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