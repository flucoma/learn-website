<script>
    export let item = {};
    const title = item[0];
    const ref = item[1];
</script>

<div>
    <h3>{title}</h3>
    <ul>
        {#each ref as r}
        <li><a href={r.url}>{r.title}</a></li>
        {/each}
    </ul>
</div>

<style>
    div {
        min-width: max-content;
        display: flex;
        flex-direction: column;
    }
    h3 {
        margin-top: 0.25em;
		margin-bottom: 0.25em;
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
        text-decoration: none;
		display: grid;
		grid-template-columns: auto auto;
		place-items: center;
		gap: 0.125em;
    }
</style>
