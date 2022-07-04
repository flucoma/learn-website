<script>
	import * as Meyda from 'meyda';
	import * as Tone from 'tone';
	import { binToHz } from '$lib/utils';

	import Button from '$lib/components/Button.svelte';
	import SourceGenerator from './SourceGenerator.svelte';
	import Spectrogram from './Spectrogram.svelte';

	const windowSize = 512;
	const bufferSize = windowSize;

	// Visuals
	let chart, audioContext, generator, source;
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

	function startAudioDescriptor() {
		if (!enabled) {
			Tone.start();
			generator.patch('osc'); // activate the sine tone generator
			enabled = true;
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
				'spectralFlatness'
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
	<Button
		on:click={startAudioDescriptor}
		label="Start Audio"
		width="max-content"
		height="max-content"
		disabled={enabled}
	/>

	<Spectrogram bind:chart />

	<div class="controllers">
		<SourceGenerator bind:audioContext bind:output={source} bind:this={generator} />

		<div class="values">
			{#each Object.entries(shape) as [k, v]}
				<div class="descriptor">
					<div class:centroid={k === 'centroid'} class:rolloff={k === 'rolloff'}>{k}:</div>
					<div class:centroid={k === 'centroid'} class:rolloff={k === 'rolloff'}>{v.toFixed(1)}</div>
				</div>
			{/each}
		</div>
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
		border: 0.063rem solid #dcdee0;
		border-radius: 0.25em;
		padding: 0.5em;
		gap: 0.25em;
	}

	.controllers {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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
