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

    // Samples
    let sampler,
        samplerReady = false;
    
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
        },
        'sampler' : () => {
            sampler.connect(output)
            activeNode=sampler;
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

        sampler = new Tone.Player();
        sampler.loop = true;
        
        // Some Init
        activeNode = osc;
    });
    
    onDestroy(async() => {
        // Stop Tone nodes and destroy the context
        if (osc) osc.stop();
        if (noise) noise.stop();
        if (loCluster) loCluster.stop();
        if (hiCluster) hiCluster.stop();
        if (sampler) sampler.stop();
        // Close the audio context
        if (audioContext) audioContext.close();
    });
    
    let sourceType = 'osc';
    $: if (activeNode) patch(sourceType)
</script>

<div class="controls">
    <form>
        <fieldset id="source-selector">
            <legend>Source</legend>
            <label>
                <input type=radio bind:group={sourceType} value={'osc'}> Oscillator
            </label>
            
            <label>
                <input type=radio bind:group={sourceType} value={'noise'}> Noise
            </label>
            
            <label>
                <input type=radio bind:group={sourceType} value={'cluster'}> Sine Cluster
            </label>
            
            <label>
                <input type=radio bind:group={sourceType} value={'noisefilter'}> Noise Filter
            </label>

            <label>
                <input type=radio bind:group={sourceType} value={'sampler'}> Sampler
            </label>
        </fieldset>
    </form>
    
    <div id="source-parameters">
        
        {#if (activeNode === sampler)}
        <div class='samples'>
            <button on:click={ async() => {
                sampler.load('/audio/oboe-m.mp3')
                .then(() => sampler.start());
            }
            }> 
                oboe
            </button>
            <button on:click={ async() => {
                sampler.load('/audio/bass-m.mp3')
                .then(() => sampler.start());
            }
            }> 
                bass
            </button>
            <button on:click={ async() => {
                sampler.load('/audio/piano-m.mp3')
                .then(() => sampler.start());
            }
            }> 
                piano
            </button>
            <button on:click={ async() => {
                sampler.load('/audio/Tremblay-AaS-VoiceQC-B2K.mp3')
                .then(() => sampler.start());
            }
            }> 
                voice
            </button>
        </div>
        {/if}
        
        {#if (activeNode === osc)}
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
        {/if}
        
        {#if (activeNode === cluster)}
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
        {/if}
        
        {#if (activeNode === cluster)}
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
        {/if}
        
        {#if (activeNode === filteredNoise)}
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
        {/if}
        
        {#if (activeNode === noise)}
        <form>
            <fieldset>
                <legend>Source Options</legend>
                <label>
                    <input type=radio bind:group={noiseGroup} value={0}> Pink
                </label>
                
                <label>
                    <input type=radio bind:group={noiseGroup} value={1}> White
                </label>
            </fieldset>
        </form>
        {/if}
        
    </div>
</div>


<style>
    .controls {
        display: grid;
        grid-template-columns: auto auto;
        gap: 1em;
    }
    #source-selector {
        display: flex;
        flex-direction: column;
        max-width: max-content;
    }
    
    #source-parameters {
        display: flex;
        flex-direction: column;
    }

    .samples {
        display: flex;
        flex-direction: column;
        padding-top: 1em;
    }
</style>