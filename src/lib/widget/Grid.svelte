<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import * as d3 from 'd3';
	import Button from '$lib/components/Button.svelte';
	import gaussian4 from '../../../static/data/gaussian4.json';
	import out from '../../../static/ref/grid/out.json';

	let canvas: HTMLCanvasElement;
	let ctx: RenderingContext;
	let chart: Chart;

	const raw = Object.values(gaussian4.data).map(x => x);
	const grid = Object.values(out.data).map(x => x);
	const colours = raw.map(x => d3.interpolateSinebow(x[0] * x[1]));

	onMount(async () => {
		Chart.register(...registerables);
		ctx = canvas.getContext('2d');

		const data = {
			datasets: [
				{
					data: raw,
					backgroundColor: colours,
					pointRadius: 6
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

<div class="container">
	<canvas bind:this={canvas} id="scatter-plot" />

	<div id="controls">
		<Button
			width={'max-content'}
			on:click={() => {
				chart.data.datasets[0].data = grid;
				chart.update();
			}}
			label="Assign to Grid"
		/>

		<Button
			width={'max-content'}
			on:click={() => {
				chart.data.datasets[0].data = raw;
				chart.update();
			}}
			label="Original State"
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
		border: 1px solid rgb(232, 232, 232);
		border-radius: 0.25em;
	}

	#controls {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: center;
		gap: 1em;
		margin-top: 1em;
	}
</style>
