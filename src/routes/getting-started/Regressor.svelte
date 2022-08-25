<script>
	export let width = 200;
	export let height = 200;
	
	const xpos = [0.025, 0.5, 0.975, 0.1, 0.25, 0.685, 0.025];
	const ypos = [0.25, 0.975, 0.5575, 0.025, 0.225, 0.015, 0.25];
	
	$: randomcx = xpos.map(x => x * width).join(';');
	$: randomcy = ypos.map(x => x * height).join(';');
	
	const heights = [
		[0.1, 0.3, 0.5, 0.5, 0.5, 0.5, 0.1],
		[0.4, 0.5, 0.7, 0.2, 0.6, 0.02, 0.4],
		[0.5, 0.9, 0.1, 0.2, 0.3, 0.1, 0.5],
		[0.9, 0.8, 0.8, 0.8, 0.3, 0.1, 0.9]
	]
</script>

<a class="container interactive tile" href='/learn/regression-neural-network'>
	<div class="text">
	<h3>Controlling a Synth Using a Neural Network</h3>
		<p>Train a neural network to learn a mapping betweeen two (or more) data spaces</p>
	</div>
	<div class="interactives">
		<svg class='chaos-pad' width={width} height={height}>
			<circle cx=200 cy=200 r=10>
				<animate 
				attributeName='cx'
				from='200'
				to='200'
				begin='0s'
				dur='8s'
				values={randomcx} 
				keySplines="
				0.1 0.8 0.2 1;
				0.2 0.5 0.2 1;
				0.2 0.5 0.2 1;
				0.2 0.5 0.2 1;
				0.2 0.5 0.2 1;
				0.1 0.8 0.2 1"
				keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" 
				calcMode="spline"
				repeatCount='indefinite'
				/>
				<animate 
				attributeName='cy'
				from='200'
				to='200'
				begin='0s'
				dur='8s'
				values={randomcy} 
				keySplines="
				0.1 0.8 0.2 1;
				0.2 0.5 0.2 1;
				0.2 0.5 0.2 1;
				0.2 0.5 0.2 1;
				0.2 0.5 0.2 1;
				0.1 0.8 0.2 1"
				keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" 
				calcMode="spline"
				repeatCount='indefinite'
				/>
			</circle>
		</svg>
		
		<svg class='multislider' width={width} height={height}>
			{#each heights as h, i}
			<rect class={'slider-'+i} width={width/4} height={height} x={width/4 * i}>
				<animate 
				attributeName='height'
				from='200'
				to='200'
				begin='0s'
				dur='8s'
				values={heights[i].map(x => x * height).join(';')}
				keySplines="
				0.1 0.8 0.2 1;
				0.2 0.5 0.2 1;
				0.2 0.5 0.2 1;
				0.2 0.5 0.2 1;
				0.2 0.5 0.2 1;
				0.1 0.8 0.2 1"
				keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" 
				calcMode="spline"
				repeatCount='indefinite'
				/>
			</rect>
			{/each}
		</svg>
	</div>
</a>

<style>
	.container {
		display: grid;
		grid-template-rows: repeat(2, auto);
	}

	.interactives {
		display: grid;
		grid-template-columns: repeat(2, auto);
		gap:0;
	}
	.chaos-pad {
		background-color: rgb(207, 207, 207);
	}
	.chaos-pad > circle {
		fill: none;
		stroke: black;
		stroke-width: 4px;
	}
	.multislider {
		transform: rotate(180deg);
	}
	.slider-0 {
		fill: rgba(230, 25, 75, 0.5);
	}
	.slider-1 {
		fill: rgba(60, 180, 75, 0.5);
	}
	.slider-2 {
		fill: rgba(128, 0, 0, 0.5);
	}
	.slider-3 {
		fill: rgba(0, 130, 200, 0.5);
	}
</style>
