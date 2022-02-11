<script>
    import { docs } from '$lib/app.js';
    import ArrowRight from '$lib/components/ArrowRight.svelte';

	const overviews = docs.filter((x) => x.section === 'overviews');
    const chosen_overview = choose_items(overviews, 1);

    const madewiths = docs.filter((x) => x.section === 'madewithflucoma');
    const chosen_madewith = choose_items(madewiths, 1);

    const reference_list = docs.filter((x) => x.section === 'reference');
    const chosen_ref = choose_items(reference_list, 1);

    function choose_items(possibilities, num){
        var chosen = [];
        var local_poss = possibilities;
        for(var i = 0; i < num; i++){
            var this_idx = Math.floor(Math.random() * local_poss.length);
            chosen.push(local_poss[this_idx]);
            local_poss.splice(this_idx, 1);
        };
        return chosen;
    };
</script>

<div class="main-container">

    <div class="container" style="grid-column: 1;">
        <h2>   
            Welcome
        </h2>
        <p>
            Welcome to the Fluid Corpus Manipulation Learn platform. 
            A lot of music making with computers involves working with collections of audio, and these collections are getting bigger and bigger. At the same time, techniques for analysing sound and manipulating data keep being developed. Our project seeks to enable music making with collections of audio by making some of these techniques available for musical creative coding environments, alongside a set of supporting resources on these pages.
        </p>
    </div>

    <div class="container" style="grid-column: 2;">
        <h2>   
            Overviews
        </h2>
        <p>
            A variety of articles and guides discussing machine listening and machine learning, sometimes relating to specific FluCoMa technology and sometimes reflecting more broadly.
        </p>
        <div class='flaired-title'>
            <div class="flair {chosen_overview[0].flair}" />
            <div>Featured: {chosen_overview[0].title}</div>
        </div>
        <p>
            {chosen_overview[0].blurb}
        </p>
        <a href={chosen_overview[0].url}>
            Learn More <ArrowRight />
        </a>
    </div>

    <div class="container" style="grid-column: 1;">
        <h2>   
            Made with FluCoMa
        </h2>
        <p>
            Made with FluCoMa draws attention to people like you. Makers who use the FluCoMa toolkit or are involved in the wider community. We want to highlight what is out there to try and cultivate opportunities for learning and to situate this technology within a community of techno-fluent musicians.
        </p>
        <div class='flaired-title'>
            <div class="flair {chosen_madewith[0].flair}" />
            <div>Featured: {chosen_madewith[0].title}</div>
        </div>
        <p>
            {chosen_madewith[0].blurb}
        </p>
        <a href={chosen_madewith[0].url}>
            Learn More <ArrowRight />
        </a>
    </div>

    <div class="container" style="grid-column: 2;">
        <h2>   
            References
        </h2>
        <p>
            The references outline the underlying algorithms of the FluCoMa toolkit in more detail. We try to steer clear from specific implementation details and instead focus on the concepts behind each algorithm and to help illuminate what goes on under the hood.
        </p>
        <div class='flaired-title'>
            <div class="flair reference" />
            <div>Featured: {chosen_ref[0].title}</div>
        </div>
        <p>
            {chosen_ref[0].blurb}
        </p>
        <a href={chosen_ref[0].url}>
            Learn More <ArrowRight />
        </a>
    </div>

</div>


<style>

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