<script>
    export let title;
	export let blurb;
	export let tags;
	import TOC from '$lib/components/TOC.svelte';
    import EditHistory from '$lib/components/EditHistory.svelte';
</script>

<div class="navigation">
    <TOC />
</div>

<main class="main">

    <div class="title-box">
        <h1>{title}</h1>
        <p class="blurb">
            {blurb}
        </p>
    
        <!-- <div class="tagtainer">
            {#each tags as tag}
                <a class="tag" href="/search/{tag}">
                    {tag}
                </a>
            {/each}
        </div> -->
        
    </div>
    
    <slot />
    
    <EditHistory />

</main>

<div class="related">
    
</div>


<style lang="postcss">
    :global(p) {
		text-align: justify;
		text-justify: inter-word;
	}

	.blurb {
		color: grey;
	}
	.tagtainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
	}

	.tag {
		width: max-content;
		padding: 0.15em;
		border-radius: 0px;
		box-shadow: 0 1px 1.5px 2px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.tag:hover {
		text-decoration: underline;
	}

	p {
		text-align: justify;
	}

    .main {
        grid-area: main;
        min-width: var(--min-text-width);
        max-width: var(--max-text-width);
        display: flex;
        flex-direction: column;
    }

    .navigation {
        grid-area: navigation;
        width: 25ch;
        height: max-content;
    }

    .related {
        grid-area: related;
        width: 25ch;
    }

    @media (max-width: 1200px) {
        .navigation {
            width: 100%;
        }

        .related {
            display: none;
        }
    }
</style>