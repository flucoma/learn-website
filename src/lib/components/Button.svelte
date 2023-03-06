<script>
	export let label = 'button';
	export let width = '100px';
	export let height = '38px';
	export let disabled = false;
</script>

<button class="btn" style:width style:height class:disabled on:click {disabled}>
	{label}
</button>

<style >
	.btn {
		cursor:pointer;
		border: 2px outset var(--med-blue);
		display: grid;
		place-items: center;
		width: 150px;
		height: 40px;
		background-color: var(--light-blue);
		padding: 0.5em;
		color: white;
		text-decoration: none;
		transition: background-color 150ms linear;
		word-wrap: none;
		overflow: hidden;
		min-width: fit-content;
		font-size: 1rem;
		font-family: var(--font);
	}

	.btn:hover {
		background-color: var(--med-blue);
	}

	.btn:active {
		background-color: var(--dark-blue);
	}

	.disabled,
	.disabled:active,
	.disabled:hover {
		cursor:not-allowed;
		background-color: grey;
		border: grey;
		opacity: 0.5;
	}
</style>
