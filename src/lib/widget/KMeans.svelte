<script>
    import { onMount } from 'svelte';
	import { CanvasSpace, Group, Pt, Circle } from 'pts';
    import Button from '$lib/components/Button.svelte';
    import * as d3 from 'd3';
    import gaussianData from '../../../static/data/gaussian4.json';
    import KMeans from 'tf-kmeans';
    import * as tf from '@tensorflow/tfjs';

    // Configure some options for KMeans
    let options = {
        k: 4,
        maxIter: 20,
    };

    let predictions, centroids;
    let iteration = 0;

    const kmeans = new KMeans(options);

    var genColor = d3.interpolateSinebow;
    
    // Declare some vars to use after mounting
    let result = {};
    let data = Object.values(gaussianData.data);
    let doMeans = () => {};
    // let data = new Array(400).fill([null, null]);
        // Generate some random data each time to start with
        // data = data.map(x => [Math.random(), Math.random()]);
    let ready = false;

    // chart / pts.js
    let canvas, pts;

    const randColor = () => {
        return Math.floor(Math.random()*16777215).toString(16);
    }
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    onMount(async() => {
        doMeans = async() => {
            const tfData = tf.tensor(data);
            await kmeans.TrainAsync(tfData,
                async(i, cents, preds) => {
                    iteration = i;
                    predictions = await preds.array(); 
                    centroids = await cents.array();
                    // await sleep(50);
                }
            )
        }

        let space = new CanvasSpace('#sketch');
		space.setup({
			bgcolor: 'rgba(28,164,252,0.01)',
			resize: true
		});

		let form = space.getForm();
		space.add({
			animate: (time, ftime, space) => {
                // Map norm data to canvas

				if (predictions && centroids) {
                    predictions.forEach((p, i) => {
                        let coords = data[i];
                        let color = genColor(p / options.k);
                        let pt = new Pt([ 
                            coords[0]*space.size.x, 
                            coords[1]*space.size.y
                        ]) 
                        form.fillOnly(color).point(pt, 3, 'circle')
                    })

                    centroids.forEach(c => {
                        let pt = new Pt([
                            c[0] * space.size.x,
                            c[1] * space.size.y
                        ])

                        let c1 = Circle.fromCenter(pt, 10)

                        form.fill('#000').circle(c1)
                        
                    });
				} else {
                    const tData = data.map(d => [ 
                        d[0]*space.size.x * 0.9 + (space.size.x * 0.05), 
                        d[1]*space.size.y * 0.9 + (space.size.y * 0.05)
                    ]);
                    pts = Group.fromArray(tData);
                    form.fillOnly('#123').points(pts, 3, 'circle');
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
    
    We are at iteration: { iteration }
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
