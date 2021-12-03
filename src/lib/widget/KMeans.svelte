<script>
    import { onMount } from 'svelte';
	import { CanvasSpace, Group, Pt } from 'pts';
    import Button from '$lib/components/Button.svelte';
    import * as d3 from 'd3';

    var genColor = d3.interpolateSinebow;
    
    // Declare some vars to use after mounting
    let result = {};
    let doMeans = () => {};
    let data = new Array(400).fill([null, null]);
    let ready = false;

    // chart / pts.js
    let canvas, pts;

    const randColor = () => {
        return Math.floor(Math.random()*16777215).toString(16);
    }
    
    onMount(async() => {
        const module = await import('ml5');
        const ml5 = module.default;

        // Generate some random data each time to start with
        data = data.map(x => [Math.random(), Math.random()]);
        
        // Configure some options for KMeans
        let options = {
            k: 4,
            maxIter: 500,
            threshold: 0.5,
        };
        
        doMeans = () => {
            result = ml5.kmeans(
                data.map(x => { return { 
                    x: x[0], 
                    y: x[1]
                }}), 
                options,
                () => {
                    ready = true;
                }
            );
        }


        let space = new CanvasSpace('#sketch');
		let darkBlue = 'rgba(8, 60, 100,0.5)';
		space.setup({
			bgcolor: 'rgba(28,164,252,0.01)',
			resize: true
		});

		let form = space.getForm();
		space.add({
			animate: (time, ftime, space) => {
                // Map norm data to canvas

				if (ready) {
                    result.dataset.forEach(p => {
                        let color = genColor(p.centroid / result.config.k);
                        let pt = new Pt([ 
                            p[0]*space.size.x * 0.9 + (space.size.x * 0.05), 
                            p[1]*space.size.y * 0.9 + (space.size.y * 0.05)
                        ]) 
                        form.fillOnly(color).point(pt, 3, 'circle')
                    })
				} else {
                    const tData = data.map(d => [ 
                        d[0]*space.size.x * 0.9 + (space.size.x * 0.05), 
                        d[1]*space.size.y * 0.9 + (space.size.y * 0.05)
                    ]);
                    pts = Group.fromArray(tData);
                    form.fillOnly('#123').points(pts, 3, 'circle');

					// form.fillOnly('#787878').points(pts, 3, 'circle');
				}
			}
		});
		space.bindMouse().bindTouch().play();
	});    
</script>

<div class="container">

    <Button on:click={doMeans} 
    label={'Calculate Means'}
    width={'100%'}
    />
    
    <canvas id="sketch" bind:this={canvas}/>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    #sketch {
        width: 100%;
		display: inline-block;
        min-height: 200px;
        height: 290px;
    }
</style>
