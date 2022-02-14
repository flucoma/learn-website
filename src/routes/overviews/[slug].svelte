<script context="module">
	export async function load({ params }) {
		const { slug } = params;
        return { 
            props: { slug } 
        };
	}
</script>

<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    export let slug;

    onMount(async() => {
        goto(`/learn/${slug}`);
    })
</script>