<!-- 
    Refer to:
    https://ptsjs.org/guide/op-0400
 -->

 <script>
    import { onMount } from 'svelte';
    import { CanvasSpace, Create } from 'pts';
    import Slider from '$lib/components/Slider.svelte';
    import Button from '$lib/components/Button.svelte';

    let canvas;
    let pts = [];
    let data = [];
    let mouse = [];
    let rect;
    let numNeighbours = 1;
    let fit = false;

    function getMousePos(canvas, evt) {
        // We need to do this manually otherwise when shifting the window the resize is not accounted for.
        rect = canvas.getBoundingClientRect();
        return [
            evt.clientX - rect.left,
            evt.clientY - rect.top
        ]
    }

    onMount(async() => {      
        let space = new CanvasSpace('#sketch')
        space.setup({ 
            bgcolor: '#e8e4ec',
            resize: true
        });

        let form = space.getForm();
        rect = canvas.getBoundingClientRect();
        space.add({
            start: () => {
                // Generate a random space of two-dimensional points between 0.0 and 1.0;
                pts = Create.distributeRandom( space.innerBound, 120 );
            },
            animate: (time, ftime, space) => {

                if (fit) {
                    form.fillOnly("#123").points( pts, 3, "circle" );
                    pts.sort((a, b) => a.$subtract(mouse).magnitude() - b.$subtract(mouse).magnitude())

                    // Draw lines from mouse to points
                    for (let j=0; j < numNeighbours; j++) {
                        form.strokeOnly('#0d47a1', 2).line( [ pts[j], mouse ] );
                    }

                    // Draw bigger circles on top of points
                    for (let i=0; i < numNeighbours; i++) {
                        form.fill("#f03").point( pts[i], 7, "square" );
                    }
                } else {
                    form.fillOnly("#787878").points( pts, 3, "circle" );
                }
            },
            action: (t,x,y,e) => {
                mouse = getMousePos(canvas, e);
            }
        });
        space.bindMouse().bindTouch().play();
    })
</script>

<div class="container">
    <canvas id='sketch' bind:this={ canvas } />
</div>

<div class="controls">
    <Button on:click={ () => fit = true } label='Fit' />
    <Slider bind:value={numNeighbours} min={1} max={15} title='Number of Neighbours' step={1} />
</div>

<style>
    #sketch {
        width: 100%;
        display: inline-block;
    }

    .controls {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }
</style>

