<script>
	import { page } from '$app/stores';
    import related from '../../../static/related.json';
    
    let links = [];
    $: {
		let path = $page.url.pathname;
		path = path.endsWith('/') ? path.slice(0, -1) : path;
        links = related[path ] || [];
    }
    $: references = links.filter(x => x.flair === 'reference');
    $: articles = links.filter(x => x.flair === 'article');
    $: tutorials = links.filter(x => x.flair === 'tutorial');
</script>


{#if links.length > 0}
<div>
    <h3 class='related'>Related Links</h3>

    {#if articles.length > 0}
    
    <div class="category">
        <div class='flaired-title'>
            <div class="flair article" />
            <div>Articles</div>
        </div>

        <div class='links'>
            {#each articles as link}
            <a  class='link' href="{link.url}">{link.title}</a>
            {/each}
        </div>
    </div>
    {/if}

    {#if tutorials.length > 0}
    <div class="category">
        <div class='flaired-title'>
            <div class="flair tutorial" />
            <div>Articles</div>
        </div>

        <div class='links'>
            {#each tutorials as link}
            <a  class='link' href="{link.url}">{link.title}</a>
            {/each}
        </div>
    </div>
    {/if}

    {#if references.length > 0}
    <div class="category">
        <div class='flaired-title'>
            <div class="flair reference" />
            <div class='title'>Reference</div>
        </div>

        <div class='links'>
            {#each references as link}
            <a  class='link' href="{link.url}">{link.title}</a>
            {/each}
        </div>
    </div>
    {/if}
</div>
{/if}

<style>
    .category {
        margin-bottom: 1em;
    }
    
    .flaired-title {
        display: grid;
        grid-template-columns: 10px max-content;
        justify-content: left;
        align-items: center;
        margin-bottom: 0.5em;
        font-family: var(--font);
        font-weight: bold;
        gap: 0.25em;
    }

    .links {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .link {
        text-decoration: none;
		font-size: 0.8rem;
    }

    .link:hover {
        color: var(--med-blue);
        background-color: transparent;
        text-decoration: underline;
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