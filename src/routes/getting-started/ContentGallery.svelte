<script>
    import GalleryItem from './GalleryItem.svelte';
	let items = [
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

<h2>Or maybe you have something more specific in mind?</h2>

<div class="container">
    {#each items as item}
        <GalleryItem {item}/>
    {/each}
</div>

<style>
    .container {
        display: grid;
        gap: 1em;
    }

    @media (max-width: 768px) {
        .container {
            grid-template-columns: auto;
        }
    }

    @media (min-width:768px) and (max-width:1200px) {
        .container {
            grid-template-columns: repeat(2, auto);
        }
    }

    @media (min-width:1200px) {
        .container {
            grid-template-columns: repeat(3, auto);
        }
    }
</style>

<!-- <Masonry {items} {minColWidth} {maxColWidth} {gap} idKey={'title'} animate={false} let:item bind:width bind:height>
    <GalleryItem {item} />
</Masonry> -->

<!-- <p style="text-align: centre; width: 80%; margin: auto; padding-top: 1em; padding-bottom: 2em;">
    We understand that sometimes you want to dig in really deep and sometimes you want to find a quick answer or example and get back to creating. There's a lot of information on this site, so take just what you need or use the rectangle links near the top to keep exploring.
</p> -->