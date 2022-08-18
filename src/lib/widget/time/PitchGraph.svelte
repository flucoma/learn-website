<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import analysis from '$lib/data/learn/refining-pitch-analysis/pitch.json';

	const pitch = analysis.data.pitch;
	const confidence = analysis.data.confidence;

	let chart, canvas;

	onMount(async () => {
		Chart.register(...registerables);
		const ctx = canvas.getContext('2d');
		let data = {
			labels: pitch.map((x, i) => i),
			datasets: [
				{
					label: 'Pitch',
					data: pitch,
					borderColor: 'rgb(3, 113, 181)',
					backgroundColor: 'rgba(3, 113, 181, 0.05)',
					borderWidth: 1,
					fill: 'start',
					tension: 0,
					animation: { duration: 250 },
					yAxisID: 'pitchy'
				},
				{
					label: 'Confidence',
					data: confidence,
					borderColor: 'rgb(255, 99, 130)',
					backgroundColor: 'rgba(255, 99, 130, 0.05)',
					borderWidth: 1,
					fill: 'start',
					tension: 0,
					animation: { duration: 250 },
					yAxisID: 'confidencey'
				},

			]
		};
		chart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				stacked: false,
				plugins: {
					title: {
						display: true,
						text: 'Pitch and Pitch Confidence Analysis with FluidPitch'
					}
				},
				datasets: {
					line: {
						pointRadius: 0
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
							text: 'Spectral Frame'
						}
					},
					pitchy: {
						type: 'linear',
						display: true,
						position: 'left',
						title: {
							display: true,
							text: 'Pitch (Hz)'
						},
						ticks: {
							callback: (x) => `${x / 1000.0} KHz`
						}
					},
					confidencey: {
						type: 'linear',
						display: true,
						position: 'right',
						title: {
							display: true,
							text: 'Confidence',
						},
						grid: {
							drawOnChartArea: false	
						}
					}
				}
			}
		});
	});
</script>

<canvas id="filter" bind:this={canvas} />
<style>
#filter {
	width: 100%;
	max-height: 400px;
	margin: 0 auto;
}
</style>
