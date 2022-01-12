<script lang="ts">
	import type { PeaksInstance } from 'peaks.js';
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import * as Meyda from 'meyda';
	import Button from '$lib/components/Button.svelte';

	// Audio
	let player: HTMLAudioElement | null;
	let waveform: HTMLDivElement | null;
	let peaksInstance: PeaksInstance;
	let features: number[] = new Array(12).fill(0.0);
	let ctxStarted: boolean = false;
	// Canvas
	let canvas: HTMLCanvasElement | null;
	let ctx: RenderingContext;
	let chart: Chart;

	// CODE CRIME 👮
	const colours: string[] = [
		'#8dd3c7',
		'#ffffb3',
		'#bebada',
		'#fb8072',
		'#80b1d3',
		'#fdb462',
		'#b3de69',
		'#fccde5',
		'#d9d9d9',
		'#bc80bd',
		'#ccebc5',
		'#ffed6f'
	];

	// Control
	let smoothing: number = 50;

	onMount(async () => {
		// Chart
		Chart.register(...registerables);
		ctx = canvas.getContext('2d');
		const labels = 'A A# B C C# D D# E F F# G G#'.split(' ');
		const data = {
			labels: labels,
			datasets: [
				{
					data: features,
					backgroundColor: colours,
					borderColor: colours,
					borderWidth: 1
				}
			]
		};
		chart = new Chart(ctx, {
			type: 'bar',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				animation: {
					duration: smoothing
				},
				scales: {
					y: {
						display: false
					}
				}
			}
		});

		// Waveform
		const module = await import('peaks.js');
		const Peaks = module.default;
		const options = {
			overview: {
				container: waveform,
				waveformColor: 'rgb(3,113,181'
			},
			mediaElement: player,
			dataUri: { arraybuffer: '/audio/bass-m.dat' },
			mediaUrl: '/audio/bass-m.mp3'
		};

		Peaks.init(options, function (err, peaks) {
			// Do something when the waveform is displayed and ready
			peaksInstance = peaks;
		});
	});

	const updateWaveform = (audioFile) => {
		if (!ctxStarted) {
			const audioContext = new (AudioContext || webkitAudioContext)();
			const source = audioContext.createMediaElementSource(player);
			source.connect(audioContext.destination);
			const analyser = Meyda.createMeydaAnalyzer({
				audioContext: audioContext,
				source: source,
				bufferSize: 4096,
				featureExtractors: ['chroma'],
				callback: (chroma) => {
					features = [...chroma.chroma.slice(9, 12), ...chroma.chroma.slice(0, 9)]; // Start from A with pitch classes
					chart.data.datasets[0].data = features;
					chart.update();
				}
			});
			analyser.start();
			ctxStarted = !ctxStarted;
		}
		player.src = audioFile + '.mp3';
		const options = {
			mediaUrl: audioFile + '.mp3',
			dataUri: { arraybuffer: audioFile + '.dat' }
		};

		peaksInstance.setSource(options, (err) => {
			if (err) console.log(err);
		});

		player.play();
	};
</script>

<div class="container">
	<canvas id="chroma-chart" bind:this={canvas} />

	<div class="controls">
		<div class="sound-select">
			<Button
				label="Bass 🎸"
				on:click={() => {
					updateWaveform('/audio/bass-m');
				}}
			/>

			<Button
				label="Piano 🎹"
				on:click={() => {
					updateWaveform('/audio/piano-m');
				}}
			/>

			<Button
				label="Oboe 🎷"
				on:click={() => {
					updateWaveform('/audio/oboe-m');
				}}
			/>

			<Button
				label="Trombone 🎺"
				on:click={() => {
					updateWaveform('/audio/trombone-m');
				}}
			/>
		</div>

		<div class="waveform" bind:this={waveform} />

		<div class="smoothing">
			<span>Smoothing: {smoothing} frames</span>
			<input
				type="range"
				min="50"
				max="1000"
				bind:value={smoothing}
				on:input={() => (chart.options.animation.duration = smoothing)}
			/>
		</div>

		<audio controls loop class="player" bind:this={player} src="/audio/bass-m.mp3" />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	.waveform {
		width: 100%;
		height: 75px;
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.sound-select {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	.smoothing {
		display: grid;
		place-items: center;
		gap: 0.3em;
	}

	.smoothing > span {
		white-space: nowrap;
	}

	.smoothing > input {
		width: 60%;
	}

	.player {
		margin: 0 auto;
	}

	#chroma-chart {
		width: 99% !important;
		min-width: 0 !important;
		max-height: 200px;
		margin: 0 auto;
	}
</style>
