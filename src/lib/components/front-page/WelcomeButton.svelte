<script>
	export let url = '';
	export let text = '';
</script>

<a class='btn' href={url}>
	{text}
</a>

<style>
	.btn {
		display: grid;
		place-items: center;
		width: 150px;
		height: 40px;
		background-color: var(--dark-blue);
		padding: 0.5em;
		color: white;
		text-decoration: none;
		box-shadow: 5px 5px 0 0 var(---med-blue);
		transition: background-color 150ms linear;
		box-shadow: rgba(3, 113, 181, 0.6) -5px 5px, rgba(3, 113, 181, 0.25) -10px 10px, rgba(3, 113, 181, 0.1) -15px 15px;
		word-wrap: none;
		overflow: hidden;
		min-width: fit-content;
	}

	.btn:hover {
		background-color: var(--med-blue);
	}

	.btn:active {
		background-color: var(--light-blue);
	}
</style>