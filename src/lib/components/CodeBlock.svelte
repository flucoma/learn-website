<script>
	import { browser } from '$app/env';
	let block;

	function copyCode(d) {
		if (browser) {
			let code = block.querySelectorAll('pre > code');
			code.forEach((c) => {
				navigator.clipboard.writeText(c.innerText);
			});
		}
	}
</script>

<div bind:this={block} class="code">
	<button on:click={copyCode} class="btn">copy</button>
	<slot />
</div>

<style lang="scss">
	@import './code.scss';
	.code {
		position: relative;
	}

	.btn {
		font-family: $font;
		position: absolute;
		right: 0;
	}
</style>
