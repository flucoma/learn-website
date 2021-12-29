<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let label: string = 'button';
	export let width: string = '100px';
	export let disabled: boolean = false;
	const dispatch = createEventDispatcher();

	function doStuff() {
		dispatch('click');
	}
</script>

<button style={`width: ${width}`} class:disabled class="btn" on:click={doStuff} {disabled}>
	{label}
</button>

<style lang="postcss">
	.btn {
		font-family: var(--font);
		border: 1px outset var(--light-blue);
		background-color: var(--light-blue);
		color: white;
		height: 38px;
		cursor: pointer;
		transition: box-shadow 0.1s;
	}

	.btn:active {
		border: 1px outset var(--med-blue);
		background-color: var(--med-blue);
	}

	.btn:hover {
		box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
	}

	.disabled,
	.disabled:active,
	.disabled:hover {
		background-color: grey;
		border: grey;
	}
</style>
