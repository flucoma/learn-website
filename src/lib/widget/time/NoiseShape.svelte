<!--
@component
A component that plays back filtered noise, while showing how a curve can be drawn to represent its volume
-->

<script>
	import { onMount } from 'svelte';
	import * as Tone from 'tone';

	let src; // a sound source
	let lfo; // an LFO to modulate the sound source
	let probe; // extract the value of the lfo
	let gain;
	let probeReading = 0; // the value the probe reads

	onMount(async() => {
	})

	const start = async() => {
		await Tone.start();
		src = new Tone.Noise('pink').toDestination().start();
		lfo = new Tone.LFO(1, 0, 1);
		probe = new Tone.Meter(0);
		
	}
</script>

<button on:click={start}>start</button>