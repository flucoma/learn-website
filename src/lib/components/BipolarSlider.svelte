<script>
    import { scale, clip } from '$lib/util';

    export let value = 0; // value always comes in true
    export let min = 0, max = 2, step = 1;
    export let width = 40;
    export let bar_height = 200;
    export let thumb_height = 3;
    export let active = false;
    export let func = () => {};
    export let display_value = null;
    export let invert = false;

    let thumb, bar, rect, posfill, negfill;
    let down = false;
    let prev_touch = false;
    let prev_value = null;
    
    $: thumb_y = (
        clip(scale(value, [max, min], [0, bar_height]), 0, bar_height - thumb_height)
    )
    // scale(value, [max, min], [0, bar_height])
    $: fill_height = thumb_y <= bar_height/2 ?
        bar_height/2 - thumb_y :
        thumb_y - bar_height/2
    $: fill_y = thumb_y <= bar_height/2 ?
        fill_y = thumb_y :
        fill_y = bar_height/2
    // if thumb_y is above half, then the fill_y changes with the thumb and the rest is filled
    // if thumb_y is below half, then the fill_y stays at half, and the fill changes
    const move = (e) => {
        rect = bar.getBoundingClientRect();
        if (down) {
            const y = (e.pageY - rect.top) - window.scrollY;
            const ratio = invert ? 1 - (y / bar_height) : y / bar_height;
            let scaled = scale(ratio, [0, 1], [max, min]);
            value = Math.round((scaled - min) / step) * step + min;
            value = clip(value, min, max);
            if (prev_value !== value) {
                func()
            }
            prev_value = value;
        }
    }

    const handle_controldown = (e) => { 
        down = true 
        move(e);
    };
    const handle_mouseup = () => { down = false };
    const handle_touchend = () => { down = false };
    const handle_mousemove = (e) => { { move(e) }}
    const handle_touchmove = (e) => {
        const touch = e.touches[0];
        if (prev_touch) {
            move(touch)
        }
        prev_touch = touch;
    };
</script>

<svelte:window 
on:mousemove={ handle_mousemove } 
on:touchmove={ handle_touchmove }
on:mouseup={ handle_mouseup }
on:touchend={ handle_touchend }
/>

<div 
class="container nodrag">
    <svg
    on:mousedown={ handle_controldown }
    on:touchstart={ handle_controldown }
    width={ width } 
    height={ bar_height } 
    bind:this={ bar}
    class:active={active}
    >
        <rect 
        y={thumb_y} 
        bind:this={thumb} 
        width={width} height={thumb_height}
        />
        <rect 
        bind:this={posfill}
        y={fill_y}
        width={width} height={fill_height}
        class='fill'
        />
    </svg>
    <div class='no_hover'>
        {#if display_value !== null}
        { display_value }
        {:else}
        { value }
        {/if}
    </div>
</div>

<style>
    svg { 
        touch-action: none;
        background-color: white;
        stroke-width: 1px;
        stroke: black;
        /* outline: 1px solid rgb(136, 136, 136); */
    }

    rect {
        fill: var(--primary);
        stroke: var(--primary);
    }

    .fill {
        fill: rgba(255, 0, 0, 0.204);
        stroke: rgba(255, 0, 0, 0.204);
    }

    .active {
        background-color: var(--grey);
    }
</style>