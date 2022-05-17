<script>
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
	let framehop = 1;
	let channelhop = 1;
</script>

<form>
	<label for="frame_hop">Frame Hop</label>
	<input id="frame_hop" bind:value={framehop} />
</form>

<form>
	<label for="frame_hop">Channel Hop</label>
	<input id="frame_hop" bind:value={channelhop} />
</form>

<br />

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
			{#if i % channelhop === 0}
				{#each css_colors as c, j}
					{#if j % framehop === 0}
						<div class="cube" style:background-color={c} style:clip-path={shape} />
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
</style>
