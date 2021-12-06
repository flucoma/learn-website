<script>
    import KMeans from 'tf-kmeans';
    import * as tf from '@tensorflow/tfjs';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import { CanvasSpace, Group, Pt, Circle } from 'pts';
    import Button from '$lib/components/Button.svelte';
    import Slider from '$lib/components/Slider.svelte';
    import gaussianData from '../../../static/data/gaussian4.json';
    import lineData from '../../../static/data/curvey-line.json';
    
    // Configure some options for KMeans
    let numClusters = 4;
    
    // Set aside some variables to do with the kmeans centroids
    let predictions, centroids;
    let iteration = 0;
    
    // Essentially rename the colour generation function
    var genColor = d3.interpolateSinebow;
    let kmeans;
    // Declare some vars to use after mounting
    let doMeans; // A function that the button gets bound to. We won't define it yet because of awaits
    // let data = Object.values(gaussianData.data); // The point data... TODO: fine a way to make this data re-usably
    let dataSelect = 'gaussian';
    $: data = dataSelect === 'line' ? Object.values(lineData.data) : Object.values(gaussianData.data)

    const reset = () => {
        kmeans = null;
        iteration = 0;
        predictions = null;
        centroids = null;
    }
    
    onMount(async() => {
        doMeans = async() => {
            const tfData = tf.tensor(data);
            // Create an instance of the kmeans model
            kmeans = new KMeans({
                k: numClusters,
                maxIter: 40,
            });
            console.log(kmeans)
            await kmeans.TrainAsync(tfData,
            async(i, cents, preds) => {
                iteration = i;
                centroids = await cents.array();
                predictions = await preds.array();
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
                if (predictions && centroids) {
                    predictions.forEach((p, i) => {
                        let coords = data[i];
                        let color = genColor(p / kmeans.k);
                        let pt = new Pt([ 
                        coords[0]*space.size.x, 
                        coords[1]*space.size.y
                        ]) 
                        form.fillOnly(color).point(pt, 3, 'circle')
                    });
                    
                    centroids.forEach((c, i) => {
                        let pt = new Pt([
                            c[0] * space.size.x,
                            c[1] * space.size.y
                        ])
                        
                        let c1 = Circle.fromCenter(pt, 12)
                        let color = genColor(i / kmeans.k);
                        form.fill(color).circle(c1)
                    });
                } else {
                    const tData = data.map(d => [ 
                    d[0]*space.size.x, 
                    d[1]*space.size.y
                    ]);
                    const pts = Group.fromArray(tData);
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
    
    <div class="controls">
        <input
        placeholder='Number of Clusters' 
        type=number bind:value={numClusters} min=1 max=50
        >
        
        <select bind:value={dataSelect} on:change={reset}>
            <option value='gaussian'>Four Gaussian Clusters</option>
            <option value='line'>A Wiggly Line</option>
        </select>
    </div>
    
    We are at iteration: { iteration }
    <canvas id="sketch"/>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    
    .controls {
        display: grid;
        grid-template-columns: auto auto;
    }
    #sketch {
        width: 100%;
        display: inline-block;
        min-height: 200px;
        height: 290px;
    }
</style>
