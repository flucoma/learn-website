<script lang="ts">
	export let data = [];
	function sanitiseData(x) {
		return x.map((d) => d.toFixed(2));
	}
	data.forEach(d => {
		console.log(d)
	})
</script>

<div class="table">
	<div class="heading">Identifier</div>
	<div class="heading">Data</div>
	{#each data as point}
		{#each Object.entries(point) as [id, data]}
			<div class="entry">{id}</div>
			<div class="entry">{sanitiseData(data)}</div>
		{/each}
	{/each}
</div>

<style lang="postcss">
	.table {
		display: grid;
		grid-template-columns: auto auto;
		width: min(20ch, 100%);
		font-family: var(--mono);
		gap: 1em;
		padding-top: 1em;
	}

	.heading {
		font-weight: bold;
	}

	.entry {
		color: grey;
		text-align: left;
	}
</style>
