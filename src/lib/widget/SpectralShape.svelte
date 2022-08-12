<script>
	import * as Meyda from 'meyda';
	import { binToHz } from '$lib/util';
	import Audio from '$lib/components/Audio.svelte';

	import Button from '$lib/components/Button.svelte';
	import Spectrogram from './Spectrogram.svelte';

	const windowSize = 512;
	const bufferSize = 512;

	let audio;

	// Visuals
	let chart, audioContext;
	let enabled = false;

	let shape = {
		centroid: 0,
		spread: 0,
		skewness: 0,
		kurtosis: 0,
		rolloff: 0,
		flatness: 0,
		crest: 0
	};

	$: console.log(audio)

	function startAudioDescriptor() {
		enabled = true;
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		audioContext = new AudioContext();
		const source = audioContext.createMediaElementSource(audio);
		source.connect(audioContext.destination);
			
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
				'spectralCrest'
			],
			callback: (...features) => {
				const desc = features[0];
				const spectrum = desc.amplitudeSpectrum;
				chart.data.datasets[0].data = spectrum;
				shape.centroid = binToHz(desc.spectralCentroid, windowSize, 44100);
				shape.spread = desc.spectralSpread;
				shape.skewness = desc.spectralSkewness;
				shape.kurtosis = desc.spectralKurtosis;
				shape.rolloff = desc.spectralRolloff;
				shape.flatness = desc.spectralFlatness;
				shape.crest = desc.spectralCrest;
				chart.update();
			}
		});
		analyser.start();
	}

	$: if (chart) chart.options.plugins.annotation.annotations.centroid.xMin = shape.centroid;
	$: if (chart) chart.options.plugins.annotation.annotations.centroid.xMax = shape.centroid;
	$: if (chart) chart.options.plugins.annotation.annotations.rolloff.xMin = Math.min(shape.rolloff, 20000);
	$: if (chart) chart.options.plugins.annotation.annotations.rolloff.xMax = Math.min(shape.rolloff, 20000);
</script>


<div class="container">
	<div class="start">
		<Button
		on:click={startAudioDescriptor}
		label="Start Audio"
		width="200px"
		height="40px"
		disabled={enabled}
		/>
	</div>
	<div class="frame" class:disabled={!enabled}>
		<div class="plot" >
			<Spectrogram bind:chart />

			<div class="values">
				{#each Object.entries(shape) as [k, v]}
					<div class="descriptor">
						<div class:centroid={k === 'centroid'} class:rolloff={k === 'rolloff'}>{k}:</div>
						<div class:centroid={k === 'centroid'} class:rolloff={k === 'rolloff'}>{v.toFixed(1)}</div>
					</div>
				{/each}
			</div>
		</div>

		<Audio 
		src='/reference/spectralshape/passage.mp3'
		bind:audio
		label='Evolving Sound'
		waveform={true}
		loop={true}
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
