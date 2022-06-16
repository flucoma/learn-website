<script type="ts">
	import Button from '$lib/components/Button.svelte';

	let w: number = 4; // Grid width
	let h: number = 4; // Grid height
	let indices: string = '-1';
	let channels: string = '-1';
	let parseIndices: number[] = [];
	let parseChannels: number[] = [];
	let indicesError: string = '';
	let channelsError: string = '';

	$: {
		let arr = indices.split(' ');
		arr = arr.filter(x => parseInt(x) < w);
		indicesError = arr.length === 0 ? 'No valid indices provided.' : '';

		if (arr.length === 1 && arr[0] === '-1') {
			parseIndices = new Array(w).fill(null).map((x, i) => i);
		} else if (arr.length > 0) {
			parseIndices = arr.map(i => parseInt(i));
		} else if (arr.length === 0) {
			parseIndices = [];
		}
		parseIndices.sort();
	}

	$: {
		let arr = channels.split(' ');
		arr = arr.filter(x => parseInt(x) < h);
		channelsError = arr.length === 0 ? 'No valid channels provided' : '';

		if (arr.length === 1 && arr[0] === '-1') {
			parseChannels = new Array(w).fill(null).map((x, i) => i);
		} else if (arr.length > 0) {
			parseChannels = arr.map(i => parseInt(i));
		} else if (arr.length === 0) {
			parseChannels = [];
		}
		parseIndices.sort();
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
				channels = '0 1 2 3';
			}}
			width="100%"
			label="First index of every channel"
		/>
		<Button
			on:click={() => {
				indices = '0 1 2 3';
				channels = '1';
			}}
			width="100%"
			label="Every index of second channel"
		/>
		<Button
			on:click={() => {
				indices = '0 3';
				channels = '1 3';
			}}
			width="100%"
			label="First and last indices of second and fourth channel"
		/>
	</div>
</div>

<div class="vis">
	<div class="io">
		<div class="">Source</div>
		<div class="grid">
			{#each { length: w } as _, col}
				<div class="row">
					{#each { length: h } as _, row}
						<div class="cell" class:selected={parseIndices.includes(row) && parseChannels.includes(col)}>
							<div>Index: {row}</div>
							<div>Channel: {col}</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="arrow" />

	<div class="io">
		<div class="">Destination</div>

		<div class="grid">
			{#each parseChannels as chan, x}
				<div class="row">
					{#each parseIndices as ind, y}
						<div class="cell selected">
							<div>Index: {ind}</div>
							<div>Channel: {chan}</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.vis {
		display: flex;
		flex-direction: row;
		margin-top: 2em;
		gap: 0.5em;
		flex-wrap: wrap;
	}

	.io {
		display: flex;
		flex-direction: column;
	}

	.grid {
		display: grid;
		grid-template-rows: repeat(4, 1fr);
		margin-top: 1em;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.cell {
		border: 1px solid rgb(201, 201, 201);
		width: 70px;
		height: 70px;
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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
		place-items: end;
	}
</style>
