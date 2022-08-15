<!--
@component
A component that plays back filtered noise, while showing how a curve can be drawn to represent its volume
-->

<script>
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	import Two from 'two.js';

	let container;
	let ampProbe, pitchProbe; // a probe to extract LFO values
	let pitchProbeReading = new Array(90).fill(0.5); // the value the probe reads
	let ampProbeReading = new Array(90).fill(0.5); // the value the probe reads
	let pitchCurve, ampCurve;
	let two;

	onMount(() => {
		two = new Two({
			type: Two.Types.svg,
			autostart: true,
			fitted: true
		}).appendTo(container)
		
		let pitchPoints = pitchProbeReading.map((v, i) => {
			const x = (i / (pitchProbeReading.length)) * two.width; // add equidistant points
			const y = two.height * v;
			return new Two.Anchor(x, y);
		})
		let ampPoints = ampProbeReading.map((v, i) => {
			const x = (i / (ampProbeReading.length)) * two.width; // add equidistant points
			const y = two.height * v;
			return new Two.Anchor(x, y);
		})

		
		pitchCurve = two.makePath(pitchPoints, false, true);
		pitchCurve.linewidth = 5;
		pitchCurve.noFill();
		pitchCurve.stroke = 'rgb(3, 113, 181)';

		ampCurve = two.makePath(ampPoints, false, true);
		ampCurve.linewidth = 5;
		ampCurve.noFill();
		ampCurve.stroke = 'rgb(34, 140, 34)';

		two.add(pitchCurve);
		two.add(ampCurve);
		two.fit();
	})

	const start = async() => {
		await Tone.start();
		
		ampProbe = new Tone.DCMeter()
		pitchProbe = new Tone.DCMeter()
		const mult = new Tone.Multiply().toDestination() // a gain node to modify the volume
		const env = new Tone.LFO(0.3, 0, 1).fan(mult.factor, ampProbe); // an LFO to modulate the sound source
		const src = new Tone.Oscillator(300, 'sine').connect(mult); // a sound source
		const lfo = new Tone.LFO(2, 150, 300).fan(src.frequency, pitchProbe); // an LFO to modulate the sound source

		lfo.start(); env.start(); src.start();

		two.bind('update', () => {
			const pitch = (pitchProbe.getValue() - 150) / 150;
			const amp = ampProbe.getValue();
			pitchProbeReading.push(pitch); pitchProbeReading.shift();
			ampProbeReading.push(amp); ampProbeReading.shift();
			pitchProbeReading.forEach((x, i) => {
				pitchCurve.vertices[i].y = (1-x) * two.height - (two.height * 0.5);
			})
			ampProbeReading.forEach((x, i) => {
				ampCurve.vertices[i].y = (1-x) * two.height - (two.height * 0.5);
			})
		})
	}
</script>

<button on:click={start}>start</button>
<div class="container" bind:this={container}>
</div>

<style>
	.container {
		height: 200px;
		width: 100%;
	}
</style>
