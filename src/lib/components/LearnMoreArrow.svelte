<script>
    import ArrowRight from '$lib/components/ArrowRight.svelte';
    export let link = '/'
</script>

<a class='linkout' href={link}>Learn More <ArrowRight /></a>


<style>
    .linkout {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: left;
        place-items: center;
        gap: 0.2em;
    }

    .linkout:hover {
        background-color: transparent;
        color: var(--med-blue);
        gap: 0.3em;
    }

    .linkout, .linkout:hover {
        transition: gap 80ms ease-in-out;
    }
</style>