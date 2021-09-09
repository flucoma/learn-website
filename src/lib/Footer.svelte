<footer>
    <div class='container'>
        <div class="column">
            <div class='address'>
                <div class='head'>Address</div>
                <div>FluCoMa Project</div>
                <div>Department of Music</div>
                <div>University of Huddersfield</div>
                <div>Queensgate Campus</div>
                <div>Huddersfield, West Yorkshire</div>
                <div>England HD13DH</div>
            </div>
        </div>

        <div class="column">
            <div class='contact'>
                <div class='column'>
                    <div class="head">PHONE</div>
                    <div>+44 (0)1484 47 36 08</div>
                
                    <div class="head">FACEBOOK</div>
                    <a target='_blank' href='https://www.facebook.com/flucoma'>facebook.com/flucoma</a>
                </div>

                <div class="column">
                    <div class="head">EMAIL</div>
                    <a href='mailto:info@flucoma.org'>info@flucoma.org</a>
                    
                    <div class="head">TWITTER</div>
                    <a target='_blank' href='https://twitter.com/flucoma'>twitter.com/flucoma</a>
                    
                </div>
            </div>
        </div>

        <div class="column middle">
            <div class='funding'>
                This project has received funding from the European Research Council (ERC) under the European Union’s Horizon 2020 research and innovation programme (grant agreement No 725899). 
            </div>
        </div>

    </div>
</footer>

<style>
    footer {
        width: 100%;
        margin-top: auto;
    }
    .container {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: space-around;
        background-color: rgb(8,60,100);
        color: white;
        font-size: 0.8em;
    }

    .column {
        display: flex;
        flex-direction: column;
        margin: 1em;
        gap: 0.75em;
    }

    .contact {
        display: flex;
        flex-direction: row;
    }

    .middle {
        max-width: 300px;
    }
    .head {
        font-weight: bold;
    }

    a {
        color: white;
    }

    a:hover {
        font-style: italic;
    }

    @media (min-width: 1200px) {
        .container {
        }
    }
</style>