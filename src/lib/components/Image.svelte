<script>
    export let src = '';
    export let alt = '';
</script>

<div class='container'>
    <img 
    alt={alt} 
    src={src} 
    />
    <p>{alt}</p>
</div>

<style lang='scss'>

    .container {
        display: grid;
        place-items: center;
    }

    .container > img {
        padding-top: 1em;
        padding-bottom: 1em;
    }


    @media (min-width: $breakpoint) {
        .container > img {
            width: 130%;
        }
    }

    @media (max-width: $breakpoint) {
        .container > img {
            width: 100%;
        }
    }
</style>