<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<title>
		Learn FluCoMa
	</title>
</svelte:head>

<div class="container">
	<Header />

	<slot />

	
	<Footer />
</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
