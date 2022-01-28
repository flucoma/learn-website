<script lang="ts">
	export let data = [];
</script>

<div class="container">
	<h3 class="label">LabelSet</h3>
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

</div>

<style lang="postcss">
	.label {
		/* font-family: var(--mono); */
		font-weight: bold;
		padding-left: 0.5em;
	}
	.table {
		display: grid;
		grid-template-columns: auto auto;
		width: min(20ch, 100%);
		font-family: var(--mono);
		gap: 1em;
		padding: 0.5em;
	}
	.container {
		border: 0.063rem solid #dcdee0;
		border-radius: 0.25em;
		max-width: max-content;
		margin-bottom: 1em;
	}

	.container:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .container, .container:hover {
        transition: box-shadow 200ms ease-in-out;
    }

	.heading {
		font-weight: bold;
	}

	.entry {
		color: grey;
		text-align: left;
	}
</style>
