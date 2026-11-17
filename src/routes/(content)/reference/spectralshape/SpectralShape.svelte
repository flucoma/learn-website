<script>
	import { onDestroy } from 'svelte';
	import * as Meyda from 'meyda';
	import { binToHz, clip } from '$lib/util';
	import Audio from '$lib/components/Audio.svelte';
	import Button from '$lib/components/Button.svelte';
	import Spectrogram from './Spectrogram.svelte';

	const bufferSize = 512;
	const DISPLAY_INTERVAL = 100; // ms

	let audio;

	// Visuals
	let chart, audioContext, meydaAnalyzer;
	let enabled = false;
	let isPlaying = false;
	let error = '';

	let shape = {
		centroid: 10000,
		spread: 0,
		skewness: 0,
		kurtosis: 0,
		rolloff: 0,
		flatness: 0,
		crest: 0
	};

	let displayShape = { ...shape };
	let lastDisplayUpdate = 0;

	function startAudioDescriptor() {
		try {
			const AudioContext = window.AudioContext || window.webkitAudioContext;
			audioContext = new AudioContext();
			audioContext.resume();
			const source = audioContext.createMediaElementSource(audio);
			source.connect(audioContext.destination);

			meydaAnalyzer = Meyda.createMeydaAnalyzer({
				audioContext,
				source,
				bufferSize,
				featureExtractors: [
					'amplitudeSpectrum',
					'spectralCentroid',
					'spectralSpread',
					'spectralSkewness',
					'spectralKurtosis',
					'spectralRolloff',
					'spectralFlatness',
					'spectralCrest'
				],
				callback: (features) => {
					chart.data.datasets[0].data = features.amplitudeSpectrum;
					shape.centroid = binToHz(features.spectralCentroid, bufferSize, audioContext.sampleRate);
					shape.spread = features.spectralSpread;
					shape.skewness = features.spectralSkewness;
					shape.kurtosis = features.spectralKurtosis;
					shape.rolloff = features.spectralRolloff;
					shape.flatness = features.spectralFlatness;
					shape.crest = features.spectralCrest;

					const now = performance.now();
					if (now - lastDisplayUpdate >= DISPLAY_INTERVAL) {
						lastDisplayUpdate = now;
						displayShape = { ...shape };
						chart.update();
					}
				}
			});
			meydaAnalyzer.start();
			enabled = true;
		} catch (e) {
			error = 'Failed to start audio analysis. Please try again.';
			console.error('Audio analysis error:', e);
		}
	}

	function onPlay() {
		isPlaying = true;
	}

	function onPause() {
		isPlaying = false;
	}

	$: if (chart) {
		const ann = chart.options.plugins.annotation.annotations;
		ann.centroid.display = isPlaying;
		ann.rolloff.display = isPlaying;
		if (isPlaying) {
			ann.centroid.xMin = clip(shape.centroid, 0, 20000);
			ann.centroid.xMax = clip(shape.centroid, 0, 20000);
			ann.rolloff.xMin = Math.min(shape.rolloff, 20000);
			ann.rolloff.xMax = Math.min(shape.rolloff, 20000);
		}
	}

	onDestroy(() => {
		if (meydaAnalyzer) meydaAnalyzer.stop();
		if (audioContext) audioContext.close();
	});
</script>

<div class="container">
	<div class="start">
		<Button variant="secondary" on:click={startAudioDescriptor} label="Start Audio" width="200px" height="40px" disabled={enabled} />
		{#if error}
			<div class="error">{error}</div>
		{/if}
	</div>
	<div class="frame" class:disabled={!enabled}>
		<div class="plot">
			<Spectrogram bind:chart smoothing="200" />

			<div class="values">
				{#each Object.entries(displayShape) as [k, v]}
					<div class="descriptor">
						<div class:centroid={k === 'centroid'} class:rolloff={k === 'rolloff'}>{k}:</div>
						<div class:centroid={k === 'centroid'} class:rolloff={k === 'rolloff'}>{isPlaying ? v.toFixed(1) : '—'}</div>
					</div>
				{/each}
			</div>
		</div>

		<Audio
			src="/reference/spectralshape/passage.mp3"
			bind:audio
			label="Evolving Sound"
			waveform={true}
			loop={true}
			on:play={onPlay}
			on:pause={onPause}
		/>
	</div>
</div>

<style>
	.centroid {
		color: red;
	}
	.rolloff {
		color: blue;
	}
	.error {
		color: var(--color-error, #c00);
		font-size: 0.875rem;
		margin-top: 0.5em;
	}
	.container {
		display: flex;
		flex-direction: column;
		margin-top: 1em;
		margin-bottom: 1em;
		gap: 2em;
	}

	.start {
		display: grid;
		place-items: center;
	}

	.plot {
		display: grid;
		grid-template-columns: auto max-content;
		gap: 0.5em;
	}

	.disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.values {
		font-size: 0.75rem;
		display: flex;
		flex-direction: column;
	}

	.descriptor {
		display: grid;
		grid-template-columns: 75px 8ch;
	}
</style>
