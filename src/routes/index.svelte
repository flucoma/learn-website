<script>
    import { featured } from '$lib/app.js';
    import ArrowRight from '$lib/components/ArrowRight.svelte';

    const chosen_learn = choose_items(featured, 'learn', 1);
    const chosen_explore = choose_items(featured, 'explore', 1);
    const chosen_reference = choose_items(featured, 'reference', 1);

    function choose_items(full_dict, type, num){
        var chosen = [];
        var local_poss = full_dict[type];

        for(var i = 0; i < num; i++){
            var this_key = Math.floor(Math.random() * Object.keys(local_poss).length);
            chosen.push(local_poss[Object.keys(local_poss)[this_key]]);
            delete local_poss[this_key];
        };
        return chosen;
    };
</script>

<div class="main-container">

    <div class="container" style="grid-column: 1/3;">
        <p class="text-block">
            Welcome to the <span style="font-weight: bold;">Fluid Corpus Manipulation Learn platform</span>. 
            A lot of music making with computers involves working with collections of audio, and these collections are getting bigger and bigger. At the same time, techniques for analysing sound and manipulating data keep being developed. Our project seeks to enable music making with collections of audio by making some of these techniques available for musical creative coding environments, alongside a set of supporting resources on these pages.
        </p>
    </div>

    <div class="container" style="grid-column: 1;">
        <h2>   
            Learn
        </h2>
        <p class="text-block">
            A variety of articles and guides discussing machine listening and machine learning, sometimes relating to specific FluCoMa technology and sometimes reflecting more broadly.
        </p>

        <div class='flaired-title'>
            <div class="flair {chosen_learn[0].flair}" />
            <div>Featured: {chosen_learn[0].title}</div>
        </div>
        <p>
            {chosen_learn[0].blurb}
        </p>
        <a href={chosen_learn[0].url}>
            Learn More <ArrowRight />
        </a>  
    </div>

    <div class="container" style="grid-column: 2;">
        <h2>   
            Explore
        </h2>
        <p class="text-block">
            Here we draw attention to people like you. Makers who use the FluCoMa toolkit or are involved in the wider community. We want to highlight what is out there to try and cultivate opportunities for learning and to situate this technology within a community of techno-fluent musicians.
        </p>

        <div class='flaired-title'>
            <div class="flair {chosen_explore[0].flair}" />
            <div>Featured: {chosen_explore[0].title}</div>
        </div>
        <p>
            {chosen_explore[0].blurb}
        </p>
        <a href={chosen_explore[0].url}>
            Learn More <ArrowRight />
        </a>
    </div>

    <div class="container" style="grid-column: 1;">
        <h2>   
            References
        </h2>
        <p class="text-block">
            The references outline the underlying algorithms of the FluCoMa toolkit in more detail. We try to steer clear from specific implementation details and instead focus on the concepts behind each algorithm and to help illuminate what goes on under the hood.
        </p>

        <div class='flaired-title'>
            <div class="flair reference" />
            <div>Featured: {chosen_reference[0].title}</div>
        </div>
        <p>
            {chosen_reference[0].blurb}
        </p>
        <a href={chosen_reference[0].url}>
            Learn More <ArrowRight />
        </a>
    </div>

    <div class="container" style="grid-column: 2;">
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

    .text-block{
        text-align: justify;
    }

    .main-container{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap : 1em;
    }

    .container{
        border-radius: 0.25rem;
        border: 0.063rem solid #dcdee0;
        padding: 0.75em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    .flaired-title {
        display: grid;
        grid-template-columns: 10px auto;
        justify-content: left;
        align-items: center;
        margin-bottom: 0.5em;
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