<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let open = false;

	function doStuff() {
		dispatch('click');
	}
</script>

<button aria-label="expand/contract navigation" on:click={doStuff} class="btn">
	{#if !open}
	<svg width="24" height="20">
		<line x1="0" y1="4" x2="24" y2="4" />
		<line x1="0" y1="11" x2="24" y2="11" />
		<line x1="0" y1="18" x2="24" y2="18" />
	</svg>
	{:else}
	<svg width="24" height="20">
		<line x1="4" y1="4" x2="20" y2="18" />
		<line x1="4" y1="18" x2="20" y2="4" />
	</svg>
	{/if}
</button>

<style>
	button {
		background: transparent;
		outline: none;
		border: none;
		padding: 0;
	}
	button:hover{
		cursor: pointer;
	}
	svg {
		min-width: 24;
		min-height: 20;
		background: none;
		transition: transform 0.3s ease-in-out;
	}
	svg line {
		stroke: rgb(255, 255, 255);
		stroke-width: 3;
	}

	svg:hover > * {
		stroke: var(--light-blue);
	}

	svg:active > * {
		stroke: rgb(255, 255, 255);
	}
</style>
