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
</script>

<div>
    This is where you would do some search with the query:
    { query }
</div>