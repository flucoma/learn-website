<script lang="ts">
    import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
    import { interpolateSinebow } from 'd3-scale-chromatic';
    import Button from '$lib/components/Button.svelte';
    import gaussian4 from '../../../static/data/gaussian4.json';
    import extent1 from '../../../static/ref/grid/extent.2.v.json';
    import extent2 from '../../../static/ref/grid/extent.5.h.json';
    import extent3 from '../../../static/ref/grid/extent.10.h.json';
    
    let canvas: HTMLCanvasElement;
    let ctx: RenderingContext;
    let chart: Chart;

    const btnWidth = '180px'

    const raw = Object.values(gaussian4.data).map(x => x);
    const colours = raw.map(x => interpolateSinebow(x[0]*x[1]))

    onMount(async () => {
        Chart.register(...registerables);
		ctx = canvas.getContext('2d');

        const data = {
            datasets: [
                { 
                    data: raw,
                    backgroundColor: colours,
                    pointRadius: 6,
                }
            ]
        }

        chart = new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }},
                animation: { duration: 0 },
                scales: { 
                    x: { display: false },
                    y: { display: false }
                }
            }
        })
        chart.options.animation = { duration: 1000}

    })
</script>
<div class='container'>
    <canvas bind:this={canvas} id="scatter-plot" />

    <div id="controls">
        <Button
        width={btnWidth}
        on:click={ 
            () => {
                chart.data.datasets[0].data = raw;
                chart.update();
            } 
        }
        label='Original State'
        />

        <Button
        width={btnWidth}
        on:click={
            () => {
                chart.data.datasets[0].data = Object.values(extent1.data).map(x => x);
                chart.update();
            } }
            label='Extent 2 along the vertical axis'
        />

        <Button
        width={btnWidth}
        on:click={
            () => {
                chart.data.datasets[0].data = Object.values(extent2.data).map(x => x);
                chart.update();
            } }
            label='Extent 5 with horizontal axis'
        />

        <Button
        width={btnWidth}
        on:click={
            () => {
                chart.data.datasets[0].data = Object.values(extent3.data).map(x => x);
                chart.update();
            } }
            label='Extent 10 with horizontal axis'
        />
    </div>
    
</div>


<style>

    .container {
        margin-bottom: 1em;
    }
    #scatter-plot {
		max-height: 400px;
		max-width: 100%;
		border: 1px solid rgb(232, 232, 232);
        border-radius: 0.25em;
    }

    #controls {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content:center;
        gap: 1em;
        margin-top: 1em;
    }
</style>