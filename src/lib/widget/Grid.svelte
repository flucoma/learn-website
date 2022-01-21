<script lang="ts">
    import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';

    let canvas: HTMLCanvasElement;
    let ctx: RenderingContext;
    let chart: Chart;

    let positions = new Array(100).fill(new Array(2).fill(0.0))
    positions = positions.map(x => [Math.random(), Math.random()] )

    function align() {

    }

    
    onMount(async () => {
        Chart.register(...registerables);
		ctx = canvas.getContext('2d');

        const data = {
            datasets: [
                { 
                    data: positions,
                    backgroundColor: []
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
                animation: { duration: 100 },
                scales: { 
                    x: { display: false },
                    y: { display: false }
                }
            }
        })

    })
</script>

<canvas bind:this={canvas} id="scatter-plot" />

<style>
    #scatter-plot {
		max-height: 400px;
		max-width: 100%;
		border: 1px solid rgb(232, 232, 232);
    }
</style>