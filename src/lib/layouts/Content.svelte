<script>
    import { onMount } from 'svelte';
    export let title;
	export let blurb;
	import TOC from '$lib/components/TOC.svelte';
    import EditHistory from '$lib/components/EditHistory.svelte';
</script>

<div class="navigation">
    <TOC />
</div>

<div class="main">
    <div class="title-box">
        <h1>{title}</h1>
        <p class="blurb">
            {blurb}
        </p>
    </div>

    <slot />

    <EditHistory />
</div>

<div class="blank" />


<style lang="postcss">
    :global(p) {
		text-align: justify;
		text-justify: inter-word;
	}

	.blurb {
		color: grey;
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

    .blank {
        grid-area: blank;
        width: 25ch;
    }

    @media (max-width: 1200px) {
        .navigation {
            width: 100%;
        }

        .blank {
            display: none;
        }
    }
</style>