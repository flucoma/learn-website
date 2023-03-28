<script>
	import { max_scale, clip } from '$lib/util.js';
	let input = [-4, -2, 1, 10, 12];
	let output = [0.0];
	let iMin = 0;
	let iMax = 1;
	let oMin = 0;
	let oMax = 1;
	let clipping = 0;

	$: output = input.map(x => {
		let inp = x;

		if (clipping == 1) {
			inp = Math.max(inp, oMin);	
		} else if (clipping == 2) {
			inp = Math.min(inp, oMin);
		} else if (clipping == 3) {
			inp = clip(inp, oMin, oMax);
		}

		return max_scale(inp, iMin, iMax, oMin, oMax, 1.0);
	});
</script>

<form class="controls">
	<div class="extrema">
		<h2>Minima and Maxima</h2>
		<label for="imin">
			<input type="number" id="imin" min='-99' max='99' bind:value={iMin} />
			Input Minimum
		</label>

		<label for="imax">
			<input type="number" id="imax" min='-99' max='99' bind:value={iMax} />
			Input Maximum
		</label>

		<label for="imax">
			<input type="number" id="omin" min='-99' max='99' bind:value={oMin} />
			Output Minimum
		</label>

		<label for="imax">
			<input type="number" id="omax" min='-99' max='99' bind:value={oMax} />
			Output Maximum
		</label>
	</div>
	<div class="clipping">
		<h2>Input Clipping</h2>
		<label>
			<input type="radio" bind:group={clipping} name='clipping' value={0}>
			None
		</label>
		<label>
			<input type="radio" bind:group={clipping} name='clipping' value={1}>
			Clip Minimum
		</label>			
		<label>
			<input type="radio" bind:group={clipping} name='clipping' value={2}>
			Clip Maximum
		</label>			
		<label>
			<input type="radio" bind:group={clipping} name='clipping' value={3}>
			Clip Minimum and Maximum
		</label>
	</div>
</form>

<div class="data">
	<h2>Result</h2>
	<div class="data-view">
		<div> Input Data: </div>
		<div class='data-cells'>
			{#each input as i}
				<div>{i} &nbsp</div>
			{/each}
		</div>
	</div>

	<div class="data-view">
		<div> Output Data: </div>
		<div class='data-cells'>
			{#each output as o}
			<div> {o.toFixed(2)} &nbsp</div>
			{/each}
		</div>
	</div>
</div>

<style>
	label {
		display:grid;
		grid-template-columns: 5ch 20ch;
		gap: 0.5em;
		justify-content: left;
		align-items: center;
	}
	.controls {
		display: grid;
		grid-template-columns: repeat(2, auto);
		justify-content: space-between;
	}

	.data {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5em;
	}

	.data-view {
		display: grid;
		grid-template-columns: 10ch auto;
	}

	.data-cells {
		display: grid;
		grid-template-columns: repeat(5, 5ch);
	}
</style>
