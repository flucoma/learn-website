<script>
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';
    let canvas;
    let ctx;
    let data;
    let numPoints = 1000;
    onMount(async() => {

        ctx = canvas;

        await fetch('/drum.csv')
            .then(response => response.text())
            .then(d => data=d.split('\n'))

        data.forEach((d, i) => {
            data[i] = parseFloat(d.replace(/(\r\n|\n|\r)/gm, ""))
        });

        let d = {
            labels: data.slice(0, numPoints).map((d, i) => i),
            datasets: [{
                label: 'A',
                data: data.slice(0, numPoints),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
            }]
        }

        let mChart = new Chart(ctx, {
            type: 'line',
            data: d,
            options: {
                x: {
                    // ticks: {
                    //     max: 12,
                    //     min: -144
                    // }
                },
            }
        })
    });
</script>
<input type='range' default=1000 min=500 max=10000 bind:this={numPoints} />
<canvas id='canvas' bind:this={canvas}></canvas>

<style>
    #canvas {
        width: 100%;
        height: 600px;
    }
</style>