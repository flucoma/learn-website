<script>
	export let width = 200;
	export let height = 200;
	
	const r = 20
	
	let active = new Array(11).fill(false);
	
	let allSleeping = true;
	
	setInterval(() => {
		if (allSleeping) {
			active = active.map(x => Math.random() > 0.5)
			allSleeping = false;
		} else {
			active = new Array(11).fill(false);
			allSleeping = true;
		}
	}, 2000)
</script>

<a class="container interactive tile" href='/learn/classification-neural-network'>
	<div class="text">
		<h2>Classification with a Neural Network</h2>
		<p>Train a neural network to identify sounds based on audio-descriptor data</p>
	</div>
	
	<svg width={width} height={height}>
		<!-- Connections -->
		<line class:active={active[0]} x1=30 x2=135 y1={height/2} y2=20></line>
		<line class:active={active[1]} x1=30 x2=135 y1={height/2} y2=70></line>
		<line class:active={active[2]} x1=30 x2=135 y1={height/2} y2=120></line>
		
		<line class:active={active[3]} x1=135 x2=250 y1=20 y2=45></line>
		<line class:active={active[4]} x1=135 x2=250 y1=20 y2=95></line>
		
		<line class:active={active[5]} x1=135 x2=250 y1=70 y2=45></line>
		<line class:active={active[6]} x1=135 x2=250 y1=70 y2=95></line>
		
		<line class:active={active[7]} x1=135 x2=250 y1=120 y2=45></line>
		<line class:active={active[8]} x1=135 x2=250 y1=120 y2=95></line>
		<!-- Input Layer -->
		<circle cx={30} cy={height/2} r={r}></circle>
		
		<!-- Hidden Layer -->
		<circle cx=135 cy=20 r={r}></circle>
		<circle cx=135 cy=70 r={r}></circle>
		<circle cx=135 cy=120 r={r}></circle>
		
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
		stroke-width: 5px;
		stroke: black;
		transition: stroke 500ms cubic-bezier(0.895, 0.03, 0.685, 0.22);
		z-index: -100;
	}
	
	.active {
		stroke: var(--light-blue);
	}
</style>


