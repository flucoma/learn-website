<script>
	import { onMount } from 'svelte';
	import * as Paper from 'paper';

	let canvas; // canvas for paper
	let mode = 0; // 0 for paused, 1 for playing
	let triangle;

	onMount(async() => {
		Paper.setup(canvas);
		triangle = new Paper.Path.RegularPolygon(new Paper.Point(canvas.width*0.5, canvas.height*0.5), 3, 30);
		triangle.rotate(-30)
		triangle.fillColor = 'black';
	})
</script>

<canvas id='canvas' bind:this={canvas} on:click={
	() => {
		// swap mode
		triangle = new Paper.Rectangle(new Paper.Point(canvas.width*0.5, canvas.width*0.5))
		Paper.view.update();
	}
}></canvas>

<style>
	#canvas {
		width: 100px;
		height: 100px;
		padding: 8px;
	}
</style>