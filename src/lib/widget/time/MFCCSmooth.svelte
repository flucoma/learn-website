<script>
	import * as Meyda from 'meyda';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	import { colors } from '$lib/colors';
	import PlayTog from './PlayTog.svelte';
	import Audio from '$lib/components/Audio.svelte';
	
	let playing = false;
	let everPlayed = false;
	let audioContext;
	let analyser;
	let audio;
	let canvas;
	let chart;
	let smoothing = 0;
	let feature = new Array(13).fill(0).map(x => Math.random());

	const audioSpec = {
		src: '/audio/oboe-m.mp3',  
		loop: true,
		waveform: false
	}
	
	onMount(async() => {
		Chart.register(...registerables);
		const ctx = canvas.getContext('2d');
		let data = {
			labels: feature.map((x, i) => `MFCC ${i}`),
			datasets: [
				{
				data: feature,
				backgroundColor: colors.map(x => `rgba(${x[0]}, ${x[1]}, ${x[2]}, 0.5`),
				borderColor: colors.map(x => `rgb(${x[0]}, ${x[1]}, ${x[2]}`),
				borderWidth: 2,
				}
			]
		};
		chart = new Chart(ctx, {
			type: 'bar',
			data: data,
			options: {
				animation: {
					duration: smoothing
				},
				events: [],
				plugins: {
					legend: { display: false }
				},
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						display: true
					},
					y: {
						display: true,
						min: -50,
						max: 50,
					}
				}
			}
		});
	})
	
	const play = () => {
		if (!everPlayed) {
			everPlayed = true;
			audioContext = new (AudioContext || webkitAudioContext)();
			const source = audioContext.createMediaElementSource(audio);
			source.connect(audioContext.destination);
			
			analyser = Meyda.createMeydaAnalyzer({
				audioContext: audioContext,
				source: source,
				bufferSize: 512,
				featureExtractors: ['mfcc'],
				callback: (features) => {
					feature = features.mfcc;
					chart.data.datasets[0].data = feature;
					chart.update();
				}
			});
			analyser.start();
		}
		
	}
	
	const pause = () => {
		analyser.stop();
	}
</script>



<div class="container">

<canvas id="filter" bind:this={canvas} />

<div class='controls'>
	<Audio {...audioSpec} bind:audio
	on:play={play}
	on:pause={pause}
	/>
	<div class="smoothing">
		<label for='smoothing'>Smoothing Amount: { smoothing }</label>
		<input id='smoothing' type='range' bind:value={smoothing} min=0 max=400 step=1 on:input={() => chart.options.animation.duration = smoothing} />
	</div>
</div>
</div>



<style>
	#filter {
		width: 100%;
		max-height: 300px;
		margin: 0 auto;
	}

	.controls {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.smoothing {
		display: flex;
		flex-direction: column;
		width: 50%;
	}
</style>