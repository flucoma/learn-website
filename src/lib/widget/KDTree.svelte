<!-- 
    Refer to:
    https://ptsjs.org/guide/op-0400
 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { CanvasSpace, Create, GroupLike, Circle } from 'pts';
	import Slider from '$lib/components/Slider.svelte';
	import Button from '$lib/components/Button.svelte';

	let canvas;
	let pts: GroupLike = [];
	let data: Array<number> = [];
	let mouse: Array<number> = [];
	let numNeighbours: number = 1;
	let fit: boolean = false;
	let rect;
	let radius: number = 0.0;

	function getMousePos(canvas, evt) {
		// We need to do this manually otherwise when shifting the window the resize is not accounted for.
		rect = canvas.getBoundingClientRect();
		return [evt.clientX - rect.left, evt.clientY - rect.top];
	}

	onMount(async () => {
		let space = new CanvasSpace('#sketch');
		let darkBlue = 'rgba(8, 60, 100,0.5)';
		space.setup({
			bgcolor: 'rgba(28,164,252,0.01)',
			resize: true
		});

		let form = space.getForm();
		rect = canvas.getBoundingClientRect();
		space.add({
			start: () => {
				// Generate a random space of two-dimensional points between 0.0 and 1.0;
				pts = Create.distributeRandom(space.innerBound, 120);
			},
			animate: (time, ftime, space) => {
				// if (radius > 0.0) {
				let circle: GroupLike = Circle.fromCenter(space.pointer, radius * space.size.y);
				form.fillOnly(darkBlue).circle(circle);
				// }
				if (fit) {
					form.fillOnly('#123').points(pts, 3, 'circle');

					pts.sort((a, b) => a.$subtract(mouse).magnitude() - b.$subtract(mouse).magnitude());

					// Draw bigger on top of points
					for (let i = 0; i < numNeighbours; i++) {
						form.strokeOnly('#0d47a1', 2).line([pts[i], mouse]);

						if (radius > 0.0) {
							if (Circle.withinBound(circle, pts[i])) {
								form.fill('#f03').point(pts[i], 7, 'square');
							}
						} else {
							form.fill('#f03').point(pts[i], 7, 'square');
						}
					}
				} else {
					form.fillOnly('#787878').points(pts, 3, 'circle');
				}
			},
			action: (t, x, y, e) => {
				mouse = getMousePos(canvas, e);
			}
		});
		space.bindMouse().bindTouch().play();
	});
</script>

<div class="container">
	<Button
		on:click={() => {
			fit = true;
		}}
		disabled={fit}
		label={fit ? 'Already Fitted' : 'Fit'}
		width="100%"
	/>
	<canvas id="sketch" bind:this={canvas} />
</div>

<div class="controls">
	<Slider bind:value={numNeighbours} min={1} max={50} title="Number of Neighbours" step={1} />
	<Slider bind:value={radius} min={0.0} max={1.0} title="Radius" step={0.01} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
	#sketch {
		width: 100%;
		display: inline-block;
	}

	.controls {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1em;
	}
</style>
