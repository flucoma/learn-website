<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { Chart, registerables } from 'chart.js';
	import annotationPlugin from 'chartjs-plugin-annotation';
	import scalingData from '$lib/data/learn/comparing-scalers/analysis.json';
	import Button from '$lib/components/Button.svelte';

	let chart, canvas;

	const transformer = (i) => {
		const entries = Object.entries(i);
		return entries.map((pt, i) => ({ x: pt[1][0], y: pt[1][1], id: pt[0] }))
	}
	const entries = Object.entries(scalingData.norm)
	const colours = entries.map((x,i) => d3.interpolateTurbo(x[1][0] * 4 * x[1][1]));

	onMount(() => {
		Chart.register(...registerables, annotationPlugin);
		const ctx = canvas.getContext('2d');
		let data = {
			datasets: [{
					labels: Object.entries(scalingData.raw).map((x, i) => x[0]),
					data: transformer(scalingData.raw),
					backgroundColor: colours,
					borderColor: colours,
					borderWidth: 2,
					tension: 1,
					pointRadius: 5,
					animation: { duration: 750 },
			}]
		};
		chart = new Chart(ctx, {
			type: 'scatter',
			data: data,
			options: {
				// onHover: (e, pts, chart) => console.log(e, pts, chart),
				plugins: {
					legend: { display: false },
					tooltip: { enabled: true },
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
		const data = scalingData.raw
		const origin = data['slice-21']
		const destination = data['slice-13']
		chart.data.datasets[0].data = transformer(data);
		chart.options.scales.x.min = 0;
		chart.options.scales.x.max = 10000;
		chart.options.scales.y.min = -5000;
		chart.options.scales.y.max = 5000;
		chart.options.plugins.annotation.annotations = {
			line1: {
				type: 'line',
				xMin: origin[0],
				xMax: destination[0],
				yMin: origin[1],
				yMax: destination[1]
			}
		};
		chart.update();
		activeScale = 'Raw'
	}

	const norm = () => {
		const data = scalingData.norm
		const origin = data['slice-21']
		const destination = data['slice-13']
		chart.data.datasets[0].data = transformer(data);
		chart.options.scales.x.min = -3;
		chart.options.scales.x.max = 3;
		chart.options.scales.y.min = -3;
		chart.options.scales.y.max = 3;

		chart.options.plugins.annotation.annotations = {
			line1: {
				type: 'line',
				xMin: origin[0],
				xMax: destination[0],
				yMin: origin[1],
				yMax: destination[1]
			},
			xmin: {
				type: 'line',
				xMin: 0, xMax: 0,
				yMin: -3, yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			xmax: {
				type: 'line',
				xMin: 1, xMax: 1,
				yMin: -3, yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymin: {
				type: 'line',
				xMin: -3, xMax: 3,
				yMin: 0, yMax: 0,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymax: {
				type: 'line',
				xMin: -3, xMax: 3,
				yMin: 1, yMax: 1,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
		}
		chart.update();
		activeScale = 'Normalised'
	}

	const std = () => {
		const data = scalingData.std;
		const origin = data['slice-21']
		const destination = data['slice-13']
		chart.data.datasets[0].data = transformer(data);
		chart.options.scales.x.min = -3;
		chart.options.scales.x.max = 3;
		chart.options.scales.y.min = -3;
		chart.options.scales.y.max = 3;
		chart.options.plugins.annotation.annotations = {
			line1: {
				type: 'line',
				xMin: origin[0],
				xMax: destination[0],
				yMin: origin[1],
				yMax: destination[1]
			},
			xmin: {
				type: 'line',
				xMin: -1, xMax: -1,
				yMin: -3, yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			xmax: {
				type: 'line',
				xMin: 1, xMax: 1,
				yMin: -3, yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymin: {
				type: 'line',
				xMin: -3, xMax: 3,
				yMin: -1, yMax: -1,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymax: {
				type: 'line',
				xMin: -3, xMax: 3,
				yMin: 1, yMax: 1,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
		}
		chart.update();
		activeScale = 'Standardised'
	}

	const robust = () => {
		const data = scalingData.robust;
		const origin = data['slice-21']
		const destination = data['slice-13']
		chart.data.datasets[0].data = transformer(data);
		chart.options.scales.x.min = -3;
		chart.options.scales.x.max = 3;
		chart.options.scales.y.min = -3;
		chart.options.scales.y.max = 3;
		chart.options.plugins.annotation.annotations = {
			line1: {
				type: 'line',
				xMin: origin[0],
				xMax: destination[0],
				yMin: origin[1],
				yMax: destination[1]
			},
			xmin: {
				type: 'line',
				xMin: 0, xMax: 0,
				yMin: -3, yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			xmax: {
				type: 'line',
				xMin: 1, xMax: 1,
				yMin: -3, yMax: 3,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymin: {
				type: 'line',
				xMin: -3, xMax: 3,
				yMin: 0, yMax: 0,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
			ymax: {
				type: 'line',
				xMin: -3, xMax: 3,
				yMin: 1, yMax: 1,
				borderColor: 'rgba(160, 160, 160, 0.5)'
			},
		}
		chart.update();
		activeScale = 'Robust Scaling'
	}

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
	]
	let activeScale = 'Raw'
</script>

<div class="swapper">
	{#each buttonSpec as spec}

	<Button 
	width={'150px'}
	on:click={spec.func}
	label={spec.label}
	disabled={activeScale === spec.label}
	/>

	{/each}
</div>

<canvas id="filter" bind:this={canvas} />

<style>
	#filter {
		width: 100%;
		max-height: 600px;
		margin: 0 auto;
	}

	.swapper {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
