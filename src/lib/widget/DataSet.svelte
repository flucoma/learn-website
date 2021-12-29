<!-- 
    Refer to:
    https://ptsjs.org/guide/op-0400
 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { CanvasSpace, Circle, Rectangle, Geom, Bound } from 'pts';

	let canvas;
	let darkBlue = 'rgba(8, 60, 100, 1.0)';

	onMount(async () => {
		let space = new CanvasSpace('#sketch');
		space.setup({
			bgcolor: 'rgba(28,164,252,0.01)',
			resize: true
		});

		let form = space.getForm();
		let id, data;
		space.add({
			start: () => {
				id = Circle.fromCenter([100, 100], 60);
				data = Rectangle.fromCenter([400, 100], 100, 100);
			},
			animate: () => {
				form.strokeOnly(darkBlue, 5).line([Rectangle.center(data), id[0]]);
				form.fillOnly(darkBlue).circle(id);
				form.fillOnly(darkBlue).rect(data);
				form.fontWidthEstimate(false);

				let idBound = Geom.boundingBox(id);
				let dataBound = Geom.boundingBox(data);
				form.fillOnly('#fff').textBox(idBound, 'Identifier', 'center');
				form.fillOnly('#fff').textBox(dataBound, 'Data', 'center');
			}
		});
		space.bindMouse().bindTouch().play();
	});
</script>

<div class="container">
	<canvas id="sketch" bind:this={canvas} />
</div>

<div class="controls" />

<style>
	#sketch {
		width: 100%;
		display: inline-block;
	}

	.controls {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}
</style>
