<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let label: string = 'button';
	export let width: string = '100px';
	export let height:string = '38px';
	export let disabled: boolean = false;
</script>

<button
class="btn" 
style:width={width} 
style:height={height} 
class:disabled 
on:click
{disabled}
>
	{label}
</button>

<style lang="postcss">
	.btn {
		color: white;
		cursor: pointer;
		border: 2px outset var(--med-blue);
		border-radius: 0.25em;
		background-color: var(--light-blue);
		transition: box-shadow 0.1s;
	}

	.btn:active {
		background-color: var(--med-blue);
	}

	.btn:hover {
		box-shadow: 0 0 3px var(--dark-blue);
	}

	.disabled,
	.disabled:active,
	.disabled:hover {
		background-color: grey;
		border: grey;
	}
</style>
