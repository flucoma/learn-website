<script lang="ts">
    export let url: string = '';
    export let label= "";

    url = url.replace(/\.[^/.]+$/, ""); // remove file extension
</script>

<video controls loop>
    <source src={`${url}.mp4`} type="video/mp4">
    <source src={`${url}.webm`} type="video/webm">
    <p>Your browser doesn't support HTML5 video. </p>
    <track kind=captions>
</video>

<div class="caption">
    {label}
</div>