<script>
	let index = 127;

	/** @type {HTMLImageElement} */
	let spec;
	/** @type {HTMLImageElement} */
	let line;

	$: lineSrc = `/reference/mfcc/${index}-line.svg`;
	$: specSrc = `/reference/mfcc/${index}-spec.png`;

	const updateView = () => {
		spec.src = specSrc;
		line.src = lineSrc;
	};
</script>

{index} MFCCs

<input type="range" min="1" max="127" bind:value={index} on:change={updateView} class="slider" />

<div class="container">
	<img class="plot" src={specSrc} bind:this={spec} alt="MFCC-Spectrogram" />

	<img class="plot" src={lineSrc} bind:this={line} alt="MFCC-Line" />
</div>

<style>
	.slider {
		width: 100%;
	}

	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}

	.plot {
		width: 50%;
		height: 100%;
	}
</style>
