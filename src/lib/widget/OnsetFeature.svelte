<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import feature from '$lib/data/reference/onsetfeature/data.json'

	let chart, canvas;

	onMount(async () => {
		Chart.register(...registerables);
		const ctx = canvas.getContext('2d');
		let data = {
			labels: feature.data.map((x, i) => i),
			datasets: [
				{
					data: feature.data,
					borderColor: 'black',
					borderWidth: 0.8,
					tension: 1,
					pointRadius: 0,
					animation: { duration: 0 }
				}
			]
		};
		chart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				events: [],
				plugins: {
					legend: { display: false },
					tooltip: {
						enabled: false
					}
				},
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
						display: false,
					},
					y: {
						display: true,
						title: {
							display: true,
							text: 'Spectral Difference'
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
		max-height: 300px;
		margin: 0 auto;
	}
</style>
