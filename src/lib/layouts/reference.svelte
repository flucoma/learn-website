<script>
	export let title;
	export let blurb;
	import EditHistory from '$lib/components/EditHistory.svelte';
	import HR from '$lib/components/HR.svelte';
</script>

<div class="title-box">
	<h1>{title}</h1>
	<p class="blurb">{blurb}</p>
</div>

<slot />

<HR />

<EditHistory />

<style lang="postcss">
	.blurb {
		color: grey;
		text-align: left;
	}
</style>
