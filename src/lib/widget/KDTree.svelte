<!-- 
    Refer to:
    https://ptsjs.org/guide/op-0400
 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { CanvasSpace, Create, GroupLike, Circle } from 'pts';
	import Slider from '$lib/components/Slider.svelte';
	import Button from '$lib/components/Button.svelte';

	const NUM_POINTS = 120;

	let canvas;
	let pts: GroupLike = [];
	let mouse: Array<number> = [];
	let numNeighbours: number = 30;
	$: calcNeighbours = numNeighbours === 0 ? NUM_POINTS : numNeighbours;
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
				pts = Create.distributeRandom(space.innerBound, NUM_POINTS);
			},
			animate: (time, ftime, space) => {
				let circle: GroupLike = Circle.fromCenter(mouse, radius * space.size.y);
				form.fillOnly(darkBlue).circle(circle);
				if (fit) {
					pts.sort((a, b) => a.$subtract(mouse).magnitude() - b.$subtract(mouse).magnitude());
					form.fillOnly('#123').points(pts, 3, 'circle');
					// Draw bigger on top of points
					for (let i = 0; i < calcNeighbours; i++) {
						form.strokeOnly('rgba(8,60,100,0.8)', 2).line([pts[i], mouse]);

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
	<Slider bind:value={numNeighbours} min="0" max="50" step="1" title="Number of Neighbours" />
	<Slider bind:value={radius} min="0.0" max="1.0" step="0.01" title="Radius" />
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
