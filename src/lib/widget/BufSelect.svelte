<script>
	import Button from '$lib/components/Button.svelte';
	let w = 5;
	let h = 5;

	let indices = '-1';
	let channels = '-1';

	let parseIndices = [];
	let parseChannels = [];

	let indicesError = '';
	let channelsError = '';

	$: {
		let arr = indices.split(' ');
		arr = arr.filter((x) => parseInt(x) < w);
		indicesError = arr.length === 0 ? 'No valid indices provided.' : '';

		if (arr.length === 1 && arr[0] === '-1') {
			parseIndices = new Array(w).fill(null).map((x, i) => i);
		} else if (arr.length > 0) {
			parseIndices = arr.map((i) => parseInt(i));
		} else if (arr.length === 0) {
			parseIndices = [];
		}

		console.log(parseIndices);
	}

	$: {
		let arr = channels.split(' ');
		arr = arr.filter((x) => parseInt(x) < h);
		channelsError = arr.length === 0 ? 'No valid channels provided' : '';

		if (arr.length === 1 && arr[0] === '-1') {
			parseChannels = new Array(w).fill(null).map((x, i) => i);
		} else if (arr.length > 0) {
			parseChannels = arr.map((i) => parseInt(i));
		} else if (arr.length === 0) {
			parseChannels = [];
		}
	}
</script>

<div class="controls">
	<div class="custom">
		<div class="attr">
			<input bind:value={indices} />
			<div class="text">
				<div class="label">Indices</div>
				<div class="error">{indicesError}</div>
			</div>
		</div>

		<div class="attr">
			<input bind:value={channels} />
			<div class="text">
				<div class="label">Channels</div>
				<div class="error">{channelsError}</div>
			</div>
		</div>
	</div>

	<div class="preset">
		<Button
			on:click={() => {
				indices = '0';
				channels = '0 1 2 3 4';
			}}
			width="80%"
			label="First index of every channel"
		/>
		<Button
			on:click={() => {
				indices = '0 1 2 3 4';
				channels = '1';
			}}
			width="80%"
			label="Every index of second channel"
		/>
		<Button
			on:click={() => {
				indices = '0 4';
				channels = '1 3';
			}}
			width="80%"
			label="First and last indices of second and fourth channel"
		/>
	</div>
</div>

<div class="grid">
	{#each { length: w } as _, col}
		<div class="row">
			{#each { length: h } as _, row}
				<div
					class="cell"
					class:selected={parseIndices.includes(row) && parseChannels.includes(col)}
				>
					<div>Index: {row}</div>
					<div>Channel: {col}</div>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	.grid {
		display: grid;
		grid-template-rows: repeat(5, auto);
		place-items: center stretch;
		margin-top: 1em;
	}
	.row {
		display: flex;
		flex-direction: row;
		margin: 0 auto;
	}

	.cell {
		border: 1px solid rgb(201, 201, 201);
		width: 75px;
		height: 75px;
	}

	.cell > div {
		font-size: 0.5rem;
		margin: 0.5em;
	}

	.selected {
		background-color: var(--light-blue);
		color: white;
	}

	.error {
		color: red;
		font-size: 0.75rem;
	}
	.controls {
		display: grid;
		grid-template-columns: auto auto;
		place-items: end;
	}

	.attr {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
		width: 100%;
	}

	.attr > input {
		padding: 1em;
		font-size: 1rem;
		width: 80px;
	}

	.attr > .text {
		display: flex;
		flex-direction: column;
	}

	.preset {
		display: flex;
		flex-direction: column;
		gap: 0.3em;
	}
</style>
