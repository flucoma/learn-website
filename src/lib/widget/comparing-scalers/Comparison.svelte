<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import annotationPlugin from 'chartjs-plugin-annotation';
	import scalingData from '$lib/data/learn/comparing-scalers/analysis.json';

	let chart, canvas;

	const transformer = (i) => {
		const entries = Object.entries(i);
		return entries.map((pt, i) => ({ x: pt[1][0], y: pt[1][1], id: pt[0] }))
	}

	onMount(async () => {
		Chart.register(...registerables, annotationPlugin);
		const ctx = canvas.getContext('2d');
		let data = {
			datasets: [
				{
					data: transformer(scalingData.raw),
					borderColor: 'black',
					borderWidth: 0.8,
					tension: 1,
					pointRadius: 5,
					animation: { duration: 1000 }
				}
			]
		};
		chart = new Chart(ctx, {
			type: 'scatter',
			data: data,
			options: {
				// onHover: (e, pts, chart) => console.log(e, pts, chart),
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
	}

	const norm = () => {
		chart.data.datasets[0].data = transformer(scalingData.norm);
		chart.options.scales.x.min = -3;
		chart.options.scales.x.max = 3;
		chart.options.scales.y.min = -3;
		chart.options.scales.y.max = 3;

		chart.options.plugins.annotation.annotations = {
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
	}

	const std = () => {
		chart.data.datasets[0].data = transformer(scalingData.std);
		chart.options.scales.x.min = -3;
		chart.options.scales.x.max = 3;
		chart.options.scales.y.min = -3;
		chart.options.scales.y.max = 3;
		chart.options.plugins.annotation.annotations = {
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
	}

	const robust = () => {
		chart.data.datasets[0].data = transformer(scalingData.robust);
		chart.options.scales.x.min = -3;
		chart.options.scales.x.max = 3;
		chart.options.scales.y.min = -3;
		chart.options.scales.y.max = 3;
		chart.options.plugins.annotation.annotations = {
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
	}
</script>

<button on:click={raw}>raw</button>
<button on:click={norm}>norm</button>
<button on:click={std}>std</button>
<button on:click={robust}>robust</button>

<canvas id="filter" bind:this={canvas} />

<style>
	#filter {
		width: 100%;
		max-height: 600px;
		margin: 0 auto;
	}
</style>
