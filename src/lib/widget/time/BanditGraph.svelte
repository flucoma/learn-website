<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import annotationPlugin from 'chartjs-plugin-annotation';
	import analysis from '$lib/data/learn/refining-pitch-analysis/normpitch.json';

	let chart, canvas;

	const pitchData = Object.values(analysis.data).map(x => ({x: x[0], y: x[1]}));

	onMount(async() => {
		Chart.register(...registerables);
		const ctx = canvas.getContext('2d');
		const data = {
			labels: pitchData.map((x, i) => i),
			datasets: [{
				data: pitchData,
				borderColor: 'rgb(3, 113, 181)',
				backgroundColor: 'rgba(3, 113, 181, 1)',
				borderWidth: 1,
				fill: 'start',
				tension: 0,
				animation: { duration: 2000 },
			}]
		};
		chart = new Chart(ctx, {
			type: 'scatter',
			data: data,
			options: {
				plugins: {
					annotation: {
						annotations: {
							box1: {
								type: 'box',
								xMin: 0.25,
								xMax: 0.75,
								yMin: 0.25,
								yMax: 0.75,
								backgroundColor: 'rgba(122, 120, 117, 0.05)'
							}
						}
					},
					legend: {display: false},
					title: {
						display: true,
						text: 'Pitch and Confidence'
					}
				},
				normalized: true,
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						type: 'linear',
						display: true,
						title: {
							display: true,
							text: 'Pitch'
						},
					},
					y: {
						type: 'linear',
						display: true,
						title: {
							display: true,
							text: 'Confidence',
						},
					}
				}
			}
		});
	});

	export const setymin = (x) => {
		chart.options.scales.y.min = x;
		chart.update();
	}
</script>

<canvas id="filter" bind:this={canvas} />

<style>
	#filter {
		width: 200%;
		max-height: 400px;
		margin: 0 auto;
	}
</style>
