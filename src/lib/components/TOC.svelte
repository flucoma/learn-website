<script>
    import { page } from '$app/stores';
    import pages from '../../../static/pages.json';
    $: headings = pages.pages[$page.path] || [];
</script>

{#if headings.length > 0}
<div class='toc'>Table of Contents</div>
{/if}
<div class="headings">
    {#each headings as h}
    {#if h.depth <= 2}
    <a href={h.url}>{h.heading}</a>
    {/if}
    {/each}
</div>

<style>
    .toc { 
        font-size: 1.1rem;
        margin-bottom: 1em;
        font-weight: bold;
    }
    
    .headings {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    
    a {
        text-decoration: none;
        font-size: 0.8rem;
    }
</style>