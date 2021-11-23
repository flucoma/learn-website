<script>
    export let src = '';
</script>

<div class='container'>
    <audio
        controls
        src={src}>
    </audio>
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
</style>