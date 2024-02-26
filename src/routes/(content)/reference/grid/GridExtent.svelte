<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import Button from '$lib/components/Button.svelte';
	import gaussian4 from '$lib/data/datasets/gaussian4.json';
	import extent1 from '$lib/data/reference/grid/extent.2.v.json';
	import extent2 from '$lib/data/reference/grid/extent.5.h.json';
	import extent3 from '$lib/data/reference/grid/extent.10.h.json';

	let canvas, ctx, chart;

	const btnWidth = '180px';
	const btnHeight = '50px';

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
	<h2>Grid Assignment With Extents</h2>
	<canvas bind:this={canvas} id="scatter-plot" />

	<div id="controls">
		<Button
			width={btnWidth}
			height={btnHeight}
			on:click={() => {
				chart.data.datasets[0].data = raw;
				chart.update();
			}}
			label="Original State"
		/>

		<Button
			width={btnWidth}
			height={btnHeight}
			on:click={() => {
				chart.data.datasets[0].data = Object.values(extent1.data).map(x => x);
				chart.update();
			}}
			label="Extent 2 vertical"
		/>

		<Button
			width={btnWidth}
			height={btnHeight}
			on:click={() => {
				chart.data.datasets[0].data = Object.values(extent2.data).map(x => x);
				chart.update();
			}}
			label="Extent 5 horizontal"
		/>

		<Button
			width={btnWidth}
			height={btnHeight}
			on:click={() => {
				chart.data.datasets[0].data = Object.values(extent3.data).map(x => x);
				chart.update();
			}}
			label="Extent 10 horizontal"
		/>
	</div>
</div>

<style>
	#scatter-plot {
		max-height: 400px;
		max-width: 100%;
	}

	#controls {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1em;
		margin-top: 1em;
	}
</style>
