<script >
	import { max_scale, clip } from '$lib/util.js';
	let input = [1, 2, 3, 4, 5];
	let output = [];
	let iMin = 1;
	let iMax = 5;
	let oMin = 0;
	let oMax = 1;
	let clipping = false;

	$: output = input.map(x => {
		const o = max_scale(x, iMin, iMax, oMin, oMax, 1.0);
		if (clipping) {
			return clip(o, oMin, oMax);
		}
		return o;
	});
</script>

<div class="container">
	<form class="controls">
		<h3>Minima and Maxima</h3>
		<div>
			<label for="imin">Input Minimum</label>
			<input type="number" id="imin" bind:value={iMin} />
		</div>

		<div>
			<label for="imax">Input Maximum</label>
			<input type="number" id="imax" bind:value={iMax} />
		</div>

		<div>
			<label for="imax">Output Minimum</label>
			<input type="number" id="omin" bind:value={oMin} />
		</div>

		<div>
			<label for="imax">Output Maximum</label>
			<input type="number" id="omax" bind:value={oMax} />
		</div>

		<div>
			<label for="clip">Clipping</label>
			<input class="tog" type="checkbox" id="clip" bind:checked={clipping} />
		</div>
	</form>

	<div class="data">
		<h3>Data</h3>
		<div class="data-view">
			<span> Input Data: </span>
			<span>
				{#each input as i}
					{i} &nbsp
				{/each}
			</span>
		</div>

		<div class="data-view">
			<span> Output Data: </span>
			<span>
				{#each output as o}
					{o.toFixed(2)} &nbsp
				{/each}
			</span>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		margin-top: 1em;
	}
	.controls {
		display: flex;
		flex-direction: column;
		width: max-content;
		margin-right: 4em;
		gap: 0.5em;
	}
	.controls > div {
		display: grid;
		grid-template-columns: 13ch 5ch;
	}

	.tog {
		margin: 0;
	}

	.data {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.data-view {
		display: grid;
		grid-template-columns: 12ch auto;
	}

	.data-view > span:nth-child(1) {
		font-weight: bold;
	}
</style>
