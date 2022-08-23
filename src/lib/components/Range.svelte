<script>
	import { clip } from '$lib/util';
	let focused = false;
	let tween = false;
	let container, handle; // dom
	let offset = '0px';

	const down = e => {
		focused = true;
		const leftEdge = container.getBoundingClientRect().x;
		handle.style.left = `${e.clientX - leftEdge}px`;
	};

	const up = () => {
		focused = false;
	};

	const move = e => {
		if (focused) {
			const leftEdge = container.getBoundingClientRect().x;
			const pos = clip(e.clientX - leftEdge, 0, container.getBoundingClientRect().width - 20);
			handle.style.left = `${pos}px`;
		}
	};
</script>

<svelte:window on:mouseup={up} on:mousemove={move} />

<div class="container" on:mousedown={down} bind:this={container}>
	<div class="track" />
	<div class="handle" bind:this={handle} style:background-color={focused ? 'var(--med-blue)' : 'white'} />
</div>

{tween}
{offset}

<style>
	.container {
		position: relative;
		width: 250px;
		cursor: grab;
		height: 30px;
		outline: 1px solid black;
		z-index: 20;
	}
	.track {
		position: absolute;
		top: 15px;
		width: 250px;
		height: 2px;
		background-color: var(--med-blue);
		z-index: -20;
	}
	.handle {
		--dim: 15px;
		position: absolute;
		border-radius: 50%;
		border: 3px solid var(--med-blue);
		width: var(--dim);
		height: var(--dim);
		z-index: 20;
		transition: background-color 0.25s;
		top: 5px;
	}
</style>
