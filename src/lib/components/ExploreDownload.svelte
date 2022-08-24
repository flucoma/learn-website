<script>
	import Admonition from './Admonition.svelte';
	import { createLink } from '$lib/assets';
	export let url = '';
	export let note = '';
	export let download = 'download.zip';

	const link = createLink(url);
</script>

<Admonition type="pointer">
	<p>
		Download the demonstration patches for this article <a
			href={link}
			download={download}>here</a
		>.
	</p>
	{#if note !== ''}
		<p>
			{@html note}
		</p>
	{/if}
</Admonition>

<style>
	p {
		margin: 0;
	}
</style>
