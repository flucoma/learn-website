<script>
	/**
	 * A wrapped up audio element.
	 * @constructor
	 * @param {string} src - The path to the audio source.
	 * @param {string} label - The caption to render underneath the element.
	 * @param {boolean} waveform - Toggle for waveform display.
	 */
	import { onMount } from 'svelte';
	export let src = '';
	export let label = '';
	export let waveform = false;
	export let audio;
	export let loop = false;

	let Peaks, instance, ctx;
	let overview;

	onMount(async () => {
		if (waveform) {
			ctx = new (AudioContext || webkitAudioContext)();
			const module = await import('peaks.js');
			Peaks = module.default;
			const options = {
				containers: {
					overview: overview
				},
				webAudio: {
					audioContext: ctx,
					scale: 128,
					multiChannel: false
				},
				zoomLevels: [32],
				mediaElement: audio,
				waveformColor: 'rgb(28, 164, 252)',
				playheadColor: 'rgba(0, 0, 0, 1)',
				playheadTextColor: '#aaa',
				showPlayheadTime: false,
			};
			instance = Peaks.init(options, (err, p) => {
				if (err) {
					console.log(err);
				} else {
					instance = p;
					instance.views.getView('overview').fitToContainer();
				}
			});
		}
	});
</script>

<div class="container">
	{#if waveform}
		<div class="waveform" bind:this={overview} />
	{/if}

	<div class="audio">
		<audio controls bind:this={audio} loop={loop} on:play on:pause>
			<source {src} type="audio/mp3" />
			Your browser does not support the audio tag.
		</audio>
		<div class="label">{label}</div>
	</div>
</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
		width: 100%;
		margin-top: 1em;
		margin-bottom: 1em;
		gap: 1em;
	}

	.audio {
		display: flex;
		flex-direction: column;
		place-items: center;
		gap: 0.5em;
	}

	.label {
		font-size: 0.75rem;
	}

	.waveform {
		width: 100%;
		height: 65px;
	}
</style>
