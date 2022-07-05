<script>
	import { WebglPlot, WebglLine, ColorRGBA } from 'webgl-plot';
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	import smooth from 'array-smooth';
	import Button from '$lib/components/Button.svelte';

	// Audio
	let features = [];
	let meter, bassPlayer, pianoPlayer, drumPlayer;
	let ctxStarted = false;
	// Canvas
	let canvas, pixelRatio;
	let ready = false;

	let slowSmooth = 50;

	// WGLP
	let line, smoothedLine, wglp;

	const newFrame = () => {
		// let t = smooth(features, 0.0)
		let t = features;
		let tSmooth = smooth(features, slowSmooth);

		for (let i = 0; i < t.length; i++) {
			line.setY(i, t[i] * 2 - 0.5);
			smoothedLine.setY(i, tSmooth[i] * 2 - 0.5);
		}
		wglp.update();
		requestAnimationFrame(newFrame);
	};

	onMount(async () => {
		// Tone.js setup
		meter = new Tone.Meter({ normalRange: true });
		bassPlayer = new Tone.Player({ loop: true, url: '/audio/bass-m.mp3' }).toDestination();
		pianoPlayer = new Tone.Player({ loop: true, url: '/audio/piano-m.mp3' }).toDestination();
		drumPlayer = new Tone.Player({ loop: true, url: '/audio/drum-m.mp3' }).toDestination();
		bassPlayer.connect(meter);
		pianoPlayer.connect(meter);
		drumPlayer.connect(meter);

		Tone.loaded().then(() => {
			ready = true;
		});

		// webgl setup
		pixelRatio = window.devicePixelRatio || 1;
		canvas.width = canvas.clientWidth * pixelRatio;
		canvas.height = 200 * pixelRatio;
		features = new Array(canvas.width).fill(0.0);
	});

	const updateWaveform = choice => {
		if (choice === 'drum') {
			bassPlayer.stop();
			pianoPlayer.stop();
			drumPlayer.start();
		} else if (choice === 'bass') {
			bassPlayer.start();
			pianoPlayer.stop();
			drumPlayer.stop();
		} else {
			bassPlayer.stop();
			pianoPlayer.start();
			drumPlayer.stop();
		}

		if (!ctxStarted) {
			setInterval(() => {
				features.shift();
				features.push(meter.getValue());
			}, 0.1);
			ctxStarted = true;

			// web-gl plot
			const numX = canvas.width;
			const color = new ColorRGBA(1, 0, 0, 1);
			const color2 = new ColorRGBA(0, 0, 1, 1);
			line = new WebglLine(color2, numX);
			smoothedLine = new WebglLine(color, numX);
			wglp = new WebglPlot(canvas);

			line.arrangeX();
			smoothedLine.arrangeX();

			wglp.addLine(line);
			wglp.addLine(smoothedLine);
			newFrame();
		}
	};
</script>

<canvas id="vis" bind:this={canvas} class:hidden={!ready} />

<div class="controls">
	<div class="smoothing">
		<div class="label">Slow Envelope Smoothing</div>
		<div class="slider">
			<input type="range" min="1" max="100" bind:value={slowSmooth} />
		</div>
	</div>
	<div class="sound-select">
		<Button
			label="Bass 🎸"
			on:click={() => {
				updateWaveform('bass');
			}}
		/>

		<Button
			label="Piano 🎹"
			on:click={() => {
				updateWaveform('piano');
			}}
		/>

		<Button
			label="Drum 🥁"
			on:click={() => {
				updateWaveform('drum');
			}}
		/>

		<Button
			label="Stop"
			on:click={() => {
				bassPlayer.stop();
				pianoPlayer.stop();
				drumPlayer.stop();
			}}
		/>
	</div>
</div>

<style>
	.hidden {
		visibility: hidden;
	}
	.controls {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1em;
	}

	.smoothing {
		display: flex;
		flex-direction: column;
	}

	.slider {
		display: flex;
		flex-direction: row;
	}

	.sound-select {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	#vis {
		width: 99% !important;
		min-width: 0 !important;
		max-height: 400px;
		margin: 0 auto;
		border: 1px solid rgb(230, 230, 230);
	}
</style>
