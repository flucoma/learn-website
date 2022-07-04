<script>
	import { createEventDispatcher } from 'svelte';

	/**
	 * A horizontal slider
	 * @constructor
	 * @param {number | string} value - The value of the slider. Should be used with bind:.
	 * @param {number | string} min - The minimum value.
	 * @param {number | string} max - The maximum value.
	 * @param {number | string} title - The title of the slider.
	 * @param {number | string} max - The step value between min/max.
	*/
	export let value = '';
	export let min = '0';
	export let max = '100';
	export let title = '';
	export let step = 'any';

	const dispatch = createEventDispatcher();

	const changeHandler = () => {
		dispatch('change');
	};

	const inputHandler = () => {
		dispatch('input');
	};
</script>

<div class="container">
	<div class="label">
		<span class="text title">{title}: {value}</span>
	</div>

	<div class="slider">
		<span class="text min">{min}</span>
		<input
			class="slider"
			type="range"
			{min}
			{max}
			{step}
			bind:value
			on:input={inputHandler}
			on:change={changeHandler}
		/>
		<span class="text max">{max}</span>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: left;
	}

	.slider {
		display: flex;
		flex-direction: row;
	}

	.label {
		display: flex;
		flex-direction: row;
	}

	.title {
		text-align: center;
	}

	.text {
		font-size: 10px;
		color: var(--grey);
	}
	.min {
		text-align: right;
		padding-right: 2px;
	}
	.max {
		text-align: left;
		padding-left: 2px;
	}
</style>
