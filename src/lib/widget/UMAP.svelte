<script lang="ts">
	import { UMAP } from 'umap-js';
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import type { Vectors } from 'umap-js/dist/umap';
	import Slider from '$lib/components/Slider.svelte';
	import Button from '$lib/components/Button.svelte';
	import * as d3 from 'd3';

	// Chart.js
	let canvas, chart: Chart, ctx;

	// A timer to simulate the animation
	let timeout: number; // setInterval() returns an ID which is a number

	let stepInterval: number = 5;
	let smoothing: number = 230;

	// UMAP params
	let neighbors: number = 10;
	let minDist: number = 0.3;
	let epochs: number = 500;
	let transform: Vectors;

	// UMAP Data
	let epoch: number = 0;
	let numEpochs: number = 0;
	let originalData: Array<Array<number>> = [];
	let umap: UMAP;

	const newData = () => {
		epoch = 0;
		clearTimeout(timeout);
		originalData = new Array(150).fill(new Array(3).fill(0));
		originalData = originalData.map((x) => x.map(() => Math.random()));
		umap = new UMAP({
			nComponents: 2,
			nEpochs: epochs,
			minDist: minDist,
			nNeighbors: neighbors,
			spread: 1.0
		});

		numEpochs = umap.initializeFit(originalData);
	};

	const getMinMax = (arr) => {
		let min = Infinity;
		let max = -Infinity;
		arr.forEach((x) => {
			let vecMin = d3.min(x);
			let vecMax = d3.max(x);
			min = vecMin < min ? vecMin : min;
			max = vecMax > max ? vecMax : max;
		});
		return { min: min, max: max };
	};

	const step = () => {
		epoch++;
		umap.step();
		let embedding = umap.getEmbedding();
		let bounds = getMinMax(embedding);
		let norm = d3.scaleLinear().domain([bounds.min, bounds.max]).range([0, 1]);
		transform = embedding.map((row) => row.map((col) => norm(col)));
		// Stopping condition
		if (epoch > numEpochs) {
			stopInterval();
			epoch = 0;
		}
		// Update Chart
		if (chart) {
			updateChart();
		}
	};

	const doStep = () => {
		epoch = 0;
		clearInterval(timeout);
		umap = new UMAP({
			nComponents: 2,
			nEpochs: epochs,
			minDist: minDist,
			nNeighbors: neighbors,
			spread: 1.0
		});
		numEpochs = umap.initializeFit(originalData);
		startInterval();
	};

	const startInterval = () => {
		timeout = setInterval(step, stepInterval);
	};

	const stopInterval = () => {
		clearInterval(timeout);
	};

	const getPositions = (d) => {
		return d.map((pt) => {
			return { x: pt[0], y: pt[1] };
		});
	};

	const getColours = (d) => {
		let colours = [];
		d.forEach((pt) => {
			let rgb = pt.map((x) => x * 255); // Scale all points from 0..1 to 0..255;
			let r = rgb[0];
			let g = rgb[1];
			let b = rgb[2];
			let css = `rgb(${r}, ${g}, ${b}`;
			colours.push(css);
		});
		return colours;
	};

	const updateChart = () => {
		chart.data.datasets[0].data = getPositions(transform);
		chart.data.datasets[0].backgroundColor = getColours(originalData);
		chart.update();
	};

	onMount(async () => {
		newData();
		// Do an initial reduction from the random data to 2 dimensions
		step();
		Chart.register(...registerables);
		ctx = canvas.getContext('2d');
		const points = {
			datasets: [
				{
					data: getPositions(transform),
					backgroundColor: getColours(originalData)
				}
			]
		};
		chart = new Chart(ctx, {
			type: 'scatter',
			data: points,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				animation: { duration: smoothing },
				scales: {
					y: { display: false },
					x: { display: false }
				}
			}
		});
		updateChart();
	});
</script>

<div class="container">
	<canvas class="plot" bind:this={canvas} />
	<span>Iteration: {epoch}</span>
	<div class="controls">
		<div class="parameters">
			<Slider bind:value={epochs} title="Iterations" min="50" max="2000" step="1" chFunc={doStep} />
			<Slider
				bind:value={minDist}
				title="Minimum Distance"
				min="0.0"
				max="1"
				step="0.001"
				chFunc={doStep}
			/>
			<Slider
				bind:value={neighbors}
				title="Number of Neighbours"
				min="3"
				max="99"
				step="1"
				chFunc={doStep}
			/>
		</div>
		<div class="btns">
			<Button on:click={doStep} label="Go" />

			<Button
				on:click={() => {
					newData();
					step();
					updateChart();
				}}
				label="Reset"
			/>
		</div>
	</div>
</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 2em;
	}

	.plot {
		max-height: 400px;
		max-width: 100%;
		border: 1px solid rgb(232, 232, 232);
	}

	.controls {
		display: flex;
		flex-direction: row;
		justify-content: left;
		gap: 1em;
	}

	.btns {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.parameters {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
