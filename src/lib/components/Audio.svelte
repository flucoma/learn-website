<script>
	import { onMount } from 'svelte';
	export let src = '';
	export let label = '';
	export let waveform = false;

	let Peaks, instance, overview, audio, ctx;

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
				mediaElement: audio,
				waveformColor: 'rgb(28, 164, 252)',
				playheadColor: 'rgba(0, 0, 0, 1)',
				playheadTextColor: '#aaa',
				showPlayheadTime: false
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
		<audio controls bind:this={audio}>
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
		gap: 2em;
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
