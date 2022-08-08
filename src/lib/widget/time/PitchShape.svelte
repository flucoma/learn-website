<!--
@component
A component that plays back filtered noise, while showing how a curve can be drawn to represent its volume
-->

<script>
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	import Two from 'two.js';

	let container;
	let probe; // a probe to extract LFO values
	let probeReading = new Array(90).fill(0.5); // the value the probe reads
	let two;
	let curve;

	onMount(async() => {
		two = new Two({
			type: Two.Types.svg,
			autostart: true,
			fitted: true
		}).appendTo(container)
		two.fit()
		
		let points = probeReading.map((v, i) => {
			const x = (i / (probeReading.length-1)) * two.width; // add equidistant points
			const y = two.height * v;
			return new Two.Anchor(x, y)
		})
		curve = two.makePath(points, false, true);
		curve.linewidth = 5;
		curve.noFill();
		curve.stroke = 'rgb(3, 113, 181)';
		two.add(curve);
	})

	const start = async() => {
		console.log(two.height)
		await Tone.start();
		// Tone nodes
		probe = new Tone.DCMeter() // extract the value of the lfo
		const src = new Tone.Oscillator(440, 'sine').toDestination(); // a sound source
		const lfo = new Tone.LFO(2, 200, 600).fan(src.frequency, probe); // an LFO to modulate the sound source

		lfo.start(); src.start();

		two.bind('update', () => {
			const val = (probe.getValue() - 200) / 400;
			probeReading.push(val); probeReading.shift();
			probeReading.forEach((x, i) => {
				curve.vertices[i].y = (1-x) * two.height - (two.height * 0.5);
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
