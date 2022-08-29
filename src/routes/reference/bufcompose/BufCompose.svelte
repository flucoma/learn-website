<script>
	import { fly } from 'svelte/transition';
	// https://sashamaps.net/docs/resources/20-colors/
	const colors = [
		[230, 25, 75],
		[60, 180, 75],
		[255, 225, 25],
		[0, 130, 200],
		[245, 130, 48],
		[70, 240, 240],
		[240, 50, 230],
		[250, 190, 212],
		[0, 128, 128],
		[220, 190, 255],
		[170, 110, 40],
		[255, 250, 200],
		[128, 0, 0],
		[170, 255, 195],
		[0, 0, 128],
		[128, 128, 128],
		[255, 120, 120],
		[0, 0, 0]
	];
	const css_colors = colors.map(x => `rgb(${x[0]}, ${x[1]}, ${x[2]})`);
	const shapes = [
		'',
		'polygon(0% 0%, 0% 0%, 100% 100%, 0% 100%)',
		'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
		'circle(50%)',
		'polygon(100% 100%, 0% 0%, 0% 100%, 100% 0%)'
	];
	let startFrame = 0;
	let numFrames = -1;
	let startChan = 0;
	let numChans = -1;

	// Some private variables to react to the user facing input values
	let _startFrame = 0;
	let _numFrames = 0;
	let _startChan = shapes.length;
	let _numChans = shapes.length;

	$: {
		if (startFrame !== null) _startFrame = startFrame === -1 ? 0 : startFrame;
	}
	$: {
		if (numFrames !== null) _numFrames = numFrames === -1 ? css_colors.length : numFrames;
	}
	$: {
		if (startChan !== null) _startChan = startChan === -1 ? 0 : startChan;
	}
	$: {
		if (numChans !== null) _numChans = numChans === -1 ? shapes.length : numChans;
	}
</script>

<form>
	<label for="start-frame">startFrame</label>
	<input id="start-frame" bind:value={startFrame} type="number" min={-1} max={css_colors.length} />
</form>

<form>
	<label for="num-frames">numFrames</label>
	<input id="num-frames" bind:value={numFrames} type="number" min={-1} max={css_colors.length} />
</form>

<form>
	<label for="start-chan">startChan</label>
	<input id="start-chan" bind:value={startChan} type="number" min={-1} max={shapes.length} />
</form>

<form>
	<label for="num-chans">NumChans</label>
	<input id="num-chans" bind:value={numChans} type="number" min={-1} max={shapes.length} />
</form>

<div class="container source">
	<div class="label">Source Buffer</div>
	{#each shapes as shape}
		<div class="row">
			{#each css_colors as c}
				<div class="cube" style:background-color={c} style:clip-path={shape} />
			{/each}
		</div>
	{/each}
</div>

<div class="container destination">
	<div class="label">Destination Buffer</div>
	{#each shapes as shape, i}
		<div class="row">
			{#if i >= _startChan && i < _startChan + _numChans}
				{#each css_colors as c, j}
					{#if j >= _startFrame && j < _startFrame + _numFrames}
						<div
							class="cube"
							style:background-color={c}
							style:clip-path={shape}
							transition:fly={{ duration: 1000, x: -500 }}
						/>
					{/if}
				{/each}
			{/if}
		</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-bottom: 2em;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}

	.cube {
		width: 30px;
		height: 30px;
	}

	form {
		display: grid;
		grid-template-columns: 10ch auto;
		justify-content: left;
		margin-bottom: 0.5em;
	}

	input {
		min-width: 4em;
	}
</style>
