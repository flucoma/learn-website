<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import * as d3 from 'd3';
	import Button from '$lib/components/Button.svelte';
	import gaussian4 from '$lib/data/datasets/gaussian4.json';
	import oversample1 from '$lib/data/reference/grid/help.grid.oversample.1.json';
	import oversample2 from '$lib/data/reference/grid/help.grid.oversample.2.json';
	import oversample3 from '$lib/data/reference/grid/help.grid.oversample.3.json';
	import oversample4 from '$lib/data/reference/grid/help.grid.oversample.4.json';
	import oversample5 from '$lib/data/reference/grid/help.grid.oversample.5.json';

	let canvas, ctx, chart;

	const btnWidth = '180px';

	const raw = Object.values(gaussian4.data);
	const colours = raw.map(x => d3.interpolateSinebow(x[0] * x[1]));

	onMount(async () => {
		Chart.register(...registerables);
		ctx = canvas.getContext('2d');

		const data = {
			datasets: [
				{
					data: raw,
					backgroundColor: colours,
					pointRadius: 5
				}
			]
		};

		chart = new Chart(ctx, {
			type: 'scatter',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				animation: { duration: 0 },
				scales: {
					x: { display: false },
					y: { display: false }
				}
			}
		});
		chart.options.animation = { duration: 1000 };
	});
</script>

<div class="interactive-example-container">
	<h2>Grid Assignment With Oversampling</h2>
	<canvas bind:this={canvas} id="scatter-plot" />

	<div id="controls">
		<Button
			width={btnWidth}
			on:click={() => {
				chart.data.datasets[0].data = raw;
				chart.update();
			}}
			label="Original State"
		/>

		<Button
			width={btnWidth}
			on:click={() => {
				chart.data.datasets[0].data = Object.values(oversample1.data).map(x => x);
				chart.update();
			}}
			label="No Oversampling (1)"
		/>

		<Button
			width={btnWidth}
			on:click={() => {
				chart.data.datasets[0].data = Object.values(oversample2.data).map(x => x);
				chart.update();
			}}
			label="Oversampling (2)"
		/>

		<Button
			width={btnWidth}
			on:click={() => {
				chart.data.datasets[0].data = Object.values(oversample3.data).map(x => x);
				chart.update();
			}}
			label="Oversampling (3)"
		/>

		<Button
			width={btnWidth}
			on:click={() => {
				chart.data.datasets[0].data = Object.values(oversample4.data).map(x => x);
				chart.update();
			}}
			label="Oversampling (4)"
		/>

		<Button
			width={btnWidth}
			on:click={() => {
				chart.data.datasets[0].data = Object.values(oversample5.data).map(x => x);
				chart.update();
			}}
			label="Oversampling (25)"
		/>
	</div>
</div>

<style>
	.container {
		margin-bottom: 1em;
	}
	#scatter-plot {
		max-height: 400px;
		max-width: 100%;
	}

	#controls {
		display: grid;
		grid-template-columns: auto auto auto;
		justify-content: center;
		gap: 1em;
		margin-top: 1em;
	}
</style>
