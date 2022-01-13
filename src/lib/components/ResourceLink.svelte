<script lang='ts'>
    export let title: string = '';
    export let url: string = '';
    export let blurb: string = '';
</script>

<a class='container' href={url}>
    <h6>{ title }</h6>
    <p>{ blurb }</p>
    <a href={ url }>{ url }</a>
</a>

<style>
    .container {
        border-radius: 0.25rem;
        border: 0.063rem solid #dcdee0;
        padding: 0.75em;
        margin-top: 0.25em;
        margin-bottom: 0.25em;
        max-width: 100%;
    }

    .container > p {
        color: grey;
        margin: 0;
    }

    /* Overwrite hover behaviour */
    .container, .container:hover {
        color:black;
        background-color: white;
        text-decoration: none;
    }

    .container:hover {
        cursor: pointer;
    }

    .container > :global(h6) {
        margin: 0;
    }

    .container:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .container, .container:hover {
        transition: box-shadow 200ms ease-in-out;
    }

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

