<script>
    import "../app.css"
</script>

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
        grid-template-columns: auto min(80ch, 100%) auto;
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

#title {
    font-size: 24px;
    text-decoration: none;
    padding-top: 3px;
    padding-bottom: 3px;
    white-space: nowrap;
}

#title:hover {
    text-decoration: underline;
    background-color: white;
    color: black;
}

#subtitle {
    color: grey;
}

#header {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

#project-divider {
    font-weight: bold;
    text-decoration: underline;
}
</style>
