<script>
    import { clip, scale } from '$lib/util.js';

    export let value = 1;
    export let steps = 1;
    export let min = 1;
    export let max = 5;
    export let width = '20px';
    export let height = '200px'
    export let color = 'tomato';

    let mouseIsDown = false;
    let bar, rect;
    let calculatedHeight = '100%'
    $: if (bar) rect = bar.getBoundingClientRect();

    function update(e) {
        const y = e.clientY - rect.top;
        const step = 1 / (steps-1);
        let ratio = 1 - (y / rect.height);
        ratio = clip(ratio, 0, 1);
        ratio = Math.round((ratio) / step) * step;
        value = scale(ratio, 0, 1, min, max);
        ratio *= 100;
        calculatedHeight = `${ratio}%`
    }

    function mouseDown(e) {
        mouseIsDown = true;
        update(e);
    }

    function mouseUp() { mouseIsDown = false }

    function mouseMove(e) {
        if (mouseIsDown) update(e)
    }
</script>

<svelte:window on:mousemove={mouseMove} on:mouseup={mouseUp} />

<div 
class="container"
style:height={height}
style:width={width}
bind:this={bar}
on:mousedown={ mouseDown }
>
    <div class="progress" 
    style:height={calculatedHeight} 
    style:background-color={color}
    />
</div>

<style>
    .progress {
        height: 100%;
        width: 100%;
        margin: 0 auto;
    }

    .container {
        transform: rotate(180deg);
        background-color: white;
    }

</style>