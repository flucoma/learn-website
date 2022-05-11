<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string | number;
	export let min: string | number = '0';
	export let max: string | number = '100';
	export let title: string = '';
	export let step: string | number = 'any';

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
