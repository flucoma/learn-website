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
		border-radius: 12px;
		transition: background-color 150ms linear, transform 0.3s ease, box-shadow 0.3s ease;
		box-shadow: 0 4px 6px rgba(3, 113, 181, 0.2), 0 1px 3px rgba(3, 113, 181, 0.1);
		word-wrap: none;
		overflow: hidden;
		min-width: fit-content;
	}

	.btn:hover {
		background-color: var(--med-blue);
		transform: translateY(-2px);
		box-shadow: 0 8px 12px rgba(3, 113, 181, 0.2), 0 3px 6px rgba(3, 113, 181, 0.1);
	}

	.btn:active {
		background-color: var(--light-blue);
		transform: translateY(0);
	}
</style>