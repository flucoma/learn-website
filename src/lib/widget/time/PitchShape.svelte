<!--
@component
A component that plays back filtered noise, while showing how a curve can be drawn to represent its volume
-->

<script>
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	import * as Paper from 'paper'
	import PlayTog from '$lib/widget/time/PlayTog.svelte';

	let canvas; // canvas for the chart
	let probe; // a probe to extract LFO values
	let probeReading = new Array(200).fill(0.5); // the value the probe reads
	let path; // a line to draw

	const pushPoints = (path) => {
		probeReading.forEach((v, i) => {
			const x = (canvas.width / probeReading.length) * i; // add equidistant points
			const y = canvas.height * v;
			const pt = new Paper.Point(x, y);
			path.add(pt)
		});
	}

	onMount(async() => {
		Paper.setup(canvas);
		path = new Paper.Path();
		path.strokeColor = 'rgb(3, 113, 181)';
		path.strokeWidth = 5;
		pushPoints(path);
	})

	const start = async() => {
		// Tone nodes
		probe = new Tone.DCMeter() // extract the value of the lfo
		const src = new Tone.Oscillator(440, 'sine').toDestination(); // a sound source
		const lfo = new Tone.LFO(6, 200, 600).fan(src.frequency, probe); // an LFO to modulate the sound source

		lfo.start(); src.start();
		// Animate changes
		Paper.view.onFrame = () => {
			const val = (probe.getValue() - 200) / 400
			probeReading.push(val); probeReading.shift();
			probeReading.forEach((x, i) => {
				path.segments[i].point.y = (1-x) * (canvas.height * 0.5) + canvas.height* 0.25;
			})
		path.smooth();
		}
 		await Tone.start();
	}

</script>

<button on:click={start}>start</button>
<canvas id='canvas' bind:this={canvas}></canvas>

<style>
	#canvas {
		background-color: white;
		border: 1px solid var(--med-blue);
		width: 100%;
		height: 200px;
	}
</style>