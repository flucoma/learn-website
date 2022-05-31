<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import * as d3 from 'd3';
	import Button from '$lib/components/Button.svelte';
    import metric0 from '../../../static/ref/mds/metric_0.json';
    import metric1 from '../../../static/ref/mds/metric_1.json';
    import metric2 from '../../../static/ref/mds/metric_2.json';
    import metric3 from '../../../static/ref/mds/metric_3.json';
    import metric4 from '../../../static/ref/mds/metric_4.json';
    import metric5 from '../../../static/ref/mds/metric_5.json';

	let canvas, ctx, chart;

    let metricLabel = 'Manhattan'

    const metric = [
        Object.values(metric0.data),
        Object.values(metric1.data),
        Object.values(metric2.data),
        Object.values(metric3.data),
        Object.values(metric4.data),
        Object.values(metric5.data)
    ]

    const labels = [
        'Manhattan', 
        'Euclidian', 
        'Squared Euclidian', 
        'Max Distance', 
        'Min Distance', 
        'KL Divergence'
    ]

	const colours = metric[0].map(v => d3.interpolateSinebow(v[0] * 2 * v[1]));

	onMount(async () => {
		Chart.register(...registerables);
		ctx = canvas.getContext('2d');

		const data = {
			datasets: [
				{
					data: metric[0],
					backgroundColor: colours,
					pointRadius: 5
				}
			]
		};

		chart = new Chart(ctx, {
			type: 'scatter',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				animation: { duration: 0 },
				scales: {
					x: { display: false },
					y: { display: false }
				}
			}
		});
		chart.options.animation = { duration: 1000 };
	});
</script>

<div class="container">
    <div class="vis">
        <div class="metric">{ metricLabel }</div>
        <canvas bind:this={canvas} id="scatter-plot" />
    </div>

	<div class="controls">
        {#each metric as m, i}
            <Button 
            width={'150px'}
            on:click={ () => { 
                chart.data.datasets[0].data = m; 
                chart.update() 
                metricLabel = labels[i] 
            }
            }
            label={ labels[i] }
            />
        {/each}
	</div>
</div>

<style>
	.container {
		margin-bottom: 1em;
	}

    .vis {
        max-height: 400px;
        min-height: 400px;
        max-width: 100%;
        margin-top: 1em;
    }

	#scatter-plot {
		max-width: 100%;
	}

	.controls {
		display: grid;
		grid-template-columns: auto auto auto;
		justify-content: center;
		gap: 1em;
		margin-top: 1em;
        margin-bottom: 1em;
	}

    .metric {
        position: absolute;
        font-size: 0.9rem;
        color: var(--grey);
    }
</style>
