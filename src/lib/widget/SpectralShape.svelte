<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import * as Meyda from 'meyda';
	import * as Tone from 'tone';
	
	import SourceGenerator from './SourceGenerator.svelte';
import { enableProdMode } from '@tensorflow/tfjs';
	
	const windowSize = 512;
	const bufferSize = windowSize;
	let spectrum = new Array(windowSize).fill(0.0);
	const binLabels = new Array(windowSize/2).fill(null).map((_, i) => i * (44100/windowSize))
	console.log(binLabels)
	
	// Audio
	let audioContext: AudioContext;
	let generator;
	let source;
	let enabled = false;
	
	let shape = {
		'centroid' : 0,
		'spread' : 0,
		'skewness' : 0,
		'kurtosis' : 0,
		'rolloff' : 0,
		'flatness' : 0,
		'crest' : 0
	}
	
	// Canvas
	let canvas: HTMLCanvasElement | null;
	let ctx: RenderingContext;
	let chart: Chart;
	
	// Control
	let smoothing = 150;
	
	onMount(async () => {
		// Chart
		Chart.register(...registerables);
		ctx = canvas.getContext('2d');
		const data = {
			labels: binLabels,
			datasets: [
			{
				data: spectrum,
				borderColor: '#000',
				borderWidth: 0.8,
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
				plugins: {
					legend: { display: false },
					tooltip: {
						enabled: false,
					}
				},
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
				animation: { duration: smoothing },
				scales: {
					x: {
						display: true,
						type: 'logarithmic',
						min: 20,
						max: 20000
					},
					y: {
						display: false,
						type: 'logarithmic',
						min: 0,
						max: 10000,
						
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
		if (!enabled) {
			Tone.start();
			generator.patch("osc"); // activate the sine tone generator
		} else {
			audioContext.close();
		}
		
		// Provide with the Tone.js audio context;
		const analyser = Meyda.createMeydaAnalyzer({
			audioContext: audioContext,
			source: source,
			bufferSize: bufferSize,
			featureExtractors: [
			'amplitudeSpectrum',
			'spectralCentroid',
			'spectralSpread',
			'spectralSkewness',
			'spectralKurtosis',
			'spectralRolloff',
			'spectralFlatness',
			
			],
			callback: (...features) => {
				const desc = features[0];
				spectrum = desc.amplitudeSpectrum;
				shape.centroid = binToHz(desc.spectralCentroid, windowSize, 44100);
				shape.spread = desc.spectralSpread;
				shape.skewness = desc.spectralSkewness;
				shape.kurtosis = desc.spectralKurtosis;
				shape.rolloff = desc.spectralRolloff;
				shape.flatness = desc.spectralFlatness;
				chart.data.datasets[0].data = spectrum;				
				chart.update();
			}
		});
		analyser.start();
	};
</script>

<div class="container">
	<button on:click={startAudioDescriptor}>
		Start Audio
	</button>
	
	<canvas id="vis" bind:this={canvas} />

	<button on:click={
		() => {
			chart.options.scales.x.type='linear'
		}
	}>lin</button>
	
	<button on:click={
		() => {
			chart.options.scales.x.type='logarithmic'
		}
	}>log</button>
	
	{#each Object.entries(shape) as [k, v]}
	<div class="descriptor">
		<div>{ k }: { v.toFixed(1) }</div>
	</div>
	{/each}
	
	
	<SourceGenerator 
	bind:audioContext={audioContext}
	bind:output={source}
	bind:this={generator}
	/>
	
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		margin-top: 1em;
		margin-bottom: 1em;
	}
	
	#vis {
		width: 99% !important;
		min-width: 0 !important;
		max-height: 280px;
		margin: 0 auto;
	}
</style>
