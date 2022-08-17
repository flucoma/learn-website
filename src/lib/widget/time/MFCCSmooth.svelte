<script>
	import * as Meyda from 'meyda';
	import { onMount } from 'svelte';
	import PlayTog from './PlayTog.svelte';
	import Audio from '$lib/components/Audio.svelte';
	
	let playing = false;
	let everPlayed = false;
	let audioContext;
	let analyser;
	let audio;

	const audioSpec = {
		src: '/audio/oboe-m.mp3',  
		loop: true,
		waveform: true 
	}
	
	onMount(async() => {
		
	})
	
	const play = () => {
		if (!everPlayed) {
			everPlayed = false;
			audioContext = new (AudioContext || webkitAudioContext)();
			const source = audioContext.createMediaElementSource(audio);
			source.connect(audioContext.destination);
			
			analyser = Meyda.createMeydaAnalyzer({
				audioContext: audioContext,
				source: source,
				bufferSize: 512,
				featureExtractors: ['mfcc'],
				callback: (features) => {
					console.log(features)
				}
			});
			analyser.start();
		}
		
	}
	
	const pause = () => {
		
	}
</script>

<Audio {...audioSpec} bind:audio
	on:play={play}
	on:pause={pause}
/>