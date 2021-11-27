<script>
    export let src = '';
    export let label = '';
</script>

<div class='container'>
    <audio
        controls
        src={src}>
    </audio>
    <p class='label'>
        {@html label}
    </p>
    
</div>

<style>
    .container {
        padding-top: 1em;
        padding-bottom: 1em;
    }
    
    audio {
        max-width: 100%;
        margin: 0 auto;
        display: block;
    }

    .label{
        text-align: center;
        font-size: small;
        font-style: italic;
    }
</style>