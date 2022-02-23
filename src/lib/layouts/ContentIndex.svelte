<script>
	import TOC from '$lib/components/TOC.svelte';
</script>

<div class="navigation">
    <TOC />
</div>

<div class="main">
    <slot />
</div>

<div class="related" />

<style lang="postcss">
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