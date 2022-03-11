<script lang='ts'>
    export let title: string = '';
    export let url: string = '';
    export let blurb: string = '';
</script>

<a class='container raisedbox' href={url}>
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
</style>

