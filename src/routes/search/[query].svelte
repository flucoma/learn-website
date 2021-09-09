<script context="module">
	export async function load({ page }) {
        return { 
            props: {
                query: page.params.query
            }
        };
	}
</script>

<script>
    export let query;

    console.log(query)
    import { structure, tags } from '$lib/app';
    console.log($tags["machine listening"])
</script>

<div class='related'>
    {#each $tags.db[query] as related}
        <a href={related}>{related}</a>
    {/each}
</div>

<style>
    .related {
        display: flex;
        flex-direction: column;
    }
</style>