<script>
    import * as Tone from 'tone';
    import { onMount } from 'svelte';
    
    export let audioContext;
    export let output;
    
    let osc, noise, activeNode;
    
    let pos = 500;
    let freq;
    $: {
        freq = logslider(pos)
        if (osc) {
            osc.set({ frequency: freq })
        } 
    }
    
    const patchBay = {
        'osc' : () => { 
            osc.connect(output); 
            activeNode=osc; 
        },
        'noise' : () => {
            noise.connect(output); 
            activeNode=noise;
        }
    };
    
    function patch(node) {
        activeNode.disconnect();
        patchBay[node]();
    }
    
    function logslider(position) {
        // position will be between 0 and 100
        var minp = 0;
        var maxp = 1000;
        
        // The result should be between 100 an 10000000
        var minv = Math.log(20);
        var maxv = Math.log(20000);
        
        // calculate adjustment factor
        var scale = (maxv-minv) / (maxp-minp);
        
        return Math.exp(minv + scale*(position-minp));
    }
    
    onMount(async() => {
        audioContext = new (AudioContext || webkitAudioContext)();
        Tone.setContext(audioContext);
        output = new Tone.Gain(1.0).toDestination();
        
        // Different sources
        osc = new Tone.Oscillator(freq, "sine").connect(output).start();
        noise = new Tone.Noise("pink").start();
        
        // Some initialisation
        activeNode = osc;
    })
</script>

<button on:click={ () => {patch('osc')} }>osc</button>
<button on:click={ () => {patch('noise')} }>noise</button>

<input 
type="range" 
bind:value={pos} 
min={0} max={1000}
>
{freq.toFixed(0)}
