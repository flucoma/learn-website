<script>
	import { browser } from '$app/env';
	import { slide } from 'svelte/transition';
	
	export let title = ''
	export let snippet = false;
	let block;

	const copyCode = () => {
		if (browser) {
			let code = block.querySelectorAll('pre > code');
			code.forEach(c => {
				navigator.clipboard.writeText(c.innerText);
			});
		}
	}
</script>

<div bind:this={block} class="container" class:not-snippet={!snippet}>
	{#if !snippet}
	<div class="header">{title}</div>
	{/if}
	<div class="code" transition:slide>
		<button aria-label="copy code" on:click={copyCode} class="btn">copy</button>
		<slot />
	</div>
</div>

<style>
	.container {
		position: relative;
		max-height: 600px;
		border-radius: 0.25rem;
		margin-bottom: 1em;
		max-height: 500px;
		overflow: auto;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	}

	.not-snippet {
		border-left: 4px solid rgb(191, 191, 191);
	}

	.header {
		background-color: rgb(233, 233, 233);
		padding: 0.5em;
		padding-left: 1em;
		font-weight: bold;
	}

	.code {
		position: relative;
	}

	.btn {
		font-family: var(--font);
		position: absolute;
		right: 0;
	}
</style>
