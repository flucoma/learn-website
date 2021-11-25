<script>
    export let imgSrc = '';
    export let imgAlt = '';
    export let name = '';
    export let website = '';
    export let bio = '';
</script>

<div class="mainTopContainer">

    <div class="contentsContainer border">
        <p>Contents</p>
        <p>Insert dynamic contents creation from markdown heading hierarchy here...</p>
    </div>

    <div class="artistBioContainer border">
        <p class="artistName">
            {name}
        </p>
        <a target='_blank' href={imgSrc}>
        <div class='container'>
                <img 
                alt={imgAlt} 
                src={imgSrc}
                />
            </div>
        </a>
        <a href={website} class="websiteLink">
            Website
        </a>
        <p class="artistBio">
            {@html bio}
        </p>
    </div>

</div>

<style lang='scss'>

    .mainTopContainer{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1em;
    }

    .contentsContainer{
        margin-top: 1em;
        padding: 1em;
    }

    .artistBioContainer{
        margin-top: 1em;
        padding: 1em;
    }

    .artistBio{
        font-size: small;
        text-align: justify;
    }

    .websiteLink{
        font-style: normal;
        text-decoration: none;
        text-align: center;
    }

    .artistName{
        font-weight: bold;
    }

    .container {
        display: grid;
        place-items: center;
        width: 80%;
        margin: 0 auto;
    }

    .border {
        border-radius: 2px;
        box-shadow: 0 1px 3px 4px rgba(0, 0, 0, 0.1);
    }

    a {
        max-width: 100%;
    }

    .container > img {
        padding-top: 1em;
        padding-bottom: 1em;
        max-width: 100%;
    }

</style>