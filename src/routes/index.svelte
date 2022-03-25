<script>
    import { docs } from '$lib/app.js';
    import { featured_snippet } from '$lib/app.js';
    import { manual_config } from '$lib/app.js';
    import _ from 'lodash';
    import LearnMoreArrow from '$lib/components/LearnMoreArrow.svelte';

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





    // For code block:
    import { browser } from '$app/env';
            let block;

            function copyCode(element_id) {
                if (browser) {
                    let code = document.getElementById(element_id);
                    console.log(code.innerText);

                    var range, selection;

                    if (document.body.createTextRange) {
                        range = document.body.createTextRange();
                        range.moveToElementText(code);
                        range.select();
                    } else if (window.getSelection) {
                        selection = window.getSelection();
                        range = document.createRange();
                        range.selectNodeContents(code);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                    
                    navigator.clipboard.writeText(code.innerText);

                    var tick_id = 'pd_tick';
                    if(element_id == 'max_code'){
                        tick_id = "max_tick";
                    }else if(element_id == 'sc_code'){
                        tick_id = "sc_tick";
                    }

                    var fadeTarget = document.getElementById(tick_id);
                    fadeTarget.style.opacity = 1;
                    var fadeEffect = setInterval(function() {
                    if (fadeTarget.style.opacity < 0.1)
                    {
                    clearInterval(fadeEffect);
                    }
                    else
                    {
                    fadeTarget.style.opacity -= 0.1;
                    }
                    }, 200);
                }
            }

</script>

<div class="main_wrapper">

    <!--Introductory text-->
    <div class="full_text_container">
        <p>
            <span style="font-size: 1.2em;">Welcome to the <strong>Fluid Corpus Manipulation Learn platform</strong>.</span>
            <br>
            <a href="/learn">Learn</a> how to use the FluCoMa toolkit.
            <br>
            <a href="/explore">Explore</a> what other people are doing.
            <br>
            <a href="/reference">References</a> for all the algorithms in the toolkit.
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

            <div class="learn_more_link-featured">
                <LearnMoreArrow 
                link={rng_learn.url}
                />
            </div>  
        </div>

        <div class="row_featured_article" style="grid-area: featuredArticle2;">
            <div class='feature_image' style="background-image: url({rng_explore.feature.featuredimage || _.sample(rng_explore.feature.images) || '/general/explore_default.jpeg' });"></div>
        
            <div class='flaired-title-featured'>
                <div class="flair {rng_explore.flair}" />
                <div>Explore: {rng_explore.title}</div>
            </div>

            <div class="learn_more_link-featured">
                <LearnMoreArrow 
                link={rng_explore.url}
                />
            </div> 
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
    









    <!--Snippet section-->
    <div class="snippet_section">
        
        <h2 style="grid-area: snippetTitle;">Snippet of the day: {featured_snippet.meta_data.title}</h2>

        <p style="grid-area: snippetDesc;">{featured_snippet.meta_data.blurb}</p>


        <div style="grid-area: snippetVid;">

            <div class="front_page_video_container_snippet">
                <iframe
                title=""
                    width=100%
                    height=200px
                    src={`https://www.youtube.com/embed/${featured_snippet.meta_data.video_url}`}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            </div>
    
        </div>

        <div bind:this={block} class="code_block" style="grid-area: codeBlock1;">
            <h3>Max</h3>
            <button on:click={() => copyCode("max_code")} class="codebtn">📋</button>
            <div class="copied_tick" id="max_tick">✓</div>
            <div >
<pre class="code_container"><code id="max_code">{featured_snippet.max}</code></pre>
            </div>
        </div>

        <div bind:this={block} class="code_block" style="grid-area: codeBlock2;">
            <h3>SuperCollider</h3>
            <button on:click={() => copyCode("sc_code")} class="codebtn">copy</button>
            <div class="copied_tick" id="sc_tick">✓</div>
            <div >
<pre class="code_container"><code id="sc_code">{featured_snippet.sc}</code></pre>
            </div>
        </div>

        <div bind:this={block} class="code_block" style="grid-area: codeBlock3;">
            <h3>PureData</h3>
            <button on:click={() => copyCode("pd_code")} class="codebtn">copy</button>
            <div class="copied_tick" id="pd_tick">✓</div>
            <div >
<pre class="code_container"><code id="pd_code">{featured_snippet.pd}</code></pre>
            </div>
        </div>
           

    </div>









    <!--Learn Section-->
    <div class="row_parent">
        <h2 class="row_title_lower">
            Previously Featured: Learn
        </h2>

        <div class="learn_more_link-section" style="grid-area: sectionLearnMore;">
            <div >
                <LearnMoreArrow 
                link="/learn"
                />
            </div>
        </div> 

        {#each learn_random_array as item, i}
            <div class="img_container" style="grid-area: contentImg{i + 1};">
                <div class='feature_image' style="background-image: url({item.feature.featuredimage || _.sample(learn_random_array[0].feature.images) || '/general/learn_default.jpeg' });"></div>
            </div>
        {/each}

        {#each learn_random_array as item, i}
            <div class='flaired-title' style="grid-area: contentTitle{i + 1};">
                <div class="flair {item.flair}" />
                <div>{item.title}</div>
            </div>
        {/each}

        {#each learn_random_array as item, i}
            <div class="learn_more_link" style="grid-area: contentLink{i + 1};">
                <LearnMoreArrow 
                link={item.url}
                />
            </div>  
        {/each}
        
    </div>

    <!--Explore Section-->
    <div class="row_parent">
        <h2 class="row_title_lower">
            Previously Featured: Explore
        </h2>

        <div class="learn_more_link-section" style="grid-area: sectionLearnMore;">
            <LearnMoreArrow 
            link="/explore"
            />
        </div> 

        {#each explore_random_array as item, i}
            <div class="img_container" style="grid-area: contentImg{i + 1};">
                <div class='feature_image' style="background-image: url({item.feature.featuredimage || _.sample(learn_random_array[0].feature.images) || '/general/explore_default.jpeg' });"></div>
            </div>
        {/each}

        {#each explore_random_array as item, i}
            <div class='flaired-title' style="grid-area: contentTitle{i + 1};">
                <div class="flair {item.flair}" />
                <div>{item.title}</div>
            </div>
        {/each}

        {#each explore_random_array as item, i}
            <div class="learn_more_link" style="grid-area: contentLink{i + 1};">
                <LearnMoreArrow 
                link={item.url}
                />
            </div>  
        {/each}

    </div>

     <!--Reference Section-->
     <div class="algos_row">
        <h2 class="row_title_lower">
            Discover an Algorithm
        </h2>

        <div class="learn_more_link-section" style="grid-area: sectionLearnMore;">
            <LearnMoreArrow 
            link="/reference"
            />
        </div> 

        {#each reference_random_array as item, i}
            <div class='flaired-title' style="grid-area: algoTitle{i + 1};">
                <div class="flair {item.flair}" />
                <div>{item.title}</div>
            </div>

            <div class="algo_blurb" style="grid-area: algoBlurb{i + 1};" >
                <p>
                    {item.blurb}
                </p>
            </div>

            <div class="learn_more_link-algo" style="grid-area: contentLink{i + 1};">
                <LearnMoreArrow 
                link={item.url}
                />
            </div>  
        {/each}
 
    </div>
</div>

<style>

.snippet_section{
        max-width: 80%;
        margin: 0 auto;
        /*margin-top: 1em;*/
        margin-bottom: 5em;
        grid-gap : 1em;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas: 
        "snippetTitle snippetTitle snippetVid"
        "snippetDesc snippetDesc snippetVid"
        "codeBlock1 codeBlock2 codeBlock3";
    }

    .front_page_video_container_snippet{
        padding: 0.5em;
    }

    .code_container{
        border: 0.063rem solid #dcdee0;
        height: 10em;
        

        white-space: pre-wrap;
        word-wrap: break-word; 
        overflow-y: scroll;
    }

    .code_block {
		position: relative;
        overflow-x: auto;
	}

	.codebtn {
		font-family: var(--font);
		position: absolute;
		right: 0;
        margin: 0.5em;
	}

    .copied_tick{
        position: absolute;
		right: 0;
        bottom: 0;
        color: green;
        font-size: 2em;
        padding: 0.5em;
        opacity: 0;
    }










    /*Main div*/
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
        "featuredTitle featuredTitle sectionLearnMore"
        "contentImg1 contentImg2 contentImg3"
        "contentTitle1 contentTitle2 contentTitle3"
        "contentLink1 contentLink2 contentLink3";
    }

    .row_title_lower{
        grid-area: featuredTitle;
        padding: 0.75em 0.75em 0em 0.5em;
        margin-top: 0em;
        margin-bottom: 0em;
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

    .learn_more_link-algo{
        padding : 0em 0.75em 0.75em 0.75em;
        align-self: center;
        justify-self: end; 
        justify-content: end;
    }

    .learn_more_link-section{
        padding: 0.75em 0.75em 0em 0.75em;
        justify-self: end;
        align-self: center;
        justify-self: end; 
        justify-content: end;
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

    /*Algorithms row*/
    .algos_row{
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        max-width: 80%;
        margin: 0 auto;
        margin-bottom: 5em;
        grid-gap : 1em;
        grid-template-areas: 
        "featuredTitle featuredTitle sectionLearnMore"
        "algoTitle1 algoBlurb1 contentLink1"
        "algoTitle2 algoBlurb2 contentLink2"
        "algoTitle3 algoBlurb3 contentLink3";
    }

    .algo_blurb{
        padding: 0em 0.75em 0em 0.75em;
        font-style: italic;
    }

    /*Screen resizing stuff*/
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
        "featuredTitle featuredTitle sectionLearnMore"
        "contentImg1 contentImg2 contentImg3"
        "contentTitle1 contentTitle2 contentTitle3"
        "contentLink1 contentLink2 contentLink3";
        }

        .algos_row{
            grid-template-columns: 1fr 3fr 1fr;
            grid-template-areas: 
        "featuredTitle featuredTitle sectionLearnMore"
        "algoTitle1 algoBlurb1 contentLink1"
        "algoTitle2 algoBlurb2 contentLink2"
        "algoTitle3 algoBlurb3 contentLink3";
        }

        .learn_more_link-algo{
        padding : 0em 0.75em 0.75em 0.75em;
        align-self: center;
        justify-self: end; 
        justify-content: end;
        
        }

        .snippet_section{
            grid-template-columns: repeat(3, 1fr);
            grid-template-areas: 
            "snippetTitle snippetTitle snippetVid"
            "snippetDesc snippetDesc snippetVid"
            "codeBlock1 codeBlock2 codeBlock3";
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
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas: 
        "featuredTitle sectionLearnMore"
        "contentImg1 contentImg1"
        "contentTitle1 contentTitle1"
        "contentLink1 contentLink1"
        "contentImg2 contentImg2"
        "contentTitle2 contentTitle2"
        "contentLink2 contentLink2"
        "contentImg3 contentImg3"
        "contentTitle3 contentTitle3"
        "contentLink3 contentLink3";
        }

        .algos_row{
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas: 
        "featuredTitle sectionLearnMore"
        "algoTitle1 algoTitle1"
        "algoBlurb1 algoBlurb1"
        "contentLink1 contentLink1"
        "algoTitle2 algoTitle2"
        "algoBlurb2 algoBlurb2"
        "contentLink2 contentLink2"
        "algoTitle3 algoTitle3"
        "algoBlurb3 algoBlurb3"
        "contentLink3 contentLink3";
        }

        .learn_more_link-algo{
        padding: 0em 0.75em 0.75em 0.75em;
        align-self: center;
        justify-self: left; 
        justify-content: left;
        }

        .snippet_section{
                grid-template-columns: repeat(1, 1fr);
                grid-template-areas: 
                "snippetTitle"
                "snippetVid"
                "snippetDesc"
                "codeBlock1"
                "codeBlock2"
                "codeBlock3";
            }

	}

    /* Top introductiory text*/
    .full_text_container{
        padding: 3em 0.75em 0.75em 0.75em;
        margin-bottom: 0.5em;
        max-width: 80%;
        margin: 0 auto;
    }

    .full_text_container p {
        font-size: 1em;
        text-align: center;
    }

    /* Coloured boxes for flairs */
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