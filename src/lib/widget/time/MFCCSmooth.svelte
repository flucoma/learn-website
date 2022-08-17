<script>
	import * as Meyda from 'meyda';
	import { onMount } from 'svelte';
	import PlayTog from './PlayTog.svelte';

	let playing = false;
	let everPlayed = false;
	let audioContext;

	onMount(async() => {
		audioContext = new (AudioContext || webkitAudioContext)();
		const analyser = Meyda.createMeydaAnalyzer({
			audioContext: audioContext,
			source: source,
			bufferSize: 512,
			featureExtractors: ['mfcc'],
			callback: (features) => {
				console.log(features)
				chart.update();
			}
		});
	})

	const play = () => {
		if (!everPlayed) {
				// Provide with the Tone.js audio context;
			analyser.start();
		}

	}

	const stop = () => {
		
	}
</script>

<PlayTog bind:playing on:play={play} on:stop={stop} />