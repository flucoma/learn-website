<script lang="ts">
	export let data = [];
</script>

<div class="table">
	<div class="heading">Identifier</div>
	<div class="heading">Label</div>
	{#each data as point}
		{#each Object.entries(point) as [id, label]}
			<div class="entry">{id}</div>
			<div class="entry">{label}</div>
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
		margin-bottom: 1em;
	}

	.heading {
		font-weight: bold;
	}

	.entry {
		color: grey;
		text-align: left;
	}
</style>
