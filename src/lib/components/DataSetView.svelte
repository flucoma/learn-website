<script lang="ts">
	export let data = [];
	function sanitiseData(data) {
		return data.map((d) => d.toFixed(2));
	}
	let num = 0;
	$: if (data.length) num = Object.values(data[0])[0].length
</script>

<div class="container raisedbox">
	<h3 class="label">DataSet</h3>
	<div class="table">
		<div class="heading">Identifier</div>
		<div class="heading">Data</div>
		{#each data as point}
		{#each Object.entries(point) as [id, data]}
		<div class="entry">{id}</div>
		<div class="entry" style:grid-template-columns={'repeat(' + `${num}` +','+ '4.5ch)'}>
			{#each data as datum}
			<span>
				{ datum.toFixed(2) }
			</span>
			{/each}
			<!-- {sanitiseData(data)} -->
		</div>
		{/each}
		{/each}
	</div>
</div>

<style lang="postcss">
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
	.container {
		max-width: max-content;
		margin-bottom: 1em;
		padding: 0.5em;
	}
	
	.heading {
		font-weight: bold;
	}
	
	.entry {
		display: grid;
		/* flex-direction: row; */
		gap: 1em;
		color: grey;
		text-align: left;
	}
</style>
