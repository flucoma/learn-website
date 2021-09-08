<div class='container'>
    <a class='nav-link' href='/'>FluCoMa Learn</a>    
    <div class='links'>
        <a class='nav-link' href='/overviews'>Overviews</a>
        <a class='nav-link' href='/guides'>Guides</a>
        <a class='nav-link' href='/documentation'>Documentation</a>
        <a class='nav-link' href='/made-with-flucoma'>Made with FluCoMa</a>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        background: #1ca3fc;
        justify-content: center;
        align-items: center;
        min-height: 3em;
        padding: 1em;
    }

    .links {
        display: flex;
    }

    .nav-link {
        text-decoration: none;
        padding-right: 1em;
        padding-left: 1em;
        text-align: center;
    }

    .nav-link:visited {
        color: white;
    }

    .nav-link:hover {
        background: #0372b5;
    }

    .nav-link:visited {
        color: white;
    } 

    /* Media Queries */
    @media (min-width: 1200px) {
        .container {
        }
    }
    @media (max-width: 1200px) {
        .container {
            gap: 0.5em;
        }

        .links {
            flex-direction: column;
        }
    }
</style>