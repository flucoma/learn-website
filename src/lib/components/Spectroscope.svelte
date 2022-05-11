<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';

	export let height = '280px';
	export let windowSize = 512;
	export let spectrum = new Array(windowSize).fill(0.0);
	const binLabels = new Array(windowSize / 2).fill(null).map((_, i) => i * (44100 / windowSize));
	const smoothing = 100;

	// Canvas
	let canvas, ctx;
	export let chart;

	onMount(async () => {
		if ('ResizeObserver' in window === false) {
			const module = await import('@juggle/resize-observer');
			window.ResizeObserver = module.ResizeObserver;
		}
		// Chart
		Chart.register(...registerables);
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
					legend: { display: false },
					tooltip: {
						enabled: false
					}
				},
				animation: { duration: 0 },
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

	let scale = 1;
	$: if (chart) {
		chart.options.scales.x.type = scale === 0 ? 'linear' : 'logarithmic';
		chart.update();
	}

	$: {
		if (chart) {
			chart.data.datasets[0].data = spectrum;
			chart.update();
		}
	}
</script>

<div class="container" style:height>
	<form>
		<select bind:value={scale} id="scaling" name="spectrogram-scale" placeholder="spectrogram scaling">
			<option value={0}>Linear</option>
			<option value={1}>Logarthmic</option>
		</select>
	</form>
	<canvas style:max-height={height} id="vis" bind:this={canvas} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	#vis {
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
