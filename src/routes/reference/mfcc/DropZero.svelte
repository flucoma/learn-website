<script>
	import * as Meyda from 'meyda';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	import { colors } from '$lib/color.js';
	import Audio from '$lib/components/Audio.svelte';
	import Button from '$lib/components/Button.svelte';

	let playing = false;
	let everPlayed = false;
	let audioContext;
	let analyser;
	let audio;
	let canvas;
	let chart;
	let smoothing = 100;
	let feature = new Array(21).fill(0);

	const audioSpec = {
		src: '/audio/drum-m.mp3',
		loop: true,
		waveform: false
	};

	onMount(async () => {
		Chart.register(...registerables);
		const ctx = canvas.getContext('2d');
		let data = {
			labels: feature.slice(0, 20).map((x, i) => `MFCC ${i}`),
			datasets: [
				{
					data: feature,
					backgroundColor: colors.map(x => `rgba(${x[0]}, ${x[1]}, ${x[2]}, 0.5`),
					borderColor: colors.map(x => `rgb(${x[0]}, ${x[1]}, ${x[2]}`),
					borderWidth: 2
				}
			]
		};
		chart = new Chart(ctx, {
			type: 'bar',
			data: data,
			options: {
				animation: {
					duration: smoothing
				},
				events: [],
				plugins: {
					legend: { display: false }
				},
				responsive: true,
				maintainAspectRatio: true,
				scales: {
					x: {
						display: true
					},
					y: {
						display: true,
						min: -50,
						max: 50
					}
				}
			}
		});
	});

	let offset = 0;
	const dropzero = x => {
		offset = x;
		chart.data.labels = new Array(20).fill(0).map((x, i) => `MFCC ${i + offset}`);
		chart.data.datasets[0].borderColor = colors
			.slice(offset, offset + 20)
			.map(x => `rgb(${x[0]}, ${x[1]}, ${x[2]}`);
		chart.data.datasets[0].backgroundColor = colors
			.slice(offset, offset + 20)
			.map(x => `rgba(${x[0]}, ${x[1]}, ${x[2]}, 0.5`);
	};

	const play = () => {
		playing = true;
		if (!everPlayed) {
			everPlayed = true;
			audioContext = new (AudioContext || webkitAudioContext)();
			const source = audioContext.createMediaElementSource(audio);
			source.connect(audioContext.destination);

			analyser = Meyda.createMeydaAnalyzer({
				audioContext: audioContext,
				source: source,
				bufferSize: 512,
				featureExtractors: ['mfcc'],
				numberOfMFCCCoefficients: 21,
				callback: features => {
					feature = features.mfcc;
					chart.data.datasets[0].data = feature.slice(offset, offset + 20);
					console.log(feature.slice(offset, offset + 20));
					chart.update();
				}
			});
			analyser.start();
		}
	};

	const pause = () => {
		playing = false;
		analyser.stop();
	};

	const zero = {
		label: 'startCoeff = 0',
		width: '200px'
	};
	const one = {
		label: 'startCoeff = 1',
		width: '200px'
	};
</script>

<div class="container">
	<canvas id="filter" bind:this={canvas} />
	<div class="controls">
		<Audio {...audioSpec} bind:audio on:play={play} on:pause={pause} />
		<Button {...zero} on:click={() => dropzero(1)} />
		<Button {...one} on:click={() => dropzero(0)} />
	</div>
</div>

<style>
	#filter {
		width: 100%;
		max-height: 300px;
	}

	.controls {
		display: flex;
		gap: 1em;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
</style>
