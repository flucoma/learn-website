<script>
    import * as Tone from 'tone';
    import { onMount, onDestroy } from 'svelte';
    import { logslider } from '$lib/utils';
    
    export let audioContext;
    export let output;
    
    let activeNode;
    
    // Oscillator
    let osc,
        oscFreq,
        oscPos = 500;

    $: oscFreq = logslider(oscPos, 0, 1000, 20, 20000);
    $: if (osc) osc.set({ frequency: oscFreq });

    // Noise
    let noise,
        noiseType = "pink",
        noiseGroup = 0;
    $: noiseType = noiseGroup === 0 ? "pink" : "white";
    $: { if (noise) noise.set({ type: noiseType }) };

    // Oscillator Cluster
    let cluster, 
        loCluster, hiCluster, 
        loClusterFreq, hiClusterFreq,
        loClusterPos = 500, hiClusterPos = 600;
    
    $: loClusterFreq = logslider(loClusterPos, 0, 1000, 20, 20000);
    $: hiClusterFreq = logslider(hiClusterPos, 0, 1000, 20, 20000);
    $: { if (loCluster) loCluster.set({ frequency: loClusterFreq }) };
    $: { if (hiCluster) hiCluster.set({ frequency: hiClusterFreq }) };

    // Filtered Noise
    let filteredNoise,
        filteredNoiseSource,
        filter,
        filterFreq,
        filterPos = 500;
    $: filterFreq = logslider(filterPos, 0, 1000, 20, 20000);
    $: { if (filter) filter.set({ frequency: filterFreq })};

    const patchBay = {
        'osc' : () => { 
            osc.connect(output); 
            activeNode=osc; 
        },
        'noise' : () => {
            noise.connect(output); 
            activeNode=noise;
        },
        'cluster' : () => {
            cluster.connect(output);
            activeNode=cluster;
        },
        'noisefilter' : () => {
            filteredNoise.connect(output);
            activeNode=filteredNoise;
        }
    };
    
    export function patch(node) {
        activeNode.disconnect();
        patchBay[node]();
    }
    
    onMount(async() => {
        audioContext = new (AudioContext || webkitAudioContext)();
        Tone.setContext(audioContext);
        output = new Tone.Gain(-24, "decibels").toDestination();
        
        // Sources
        osc = new Tone.Oscillator(oscFreq, "sine").start();
        noise = new Tone.Noise("pink").start();
        cluster = new Tone.Gain(0.5);
        loCluster = new Tone.Oscillator(loClusterFreq, "sine")
            .connect(cluster).start();
        hiCluster = new Tone.Oscillator(hiClusterFreq, "sine")
            .connect(cluster).start();
        
        filteredNoise = new Tone.Gain(1.0);
        filter = new Tone.Filter(filterFreq, "bandpass").connect(filteredNoise);
        filter.set({ Q: 30 });
        filteredNoiseSource = new Tone.Noise("white")
            .connect(filter).start();
        
        // Some Init
        activeNode = osc;
    });

    onDestroy(async() => {
        // Stop Tone nodes and destroy the context
        if (osc) osc.stop();
        if (noise) noise.stop();
        if (loCluster) loCluster.stop();
        if (hiCluster) hiCluster.stop();
        // Close the audio context
        if (audioContext) audioContext.close();
    });
</script>

<button on:click={ () => {patch('osc')} }>osc</button>
<button on:click={ () => {patch('noise')} }>noise</button>
<button on:click={ () => {patch('cluster')} }>cluster</button>
<button on:click={ () => {patch('noisefilter')} }>cluster</button>

<label for="oscpos">
    oscillator frequency
    <input 
    id="oscpos"
    type="range" 
    bind:value={oscPos} 
    min={0} max={1000}
    >
    {oscFreq.toFixed(0)}
</label>

<label for="lowclusterpos">
    low oscillator frequency
    <input 
    id="lowclusterpos"
    type="range" 
    bind:value={loClusterPos} 
    min={0} max={1000}
    >
    {loClusterFreq.toFixed(0)}
</label>

<label for="highclusterpos">
    high oscillator frequency
    <input 
    id="highclusterpos"
    type="range" 
    bind:value={hiClusterPos} 
    min={0} max={1000}
    >
    {hiClusterFreq.toFixed(0)}
</label>

<label for="filterfreq">
    filter frequency
    <input 
    id="filterfreq"
    type="range" 
    bind:value={filterPos} 
    min={0} max={1000}
    >
    {filterFreq.toFixed(0)}
</label>

<label>
    <input type=radio bind:group={noiseGroup} value={0}> Pink
</label>

<label>
    <input type=radio bind:group={noiseGroup} value={1}> White
</label>
