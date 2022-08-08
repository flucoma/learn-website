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
	let probeReading = new Array(300).fill(0.5); // the value the probe reads
	let path; // a line to draw

	onMount(async() => {
		Paper.setup(canvas);
		path = new Paper.Path();
		path.strokeColor = 'rgb(3, 113, 181)';
		path.strokeWidth = 5;
		probeReading.forEach((v, i) => {
			const x = (canvas.width / probeReading.length) * i; // add equidistant points
			const y = Paper.view.bounds.height * v;
			const pt = new Paper.Point(x, y);
			path.add(pt)
		});
	})

	const start = async() => {
		await Tone.start();
		// Tone nodes
		probe = new Tone.DCMeter() // extract the value of the lfo
		const mult = new Tone.Multiply().toDestination() // a gain node to modify the volume
		const lfo = new Tone.LFO(0.4, 0, 1).fan(mult.factor, probe); // an LFO to modulate the sound source
		const src = new Tone.Noise('pink').connect(mult); // a sound source
		
		lfo.start(); src.start();
		// Animate changes
		Paper.view.onFrame = () => {
			const val = probe.getValue();
			probeReading.push(val); probeReading.shift();
			probeReading.forEach((x, i) => {
				path.segments[i].point.y = (1-x) * Paper.view.bounds.height;
			})
			path.smooth();
		}
	}

</script>

<button on:click={start}>start</button>
<canvas id='canvas' bind:this={canvas} resize />

<style>
	#canvas[resize] {
		background-color: white;
		border: 1px solid var(--med-blue);
		width: 100%;
		height: 100px;
	}
</style>
