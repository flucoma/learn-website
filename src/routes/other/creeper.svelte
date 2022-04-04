<script>

    import { getting_started } from '$lib/app.js';
    let svg_element;

    var data = getting_started;





</script>

<div>

    <svg bind:this={svg_element} class="main_svg"></svg>

</div>

<style>

    .main_svg{
        width: 500px;
        height: 500px;
        background-color: antiquewhite;
    }

</style>