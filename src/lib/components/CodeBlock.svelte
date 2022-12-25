<script>
	import { browser } from '$app/environment';
	let block;

	function copyCode() {
		if (browser) {
			let code = block.querySelectorAll('pre > code');
			code.forEach(c => {
				navigator.clipboard.writeText(c.innerText);
			});
		}
	}
</script>

<div bind:this={block} class="code">
	<button aria-label="copy code" on:click={copyCode} class="btn">copy</button>
	<slot />
</div>

<style lang="postcss">
	.code {
		position: relative;
		max-height: 500px;
		overflow: scroll;
	}

	.btn {
		font-family: var(--font);
		position: absolute;
		right: 0;
	}
</style>
