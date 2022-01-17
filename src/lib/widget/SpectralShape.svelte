<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import * as Meyda from 'meyda';
	import * as Tone from 'tone';
	
	import SourceGenerator from './SourceGenerator.svelte';
	
	const windowSize = 1024;
	const bufferSize = windowSize;
	
	// Audio
	let features: number[] = new Array(windowSize).fill(0.0);
	let audioContext: AudioContext;
	let generator;
	let audioEnabled: boolean = false;
	
	// Canvas
	let canvas: HTMLCanvasElement | null;
	let ctx: RenderingContext;
	let chart: Chart;
	
	let spectrum: number[] = [];
	let source;
	
	// Control
	let smoothing: number = 50;
	
	onMount(async () => {
		// Chart
		Chart.register(...registerables);
		ctx = canvas.getContext('2d');
		const data = {
			labels: features.map((x, i) => i * (44100 / windowSize)),
			datasets: [
			{
				data: features,
				backgroundColor: '#000',
				borderColor: '#000',
				borderWidth: 1,
				cubicInterpolationMode: 'monotone',
				tension: 0.1,
				pointRadius: 0,
			}
			]
		};
		chart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				animation: {
					duration: smoothing
				},
				scales: {
					x: {
						display: true,
						type: 'logarithmic',
					},
					y: {
						display: false,
						type: 'logarithmic',
						min: 0,
						max: 200000
					}
				}
			}
		});
	});
	
	function binToHz(bin, windowSize, sampleRate) {
		const binWidth = sampleRate / windowSize;
		return bin * binWidth;
	}
	
	function startAudioDescriptor() {
		Tone.start();
		// Provide with the Tone.js audio context;
		const analyser = Meyda.createMeydaAnalyzer({
			audioContext: audioContext,
			source: generator,
			bufferSize: bufferSize,
			featureExtractors: [
			'amplitudeSpectrum',
			],
			callback: (...feature) => {
				features = feature[0].amplitudeSpectrum.map(f => f*100)
				chart.data.datasets[0].data = features;
				chart.update();
				// console.log(
				//     binToHz(
				//         feature[1].spectralCentroid,
				//         bufferSize,
				//         44100
				//     )
				// )
			}
		});
		analyser.start();
	};
</script>

<div class="container">
	<button on:click={startAudioDescriptor}>Enable Audio</button>
	
	<canvas id="vis" bind:this={canvas} />
	
	<SourceGenerator 
	bind:audioContext={audioContext}
	bind:output={generator}
	/>
	
	<div class="controls">		
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
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		margin-top: 1em;
		margin-bottom: 1em;
	}
	
	.controls {
		display: flex;
		flex-direction: column;
		gap: 1em;
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
	
	#vis {
		width: 99% !important;
		min-width: 0 !important;
		max-height: 280px;
		margin: 0 auto;
	}
</style>
