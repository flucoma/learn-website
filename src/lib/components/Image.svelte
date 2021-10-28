<script>
    export let src = '';
    export let alt = '';
    export let drawBorder = true;
</script>

<a target='_blank' href={src}>
<div class='container' class:border={drawBorder}>
        <img 
        alt={alt} 
        src={src}
        />
    </div>
</a>

<style lang='scss'>

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