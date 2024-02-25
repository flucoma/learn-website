<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import Chart from 'chart.js/auto';

	import annotationPlugin from 'chartjs-plugin-annotation';
	import scalingData from '$lib/data/learn/comparing-scalers/analysis.json';
	import Button from '$lib/components/Button.svelte';

	let chart, canvas;

	const transformer = i => {
		const entries = Object.entries(i);
		return entries.map((pt, i) => ({ x: pt[1][0], y: pt[1][1], id: pt[0] }));
	};

	const entries = Object.entries(scalingData.norm);
	const colours = entries.map((_, i) => d3.interpolateSinebow(i / entries.length));

	onMount(async () => {
		const ctx = canvas.getContext('2d');
		let data = {
			datasets: [
				{
					data: transformer(scalingData.raw),
					borderColor: colours,
					backgroundColor: colours,
					borderWidth: 0.8,
					tension: 1,
					pointRadius: 5,
					animation: { duration: 1000 }
				}
			]
		};
		Chart.register(annotationPlugin);
		chart = new Chart(ctx, {
			type: 'scatter',
			data: data,
			options: {
				plugins: {
					legend: { display: false },
					tooltip: {
						enabled: true
					}
				},
				normalized: true,
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						display: true,
						title: {
							display: true,
							text: 'Spectral Centroid (Hz)'
						}
					},
					y: {
						display: true,
						title: {
							display: true,
							text: 'Loudness (dB)'
						}
					}
				}
			}
		});
		raw();
	});

	const raw = () => {
		chart.data.datasets[0].data = transformer(scalingData.raw);
		chart.options.scales.x.min = 0;
		chart.options.scales.x.max = 10000;
		chart.options.scales.y.min = -5000;
		chart.options.scales.y.max = 5000;
		chart.options.plugins.annotation.annotations = {};
		chart.update();
		activeScale = 'Raw';
	};

	const norm = () => {
		console.log('did it!')
		chart.data.datasets[0].data = transformer(scalingData.norm);
		chart.options.scales.x.min = -3;
		chart.options.scales.x.max = 3;
		chart.options.scales.y.min = -3;
		chart.options.scales.y.max = 3;

		chart.options.plugins.annotation.annotations = {
			xmin: {
				type: 'line',
				xMin: 0,
				xMax: 0,
				yMin: -3,
				yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			xmax: {
				type: 'line',
				xMin: 1,
				xMax: 1,
				yMin: -3,
				yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymin: {
				type: 'line',
				xMin: -3,
				xMax: 3,
				yMin: 0,
				yMax: 0,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymax: {
				type: 'line',
				xMin: -3,
				xMax: 3,
				yMin: 1,
				yMax: 1,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			}
		};
		chart.update();
		activeScale = 'Normalised';
	};

	const std = () => {
		chart.data.datasets[0].data = transformer(scalingData.std);
		chart.options.scales.x.min = -3;
		chart.options.scales.x.max = 3;
		chart.options.scales.y.min = -3;
		chart.options.scales.y.max = 3;
		chart.options.plugins.annotation.annotations = {
			xmin: {
				type: 'line',
				xMin: -1,
				xMax: -1,
				yMin: -3,
				yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			xmax: {
				type: 'line',
				xMin: 1,
				xMax: 1,
				yMin: -3,
				yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymin: {
				type: 'line',
				xMin: -3,
				xMax: 3,
				yMin: -1,
				yMax: -1,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymax: {
				type: 'line',
				xMin: -3,
				xMax: 3,
				yMin: 1,
				yMax: 1,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			}
		};
		chart.update();
		activeScale = 'Standardised';
	};

	const robust = () => {
		chart.data.datasets[0].data = transformer(scalingData.robust);
		chart.options.scales.x.min = -3;
		chart.options.scales.x.max = 3;
		chart.options.scales.y.min = -3;
		chart.options.scales.y.max = 3;
		chart.options.plugins.annotation.annotations = {
			xmin: {
				type: 'line',
				xMin: 0,
				xMax: 0,
				yMin: -3,
				yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			xmax: {
				type: 'line',
				xMin: 1,
				xMax: 1,
				yMin: -3,
				yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymin: {
				type: 'line',
				xMin: -3,
				xMax: 3,
				yMin: 0,
				yMax: 0,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymax: {
				type: 'line',
				xMin: -3,
				xMax: 3,
				yMin: 1,
				yMax: 1,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			}
		};
		chart.update();
		activeScale = 'Robust Scaling';
	};

	const buttonSpec = [
		{
			label: 'Raw',
			func: raw
		},
		{
			label: 'Normalised',
			func: norm
		},
		{
			label: 'Standardised',
			func: std
		},
		{
			label: 'Robust Scaling',
			func: robust
		}
	];
	let activeScale = 'Raw';
</script>

<div class="interactive-example-container">
	<h3>Interactive Scaler Comparison</h3>
	<canvas id="filter" bind:this={canvas} />
	<p>Select a scaling type below:</p>
	<div class="scaling-mode-selector">
		{#each buttonSpec as spec}
			<Button width={'150px'} on:click={spec.func} label={spec.label} disabled={activeScale === spec.label} />
		{/each}
	</div>
</div>


<style>
	canvas {
		width: 100%;
		max-height: 600px;
	}
	.scaling-mode-selector {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: max-content;
		text-wrap: none;
	}
</style>
