<script>
	export let label = 'button';
	export let width = '100px';
	export let height = '38px';
	export let disabled = false;
</script>

<button class="btn" style:width style:height class:disabled on:click {disabled}>
	{label}
</button>

<style lang="postcss">
	.btn {
		color: white;
		cursor: pointer;
		border: 2px outset var(--med-blue);
		border-radius: 0.25em;
		background-color: var(--light-blue);
		transition: box-shadow 0.1s;
		font-size: 1rem;
	}

	.btn:active {
		background-color: var(--med-blue);
	}

	.btn:hover {
		box-shadow: 0 0 3px var(--dark-blue);
	}

	.disabled,
	.disabled:active,
	.disabled:hover {
		background-color: grey;
		border: grey;
		opacity: 0.5;
	}
</style>
