<script>
    import { page } from '$app/stores';
    import { breadcrumbs } from '$lib/app';

    // Sanitise some special links where need be
    const lookup = {
        'madewithflucoma' : 'Made with FluCoMa',
        'reference' : 'Reference',
        'guides' : 'Guides',
        'overviews' : 'Overviews'
    }

    function formatCrumb(crumb) {
        if (crumb in lookup)
            return lookup[crumb]
        return crumb
    }

    function splitPath(path) {
        // Splits a full page path into an array of parts
        // This can be used to then construct the breadcrumbs
        let d = [];
        path = path.split('/');
        path.shift();
    
        let accum = '';
        path.forEach((p, i) => {
            let sanitisedText = '';
            if (i > 1) {
                sanitisedText = $breadcrumbs.crumbs[$page.path]
            }
            else {
                sanitisedText = formatCrumb(p);
            }
            accum += '/';
            accum += p;
            let crumb = { url: accum, text: sanitisedText };
            d.push(crumb);
        })
        return d;
    }
    $: crumbs = splitPath($page.path);
</script>
<!-- Breadcrumbs -->
<div class="crumbs">
    <a href='/'>Home</a>
    {#each crumbs as c}
        / <a href={c.url}>{c.text}</a> &nbsp
    {/each}
</div>

<style>
    .crumbs {
        font-size: 0.8em;
    }
</style>