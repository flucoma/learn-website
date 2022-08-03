<!--
@component
A component that plays back filtered noise, while showing how a curve can be drawn to represent its volume
-->

<script>
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	import { Chart, registerables } from 'chart.js';

	let canvas; // canvas for the chart
	let chart; // the chart
	let probeReading = new Array(600).fill(0.5); // the value the probe reads

	onMount(async() => {
		// Chart
		Chart.register(...registerables);
		const ctx = canvas.getContext('2d');

		let data = {
			labels: probeReading.map((x, i) => i),
			datasets: [{
				data: probeReading,
				borderColor: 'rgb(28, 164, 252)',
				borderWidth: 4,
				fill: false,
				tension: 0.0,
				pointRadius: 0,
			}]
		}

		chart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				plugins: {
					legend: { display: false },
					tooltip: {
						enabled: false
					}
				},
				animation: { duration: 0 },
				datasets: {
					line: {
						pointRadius: 0
					}
				},
				scales: {
					x: {
						display: false
					},
					y: {
						display: false,
						min: -0.1,
						max: 1.1
					}
				}
			}
		})
	})

	const start = async() => {
		// Tone nodes
		await Tone.start();
		const probe = new Tone.Meter({ normalRange: true }) // extract the value of the lfo
		const mult = new Tone.Multiply().toDestination() // a gain node to modify the volume
		const src = new Tone.Noise('pink').connect(mult).start(); // a sound source
		const lfo = new Tone.LFO(0.1, 0, 1).fan(mult.factor, probe).start(); // an LFO to modulate the sound source
		setInterval(() => {
			const val = probe.getValue()
			probeReading.push(val);
			probeReading.shift();
			chart.data.datasets[0].data = probeReading;
			chart.update();
		}, 5);
	}

</script>

<button on:click={start}>start</button>
<canvas bind:this={canvas}></canvas>