<script>
	export let width = 200;
	export let height = 200;

	const r = 20
</script>

<a class="container interactive tile" href='/learn/classification-neural-network'>
	<div class="text">
		<h2>Classification with a Neural Network</h2>
		<p>Train a neural network to identify sounds based on audio-descriptor data</p>
	</div>
	
	<svg width={width} height={height}>
		<!-- Input Layer -->
		<circle cx={30} cy={height/2} r={r}></circle>
		<line x1=30 x2=135 y1={height/2} y2=20></line>
		<line x1=30 x2=135 y1={height/2} y2=70></line>
		<line x1=30 x2=135 y1={height/2} y2=120></line>

		<!-- Hidden Layer -->
		<circle cx=135 cy=20 r={r}></circle>
		<circle cx=135 cy=70 r={r}></circle>
		<circle cx=135 cy=120 r={r}></circle>

		<line x1=30 x2=135 y1={height/2} y2=20></line>
		<line x1=30 x2=135 y1={height/2} y2=70></line>
		<line x1=30 x2=135 y1={height/2} y2=120></line>

		<!-- Output Layer -->
		<circle cx=250 cy=45 r={r}></circle>
		<circle cx=250 cy=95 r={r}></circle>
	</svg>
</a>

<style>
	.container {
		display: grid;
		grid-template-rows: repeat(2, auto);
	}

	line {
		stroke-width: 2px;
		stroke: black;
	}
</style>


