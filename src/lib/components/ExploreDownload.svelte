<script>
	import IndentNote from './IndentNote.svelte';
	import { createLink } from '$lib/assets';
	export let url = '';
	export let note = '';

	const link = createLink(url);
</script>

<IndentNote type="pointer">
	Download the demonstration patches for this article <a href={link} download='Alice Eldridge and Chris Kiefer Examples.zip'>here</a>.
	
	{ @html note }
</IndentNote>