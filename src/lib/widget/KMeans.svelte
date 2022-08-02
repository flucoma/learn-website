<script>
	import { interpolateSinebow } from 'd3';
	import { tensor } from '@tensorflow/tfjs';
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import Button from '$lib/components/Button.svelte';
	import KMeans from '@flucoma/tf-kmeans';
	import Select from 'svelte-select';
	import datasets from '$lib/data/datasets/datasets.json';

	// Configure some options for KMeans
	let numClusters = 4;

	// Set aside some variables to do with the kmeans centroids
	let predictions = [];
	let centroids = [];
	let iteration = 0;

	// Chart.js
	let ctx, canvas, chart;

	let kmeans, 
		doMeans, // A function that the button gets bound to. We won't define it yet because of awaits
		trainDisabled = false;

	// Declare some vars to use after mounting

	const items = [
		{ value: 'gaussian', label: 'Four Gaussian Clusters (Large)' },
		{ value: 'gaussianSmall', label: 'Four Gaussian Clusters (Small)' },
		{ value: 'gaussianTiny', label: 'Four Gaussian Clusters (Tiny)' },
		{ value: 'line', label: 'Synthetic Line (Large)' },
		{ value: 'lineTiny', label: 'Synthetic Line (Tiny)' },
		{ value: 'moon', label: 'Moons (Small)' },
		{ value: 'blobs', label: 'Blobs (Small)' },
		{ value: 'circles', label: 'Circles (Small)' },
		{ value: 'random', label: 'Random (Small)' }
	];

	let dataLookup = {
		gaussian: datasets.gaussian4,
		gaussianTiny: datasets.gaussian4tiny,
		gaussianSmall: datasets.gaussian4small,
		line: datasets.curvy,
		lineTiny: datasets.lineTiny,
		moon: datasets.moon,
		blobs: datasets.blobs,
		circles: datasets.circles,
		random: datasets.random
	};

	let data = Object.values(dataLookup.gaussian.data);

	const formatForChart = d => {
		// Marshalls data into a chart.js friendly format
		return d.map(datum => {
			return { x: datum[0], y: datum[1] };
		});
	};

	onMount(async () => {
		Chart.register(...registerables);
		ctx = canvas.getContext('2d');

		const chartData = {
			datasets: [
				{
					data: formatForChart(data),
					backgroundColor: '#000',
					borderColor: '#000',
					borderWidth: 1,
					pointRadius: 3
				}
			]
		};
		chart = new Chart(ctx, {
			type: 'scatter',
			data: chartData,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				animation: {
					duration: 750
				},
				scales: {
					x: { display: false },
					y: { display: false }
				}
			}
		});
	});

	const sleep = milliseconds => {
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	};

	doMeans = async () => {
		trainDisabled = true;
		let predictionsPath = [];
		let centroidsPath = [];
		let coloursPath = [];
		let radPath = [];
		const tfData = tensor(data);
		// Create an instance of the kmeans model
		kmeans = new KMeans({
			k: numClusters,
			maxIter: 40
		});

		await kmeans.TrainAsync(tfData, async (i, cent, pred) => {
			predictions = await pred.array();
			centroids = await cent.array();

			centroidsPath.push(centroids);

			// Append centroids to the dataset
			let d = JSON.parse(JSON.stringify(data));
			d.push(...centroids);
			predictionsPath.push(d);

			// Compute all the colours
			let colours = predictions.map(p => interpolateSinebow(p / centroids.length));
			let centroidColours = centroids.map((_, i) => interpolateSinebow(i / centroids.length));
			colours.push(...centroidColours);
			coloursPath.push(colours);
			// Now calculate all the point radii
			// The last k points shold be the centroids so they need to be larger and in charger
			let rad = d.map((p, i) => (i + 1 <= predictions.length ? 3 : 10));
			radPath.push(rad);
		});

		for (let i = 0; i < predictionsPath.length; i++) {
			iteration = i + 1;
			chart.data.datasets[0].data = formatForChart(predictionsPath[i]);
			chart.data.datasets[0].pointBackgroundColor = coloursPath[i];
			chart.data.datasets[0].pointBorderColor = coloursPath[i];
			chart.data.datasets[0].pointRadius = radPath[i];
			chart.update();
			await sleep(1000);
		}
		trainDisabled = false;
	};

	const updateData = e => {
		kmeans = null;
		iteration = 0;
		predictions = null;
		centroids = null;

		const selection = e.detail.value;

		data = Object.values(dataLookup[selection].data);

		chart.data.datasets[0].pointBackgroundColor = ['#000'];
		chart.data.datasets[0].pointBorderColor = ['#000'];
		chart.data.datasets[0].pointRadius = 3;
		chart.data.datasets[0].data = formatForChart(data);
		chart.update();
	};
</script>

<div class="container">
	<Button on:click={doMeans} label="Calculate Means" width="100%" disabled={trainDisabled} />

	<div class="controls">
		<Select {items} on:select={updateData} placeholder="Select a dataset..." showChevron={true} />

		<div class="cluster">
			<div class="select">
				<div>Number of Clusters</div>
				<input placeholder="Number of Clusters" type="number" bind:value={numClusters} min="1" max="49" />
			</div>

			<div>Iteration Number: {iteration}</div>
		</div>
	</div>

	<canvas id="sketch" bind:this={canvas} />
</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.controls {
		display: grid;
		grid-template-rows: auto auto;
		gap: 1em;
	}

	.cluster {
		display: flex;
		flex-direction: row;
		place-items: center;
		justify-content: space-between;
	}

	.select {
		display: flex;
		flex-direction: row;
		place-items: center;
		gap: 0.5em;
	}

	input {
		padding: 0.3em;
		font-size: 1rem;
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
	#sketch {
		width: 100%;
		min-width: 0 !important;
		max-height: 400px;
	}
</style>
