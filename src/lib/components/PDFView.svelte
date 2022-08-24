<script>
	import PdfViewer from 'svelte-pdf';
	//import PdfViewer from 'svelte-pdf-viewer'
	export let src = '';
	export let label = '';
	//let pdfInfos
</script>

<PdfViewer url={src} />

<!--<PdfViewer file={ src } bind:infos={ pdfInfos }/>-->

<p class="label">{label}</p>

<style lang="postcss">
	.label {
		padding-top: 1em;
		font-size: 0.75rem;
		font-style: italic;
		text-align: center;
	}
</style>
