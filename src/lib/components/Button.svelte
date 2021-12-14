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

<style lang="scss">
	.btn {
		font-family: $font;
		border: 1px outset $light-blue;
		background-color: $light-blue;
		color: white;
		height: 38px;
		cursor: pointer;
		transition: box-shadow 0.1s;
	}

	.btn:active {
		border: 1px outset $med-blue;
		background-color: $med-blue;
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
