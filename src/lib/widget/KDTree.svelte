<!-- 
    Refer to:
    https://ptsjs.org/guide/op-0400
 -->

 <script>
    import { onMount } from 'svelte';
    import { CanvasSpace, Pt, Group } from 'pts';
    import * as Tone from 'tone';
    import _ from 'lodash';

    // Get Data
    import raw from '../../../static/scaling/raw.json';
    import norm from '../../../static/scaling/norm.json';
    import slices from '../../../static/scaling/slices.json';

    let canvas;
    let ready = false;
    let canPlay = false;
    let pts = [];
    let mouse;
    let rect;
    let numMatches = 2;
    let slice;
    let data;

    function getMousePos(canvas, evt) {
        // We need to do this manually otherwise when shifting the window the resize is not accounted for.
        rect = canvas.getBoundingClientRect();
        return [
            evt.clientX - rect.left,
            evt.clientY - rect.top
        ]
    }

    onMount(async() => {

        // Load Sample
        const sample = new Tone.Player('/scaling/src.wav', () => { console.log(ready = true) }).toDestination();
        sample.loop = 1;
        
        let space = new CanvasSpace('#sketch').setup({ 
            bgcolor: '#e8e4ec',
            autoResize: true 
        });
        let form = space.getForm();
        rect = canvas.getBoundingClientRect();
        space.add({
            start: () => {
                data = _.mapValues(norm.data, pt => new Pt([ pt[0]*space.width, pt[1]*space.height ]));
                pts = Group.fromArray(Object.values(data));
            },
            animate: (time, ftime, space) => {
                _.forEach(data, (v, k) => { 
                    data[k]['dist'] = v.$subtract(mouse).magnitude()
                })

                let distances = _.map(data, v => v.dist);
                slice = Object.keys(data)[_.indexOf(distances, _.min(distances))]

                let start = slices.data[slice][0]
                let end = start + slices.data[slice][1]

                sample.loopStart = start / 44100.0
                sample.loopEnd = end / 44100.0

                pts.sort((a, b) => a.$subtract(mouse).magnitude() - b.$subtract(mouse).magnitude())

                for (let i=1; i < numMatches; i++) {
                    form.fillOnly("#123").points( pts.slice(0, numMatches), 3, "circle" );
                }
                for (let j=0; j < numMatches; j++) {
                    form.strokeOnly('#0d47a1', 2).line( [ pts[j], pts[0] ] );
                }
                form.fill("#f03").point( pts[0], 10, "circle" );
                form.fillOnly("#123").points( pts.slice(numMatches), 2, "circle" );
            },
            action: (t,x,y,e) => {
                if (e.type === 'mousedown') {
                    sample.start()
                } else if (e.type === 'mouseup') {
                    sample.stop()
                }

                mouse = getMousePos(canvas, e)
            }
        });
        space.play().bindMouse();
        ready = true;
    })
</script>

{ canPlay }

{ slice }

<canvas id='sketch' bind:this={ canvas } />

<style>
    #sketch {
        width: 100%;
        display: inline-block;
    }
</style>

