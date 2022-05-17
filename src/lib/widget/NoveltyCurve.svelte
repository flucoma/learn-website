<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import annotationPlugin from 'chartjs-plugin-annotation';
	import data from '../../../static/ref/noveltyslice/curve.json';
	const curve = data.curve;
	const peaks = data.peaks;
	let peaks_annotation = {};

	peaks.forEach((x, i) => {
		peaks_annotation['line' + String(i)] = {
			type: 'line',
			yMin: 0,
			yMax: Math.max(...curve),
			xMin: x,
			xMax: x,
			borderColor: 'rgba(255, 0, 0, 0.5)'
		};
	});

	let chart, ctx, canvas;

	onMount(async () => {
		if ('ResizeObserver' in window === false) {
			const module = await import('@juggle/resize-observer');
			window.ResizeObserver = module.ResizeObserver;
		}
		// Chart
		Chart.register(...registerables, annotationPlugin);
		ctx = canvas.getContext('2d');
		const data = {
			labels: curve.map((x, i) => i),
			datasets: [
				{
					data: curve,
					borderColor: 'black',
					borderWidth: 1,
					cubicInterpolationMode: 'monotone',
					tension: 1,
					pointRadius: 0,
					animation: { duration: 100 }
				}
			]
		};
		chart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				plugins: {
					legend: { display: false },
					tooltip: { enabled: false },
					annotation: {
						annotations: peaks_annotation
					}
				},
				animation: { duration: 1000 },
				datasets: {
					line: { pointRadius: 3 }
				},
				normalized: true,
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						display: true,
						min: 0,
						max: curve.length
					},
					y: {
						display: true,
						min: 0,
						max: Math.max(...curve)
					}
				}
			}
		});
	});
</script>

<div class="container">
	<div class="title">Novelty Curve computed with a 41 size kernel</div>
	<canvas bind:this={canvas} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		place-items: center;
		gap: 1em;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	.title {
		font-style: italic;
	}
	canvas {
		width: 100%;
		max-height: 280px;
	}
</style>
