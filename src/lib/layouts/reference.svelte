<script>
	import EditHistory from '$lib/components/EditHistory.svelte';

	export let title;
	export let blurb;
</script>

<div class="title-box">
	<h1>{title}</h1>
	<p class="blurb">{blurb}</p>
</div>

<slot />

<EditHistory />

<style lang="postcss">
	.blurb {
		color: grey;
		text-align: left;
	}
</style>
