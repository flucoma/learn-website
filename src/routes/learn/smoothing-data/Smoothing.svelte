<script>
	import { onMount } from 'svelte';
	import smooth from 'array-smooth';
	import Two from 'two.js';

	let container;
	let raw = new Array(100).fill(0.5).map(() => Math.random()); // the value the probe reads
	let window = 0;
	let two;
	let rawCurve, smoothCurve;

	$: smoothed = smooth(raw, window);

	onMount(async () => {
		two = new Two({
			type: Two.Types.svg,
			autostart: true,
			fitted: true
		}).appendTo(container);
		two.fit();

		const rawPoints = raw.map((v, i) => {
			const x = (i / (raw.length - 1)) * two.width; // add equidistant points
			const y = two.height * (1 - v);
			return new Two.Anchor(x, y);
		});

		rawCurve = two.makePath(rawPoints, false, true);
		rawCurve.linewidth = 3;
		rawCurve.noFill();
		rawCurve.stroke = 'grey';

		const smoothPoints = smoothed.map((v, i) => {
			const x = (i / (smoothed.length - 1)) * two.width; // add equidistant points
			const y = two.height * (1 - v);
			return new Two.Anchor(x, y);
		});

		smoothCurve = two.makePath(smoothPoints, false, true);
		smoothCurve.linewidth = 5;
		smoothCurve.noFill();
		smoothCurve.stroke = 'rgb(3, 113, 181)';
		two.add(rawCurve);
		two.add(smoothCurve);
	});

	const update = () => {
		smoothed.forEach((x, i) => {
			smoothCurve.vertices[i].y = (1 - x) * two.height - two.height * 0.5;
		});
	};
</script>

<div class="container" bind:this={container} />

<div class="window">
	<div class="">Window Size: {window}</div>
	<input type="range" min="0" max="40" bind:value={window} on:input={update} />
</div>

<style>
	.container {
		height: 200px;
		width: 100%;
	}

	.window {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 1em;
	}

	input[type='range'] {
		width: 200px;
	}
</style>
