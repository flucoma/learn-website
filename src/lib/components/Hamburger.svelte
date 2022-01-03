<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function doStuff() {
		dispatch('click');
	}
</script>

<button on:click={doStuff} class="btn">
	<svg width="24" height="20">
		<line x1="0" y1="4" x2="24" y2="4" />
		<line x1="0" y1="11" x2="24" y2="11" />
		<line x1="0" y1="18" x2="24" y2="18" />
	</svg>
</button>

<style lang="postcss">
	button {
		background: transparent;
		outline: none;
		border: none;
	}
	svg {
		min-height: 24px;
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
