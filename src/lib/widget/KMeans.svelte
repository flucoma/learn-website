<script>
    import KMeans from 'tf-kmeans';
    import * as tf from '@tensorflow/tfjs';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import { CanvasSpace, Group, Pt, Circle } from 'pts';
    import { Chart, registerables } from 'chart.js';
    import Button from '$lib/components/Button.svelte';
    import gaussianTiny from '../../../static/data/gaussian4-tiny.json';
    import gaussianSmall from '../../../static/data/gaussian4-small.json';
    import gaussianData from '../../../static/data/gaussian4.json';
    import lineTiny from '../../../static/data/line-tiny.json';
    import lineData from '../../../static/data/curvey-line.json';
    
    // Configure some options for KMeans
    let numClusters = 4;
    
    // Set aside some variables to do with the kmeans centroids
    let predictions = [];
    let centroids = [];
    let iteration = 0;
    
    // Chart.js
    let ctx, canvas, chart;
    
    // Essentially rename the colour generation function
    var genColour = d3.interpolateSinebow;
    let kmeans;
    // Declare some vars to use after mounting
    let doMeans; // A function that the button gets bound to. We won't define it yet because of awaits
    // let data = Object.values(gaussianData.data); // The point data... TODO: fine a way to make this data re-usably
    let dataSelect = 'gaussianSmall';
    let dataLookup = {
        'gaussian' : gaussianData,
        'gaussianTiny' : gaussianTiny,
        'gaussianSmall' : gaussianSmall,
        'line' : lineData,
        'lineTiny' : lineTiny,
    }

    $: data = Object.values(dataLookup[dataSelect].data);
    
    const formatForChart = (d) => {
        // Marshalls data into a chart.js friendly format
        return d.map(datum => { return { x: datum[0], y: datum[1] }});
    }
    
    onMount(async() => {
        Chart.register(...registerables);
        ctx = canvas.getContext('2d');
        
        const chartData = {
            datasets: [{
                data: formatForChart(data),
                backgroundColor: '#000',
                borderColor: '#000',
                borderWidth: 1,
                pointRadius: 3
            }]
        };
        chart = new Chart(ctx, {
            type: 'scatter',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }},
                animation: {
                    duration: 1000
                },
                scales: { 
                    x: { display: false },
                    y: { display: false }
                }
            }
        })
    });
    
    doMeans = async() => {
        const tfData = tf.tensor(data);
        // Create an instance of the kmeans model
        kmeans = new KMeans({
            k: numClusters,
            maxIter: 40,
        });

        kmeans.TrainAsync(tfData,
            async(i, cent, pred) => {
                iteration = i;
                predictions = await pred.array();
                centroids = await cent.array();
                
                // Append centroids to the dataset
                let d = JSON.parse(JSON.stringify(data))
                d.push(...centroids);

                // Compute all the colours
                let colours = predictions.map(p => genColour(p / centroids.length));
                let centroidColours = centroids.map((c, i) => genColour(i / centroids.length));
                colours.push(...centroidColours);
                
                // Now calculate all the point radii
                // The last k points shold be the centroids so they need to be larger and in charger
                let rad = d.map((p, i) => i+1 <= predictions.length ? 3 : 10);

                chart.data.datasets[0].data = formatForChart(d)
                chart.data.datasets[0].pointBackgroundColor = colours;
                chart.data.datasets[0].pointBorderColor = colours;
                chart.data.datasets[0].pointRadius = rad;
                chart.update();
            }
        );
    };
    
    const updateData = () => {
        kmeans = null;
        iteration = 0;
        predictions = null;
        centroids = null;
        
        chart.data.datasets[0].pointBackgroundColor = ['#000'];
        chart.data.datasets[0].pointBorderColor = ['#000'];
        chart.data.datasets[0].pointRadius = 3
        chart.data.datasets[0].data = formatForChart(data);
        chart.update();
    };
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
        
        <select bind:value={dataSelect} on:change={updateData}>
            <option value='gaussian'>Four Gaussian Clusters (Large)</option>
            <option value='gaussianSmall'>Four Gaussian Clusters (Small)</option>
            <option value='gaussianTiny'>Four Gaussian Clusters (Tiny)</option>
            <option value='line'>A Synthetic Line (Large)</option>
            <option value='lineTiny'>A Synthetic Line (Tiny)</option>
        </select>
    </div>
    
    We are at iteration: { iteration }
    <canvas id="sketch" bind:this={canvas} />
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
        /* display: inline-block; */
        min-width: 0 !important;
        max-height: 400px;
    }
</style>
