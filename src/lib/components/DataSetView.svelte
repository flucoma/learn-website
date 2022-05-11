<script lang="ts">
	export let data = [];
	function sanitiseData(x) {
		return x.map(d => d.toFixed(2));
	}
	let num = 0;
	$: if (data.length) num = Object.values(data[0])[0].length;
</script>

<div class="container raisedbox">
	<h3 class="label">DataSet</h3>
	<div class="table">
		<div class="heading">Identifier</div>
		<div class="heading">Data</div>
		{#each data as point}
			{#each Object.entries(point) as [id, data]}
				<div class="entry">{id}</div>
				<div class="entry" style:grid-template-columns={'repeat(' + `${num}` + ',' + '7ch)'}>
					{#each data as datum}
						<div>
							{datum.toFixed(2)}
						</div>
					{/each}
					<!-- {sanitiseData(data)} -->
				</div>
			{/each}
		{/each}
	</div>
</div>

<style lang="postcss">
	.container {
		margin-bottom: 0.5em;
		padding: 0.5em;
		max-width: 100%;
	}
	.label {
		font-weight: bold;
	}
	.table {
		display: grid;
		grid-template-columns: auto auto;
		width: min(20ch, 100%);
		font-family: var(--mono);
		gap: 1em;
	}

	.heading {
		font-weight: bold;
	}

	.entry {
		display: grid;
		gap: 1em;
		color: var(--grey);
		text-align: left;
	}
</style>
