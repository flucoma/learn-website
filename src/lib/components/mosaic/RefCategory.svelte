<script>
    export let item = {};
    const title = item[0];
    const ref = item[1];
</script>

<section>
    <h3>{title}</h3>
    <ul>
        {#each ref as r}
        <li><a href={r.url}>{r.title}</a></li>
        {/each}
    </ul>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 1em;
        min-width: max-content
    }
    h3 {
        min-width: max-content;
        margin: 0;
    }

    ul {
        margin: 0;
		padding: 0;
    }

    li {
        display: block;
		margin: 0;
    }

    a {
        min-width: max-content;
        text-decoration: none;
		display: grid;
		grid-template-columns: auto auto;
		place-items: center;
		gap: 0.125em;
    }
</style>
