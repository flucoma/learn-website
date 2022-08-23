<script>
	import { fromArrayBuffer } from 'numpy-parser';
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';

	const db = '/reference/loudness/db.npy';
	const freq = '/reference/loudness/filter.npy';

	let y = [];
	let x = [];
	let chart, canvas;
	$: {
		if (chart) {
			chart.data.datasets[0].data = y;
			chart.data.labels = x;
			chart.update();
		}
	}

	onMount(async () => {
		fetch(db)
			.then(response => response.arrayBuffer())
			.then(arr => {
				y = fromArrayBuffer(arr).data;
			});

		fetch(freq)
			.then(response => response.arrayBuffer())
			.then(arr => {
				x = fromArrayBuffer(arr).data;
			});

		// Chart
		Chart.register(...registerables);
		const ctx = canvas.getContext('2d');
		let data = {
			labels: null,
			datasets: [
				{
					data: x,
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
						min: 0,
						max: 24000
					},
					y: {
						ticks: {
							callback: value => {
								return value + 'dB';
							}
						},
						display: true,
						type: 'linear',
						min: -20,
						max: 5
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
