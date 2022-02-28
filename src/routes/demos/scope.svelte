<script>
    import Spectroscope from '$lib/components/Spectroscope.svelte';

    function generateSpectrum() {
        return new Array(1000).fill(0.0).map(x => Math.random())
    }

    let height;
    let randomSpectrum = generateSpectrum();
</script>

<!-- Some toyish ways of updating the data inside the spectrogram interactively -->

<!-- Modifying the height as you see fit. Can also just pass a static CSS compatible variable ('100%', '200px') -->
<input type="range" min={100} max={1000} bind:value={height} />

<!-- Updating the spectrum data -->
<button on:click={() => { randomSpectrum = generateSpectrum() }}>
    update spectrum data whenever you want and it will automatically update in the view
</button>


<!-- The actual component -->
<Spectroscope
spectrum={randomSpectrum}
height={`${height}px`}
/>