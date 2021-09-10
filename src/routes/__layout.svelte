<script>
    import "../app.css"
    import Header from '$lib/Header.svelte'
    import Footer from '$lib/Footer.svelte'
    import pages from '../../static/pages.json'
    import { page } from '$app/stores'
    $: headings = pages.pages[$page.path]
</script>

<div class='container'>
    <Header />
    
    <div class='content'>
        <div class='navigation'>
            {#if headings}
            {#each headings as h}
            <a href={h.url}>{h.heading}</a>
            {/each}
            {/if}
        </div>
        
        <div class='main'>
            <slot/>
        </div>
        
        <div class='empty-right' />
    </div>
    
    <Footer />
</div>
    
<style>
    .container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    .content {
        display: grid;
        justify-content: center;
        margin: 1em;
    }

    .main {
        grid-area: main;
        max-width: 100%;
        min-width: 70ch;
    }

    .navigation {
        grid-area: navigation;
        width: 20ch;
        height: max-content;
        display: flex;
        flex-direction: column;

    }

    .empty-right {
        grid-area: empty-right;
        width: 20ch;
    }

    /* Media Queries */
    @media (min-width: 1200px) {
        .content {
            grid-template-columns: auto min(70ch, 100%) auto;
            grid-template-areas:
            "navigation main empty-right"
        }
    }

    @media (max-width: 1200px) {
        .navigation {
            display: none;
        }
        .empty-right {
            display: none;
        }
    }
</style>
