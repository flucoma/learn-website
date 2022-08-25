<script>
    import CodeSnippet from './CodeSnippet.svelte';

	let data = [
        {
            "title" : "Hear music made using FluCoMa",
            "desc" : "Watch this short video from Dialogues Festival 2021 in Edinbourgh which featured a showcase of FluCoMa projects.",
            "link" : "https://youtu.be/3GqYFDB425k",
            "content" : {
                "type" : "yt",
                "url" : "https://www.youtube.com/embed/3GqYFDB425k"
            }
        },
        {
            "title" : "Discuss FluCoMa on Discourse",
            "desc" : "Join the community of users who have been sharing code and ideas for the past five years.",
            "link" : "https://discourse.flucoma.org/",
            "content" : {
                "type" : "img",
                "url" : "/getting-started/discourse-screenshot.png"
            }
        },
        {
            "title" : "Slice by Novelty",
            "desc" : "Use the FluCoMa novelty slicer to slice by novelty.",
            "link" : "/reference/noveltyslice",
            "content" : {
                "type" : "code",
                "url" : "novelty_slice"
            }
        },
        {
            "title" : "Read an in-depth article about a FluCoMa project",
            "desc" : "Read an article in the FluCoMa Explore series: in-depth musicological analysis of performances and code.",
            "link" : "/explore",
            "content" : {
                "type" : "img",
                "url" : "/explore/harker/umap_explorer_example.png"
            }
        },
        {
            "title" : "Listen to the FluCoMa Podcast",
            "desc" : "Each episode features an interview with a creative coder at the top of their field talking about their creative practice.",
            "link" : "/explore/abtan",
            "content" : {
                "type" : "yt",
                "url" : "https://www.youtube.com/embed/UYSa73RvJQE"
            }
        },
        {
            "title" : "Check out the Source Code",
            "desc" : "If you're just curious or feel like contributing, check out the source code on GitHub.",
            "link" : "https://github.com/flucoma",
            "content" : {
                "type" : "img",
                "url" : "/getting-started/github-screenshot.png"
            }
        }
    ];
</script>

<div class="container">

    <h2 style="text-align: center; margin-bottom: 2em; margin-top: 2em;">Or maybe you have something more specific in mind?</h2>

    <div class="gallery">
        {#each data as item, i}
        <div class="gallery_element raisedbox" href={item.link}>
            
            <!--Text content alternates odd and even (see below)-->
            {#if i % 2 == 0}
                <a class="gallery_text_content" href={item.link}>
                    <h3 style="text-align: right;">{item.title}</h3>
                    <p style="text-align: right;">{item.desc}</p>
                </a>
            {/if}

            <!--Pretty content goes here-->
            <div class="gallery_pretty_content">
                {#if item.content.type == 'yt'}
                    <div class="video_container">
                        <iframe
                            title=""
                            width="100%"
                            height="200px"
                            src={item.content.url}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            style="margin: auto;"
                            class="pretty_vid"
                        />
                    </div>
                {:else if item.content.type == 'img'}
                    <div class="img_container">
                        <div
                            class="feature_image"
                            style="background-image: url({item.content.url});"
                        />
                    </div>
                {:else if item.content.type == 'code'}
                <div>
                    <CodeSnippet code_key={item.content.url} />
                </div>

                {/if}
            </div>

            {#if i % 2 != 0}
                <a class="gallery_text_content" href={item.link}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                </a>
            {/if}
            </div>
        {/each}

        <p style="text-align: centre; width: 80%; margin: auto; padding-top: 1em; padding-bottom: 2em;">
            We understand that sometimes you want to dig in really deep and sometimes you want to find a quick answer or example and get back to creating. There's a lot of information on this site, so take just what you need or use the rectangle links near the top to keep exploring.
        </p>
    </div>

</div>

<style>
    .container{
        width: 90%;
        margin: auto;
    }

    .gallery_element{
        margin: auto;
        border-radius: 0.25rem;
		border: 0.063rem solid #dcdee0;
        margin-bottom: 1em;
        max-width: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        height: 200px;
        overflow: hidden;

        z-index: -1;
    }

    .gallery_text_content{
        padding: 0.3em;
        padding-left: 1em;
        padding-right: 1em;
        width: 50%;
        color: var(--grey);
    }

    .gallery_text_content > h3{
        color: black;
    }

    .gallery_pretty_content{
        width: 50%;
        max-width: 50%;
        height: 200px;
        justify-content: center;
        align-items: center;

        cursor: default;
    }

    .gallery_element > p {
		color: var(--grey);
		text-align: center;
		text-justify: inter-word;
        text-decoration: none;
	}

    a{
        text-decoration: none;
    }

    a:hover{
        background-color: white;
    }

	/* Overwrite hover behaviour */
	.gallery_element,
	.gallery_element:hover {
		color: black;
		background-color: white;
		text-decoration: none;
	}

	.gallery_element:hover {
		cursor: pointer;
	}

    .video_container{
        max-width: 100%;
		height: 200px;
        margin: auto;
        max-height: 90%;
        height: 90%;
        justify-content: center;
        align-items: center;
    }

    .img_container {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50% 50%;
		padding: 0em 0em 0em 0em;
	}

	.feature_image {
		position: relative;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
        height: 200px;
	}

    /*=================================================
    WIDE*/
    @media (min-width: 1200px) {
        .gallery_element{
            height: 200px;
        }
        .gallery_pretty_content{
            height: 200px;
        }
        .video_container{
            height: 200px;
        }
        .feature_image{
            height: 200px;
        }
        .pretty_vid{
            height: 200px;
        }
	}
    /*=================================================
    NARROW*/
	@media (max-width: 1200px) {
        .gallery_element{
            height: 250px;
        }
        .gallery_pretty_content{
            height: 250px;
        }
        .video_container{
            height: 250px;
        }
        .feature_image{
            height: 250px;
        }
        .pretty_vid{
            height: 250px;
        }
	}
</style>