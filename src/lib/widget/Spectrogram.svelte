<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import annotationPlugin from 'chartjs-plugin-annotation';

	export let windowSize = 512;
	export let spectrum = new Array(windowSize).fill(0.0);
	const binLabels = new Array(windowSize / 2).fill(null).map((_, i) => i * (44100 / windowSize));
	const smoothing = 100;

	// Canvas
	export let chart;
	let canvas, ctx;

	onMount(async () => {
		// Chart
		Chart.register(...registerables, annotationPlugin);
		ctx = canvas.getContext('2d');
		const data = {
			labels: binLabels,
			datasets: [
				{
					data: spectrum,
					borderColor: 'black',
					borderWidth: 0.8,
					cubicInterpolationMode: 'monotone',
					tension: 0.1,
					pointRadius: 0,
					animation: { duration: smoothing }
				}
			]
		};
		chart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				plugins: {
					annotation: {
						annotations: {
							centroid: {
								type: 'line',
								yMin: 0,
								yMax: 10000,
								xMin: 600,
								xMax: 600,
								borderColor: 'rgba(256,0,0,0.75)'
							},
							rolloff: {
								type: 'line',
								yMin: 0,
								yMax: 10000,
								xMin: 0,
								xMax: 0,
								borderColor: 'rgba(0,0,256,0.75)'
							}
						}
					},
					legend: { display: false },
					tooltip: {
						enabled: false
					}
				},
				animation: { duration: 200 },
				datasets: {
					line: {
						pointRadius: 0
					}
				},
				elements: {
					point: {
						radius: 0
					}
				},
				normalized: true,
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						ticks: {
							autoSkip: true,
							callback: value => {
								if (value > 1000) {
									return value / 1000 + ' kHz';
								} else {
									return value + ' Hz';
								}
							},
							minRotation: 90,
							maxRotation: 90,
							autoSkip: true,
							autoSkipPadding: 14
						},
						display: true,
						type: 'logarithmic',
						min: 20,
						max: 20000
					},
					y: {
						display: false,
						type: 'logarithmic',
						min: 0,
						max: 10000
					}
				}
			}
		});
	});

	export let scale = 1;
	$: if (chart) chart.options.scales.x.type = scale === 0 ? 'linear' : 'logarithmic';
</script>

<div class="container">
	<form>
		<select bind:value={scale} id="scaling" name="spectrogram-scale" placeholder="spectrogram scaling">
			<option value={0}>Linear</option>
			<option value={1}>Logarthmic</option>
		</select>
	</form>
	<canvas id="vis" bind:this={canvas} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	#vis {
		/* min-width: 0 !important; */
		width: 100%;
		max-height: 280px;
	}

	form {
		position: absolute;
		display: flex;
		flex-direction: row;
		place-items: center;
	}

	#scaling {
		width: max-content;
	}
</style>
