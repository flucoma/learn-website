<script>
	import { createEventDispatcher } from 'svelte';

	export let playing = false;
	
	const dispatch = createEventDispatcher();

	function clickHandler() {
		playing=!playing;
		if (playing) {
			fwdPlay()
		} else {
			fwdStop()
		}
	}

	function fwdPlay() {
		dispatch('play')
	}
	
	function fwdStop() {
		dispatch('stop')
	}

	$: points = playing ? 
		'15 15, 15 35, 35 35, 35 15' : 
		'15 15, 35 25, 15 35';
</script>

<svg width=50 height=50 on:click={ clickHandler }>
	<circle cx=25 cy=25 r=25></circle>
	<polygon points={points}></polygon>
</svg>

<style>
	svg {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-o-user-select: none;
		user-select: none;
		background-color: white;
	}

	svg:active > polygon {
		fill: white;
	}

	svg:active > circle {
		fill: rgb(150, 150, 150);
	}

	circle {
		fill: rgb(218, 218, 218);
	}
</style>