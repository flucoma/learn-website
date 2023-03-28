<script>
	import './theme.css';
</script>

<div class="container">
	<slot />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
