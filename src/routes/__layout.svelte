<script>
    import "../app.css"
    import Header from '$lib/Header.svelte'
</script>

<Header />

<div class='container'>
    <div class='navigation'></div>
    
    <div class='main'>
        <slot/>
    </div>
    
    <div class='empty-right' />
</div>

<style>
    .container {
        display: grid;
        justify-content: center;
        margin: 1em;
    }

    .main {
        grid-area: main;
        min-width: 1px;
    }

    .navigation {
        grid-area: navigation;
        width: 20ch;
        height: max-content;
    }

    .empty-right {
        grid-area: empty-right;
        width: 20ch;
    }

    /* Media Queries */
    @media (min-width: 1200px) {
        .container {
            grid-template-columns: auto min(65ch, 100%) auto;
            grid-template-areas:
            "navigation main empty-right"
        }
    }
    @media (max-width: 1200px) {
        .container {
            justify-content:start;
            gap: 0px;
            grid-template-rows: auto auto;
            grid-template-areas:
            "navigation"
            "main"
        }

        .empty-right {
            display: none;
        }
    }
</style>
