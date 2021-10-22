<script>
    import { page } from '$app/stores';

    function formatCrumb(string) {
        string = string.charAt(0).toUpperCase() + string.slice(1);
        return string
    }
    let crumbs;

    // Sanitise some special links where need be
    let linkLookup = {
        'Made-with-flucoma' : 'Made with FluCoMa'
    }
    $: {
        crumbs = $page.path.split('/').slice(1);
        crumbs = crumbs.filter(c => c !== '');
        crumbs = crumbs.map(c => formatCrumb(c));
        crumbs = crumbs.map(c => {
            return linkLookup[c] || c
        })
    }
</script>

<!-- Breadcrumbs -->
<div class="crumbs">
    <a href='/'>Home</a>
    {#each crumbs as c}
        / <a href=''>{c}</a> &nbsp
    {/each}
</div>

<style>
    .crumbs {
        font-size: 0.8em;
    }
</style>