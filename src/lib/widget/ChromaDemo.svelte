<script>
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import * as Meyda from 'meyda';
    import WaveSurfer from 'wavesurfer.js';
    import Button from '$lib/components/Button.svelte';

    // Audio
    let player;
    let ready = false;
    let features = new Array(12).fill(0.0);
    let maxPitch;
    let waveform, wavesurfer, playing;
    // Canvas
    let canvas;
    let ctx;
    let chart;
    // CODE CRIME 👮
    const colours = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f']

    // Control
    let smoothing = 50;

    onMount(async() => {
        // Chart
        Chart.register(...registerables);
        ctx = canvas.getContext('2d');
        const labels = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
        const data = {
            labels: labels,
            datasets: [
                {
                data: features,
                backgroundColor: colours,
                borderColor: colours,
                borderWidth: 1
                }
            ]
        }
        chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }},
                animation: {
                    duration: smoothing
                },
                scales: {
                    y: {
                        display: false,
                        // beginAtZero: true,
                        // min: 0, max: 1
                    }
                }
            }
        })

        // Analysis
        const audioContext = new (AudioContext || webkitAudioContext)();
        const source = audioContext.createMediaElementSource(player);
        source.connect(audioContext.destination);
        const analyser = Meyda.createMeydaAnalyzer({
            audioContext: audioContext,
            source: source,
            bufferSize: 2048,
            featureExtractors: ["chroma"],
            callback: (chroma) => {
                features = chroma.chroma;
                // features = features.map(f => f > 0.8 ? 1.0 : 0.0)
                chart.data.datasets[0].data = features;
                maxPitch = labels[
                    features.indexOf(Math.max(...features))
                ]
                chart.update();
            }
        });

        // Waveform
        wavesurfer = WaveSurfer.create({
            container: waveform,
            backend: 'MediaElement'
        });
        wavesurfer.load(player);


        analyser.start();
        ready = true;
    })
</script>

<canvas id='chroma-chart' bind:this={ canvas } />

<div class='controls'>
    <div class="sound-select">
        <Button 
        label='Bass 🎸'
        on:click={ () => {
            wavesurfer.load('/audio/bass-m.mp3');
            wavesurfer.play();
            playing = true;
            }}
        />

        <Button 
        label='Piano 🎹'
        on:click={ () => {
            wavesurfer.load('/audio/piano-m.mp3');
            wavesurfer.play();
            playing = true;
            }}
        />

        <Button 
        label='Oboe 🎷'
        on:click={ () => {
            wavesurfer.load('/audio/oboe-m.mp3');
            wavesurfer.play();
            playing = true;
            }}
        />

        <Button 
        label='Trombone 🎺'
        on:click={ () => {
            wavesurfer.load('/audio/trombone-m.mp3');
            wavesurfer.play();
            playing = true;
            }}
        />
    </div>

    <div bind:this={waveform} />

    <div class="smoothing">
        <span>Smoothing: {smoothing} frames</span> 
        <input type='range'
        min=50
        max=1000
        bind:value={smoothing}
        on:input={ () => chart.options.animation.duration = smoothing }
        />
        <Button 
        label={ playing === true ? 'Pause' : 'Play' }
        on:click={
            () => { 
                if (playing) {
                    wavesurfer.pause();
                    playing = false;
                } else {
                    wavesurfer.play()
                    playing = true;
                }
            }
        }
        />
    </div>

    <audio controls loop 
    bind:this={player} 
    src='/audio/bass-m.mp3'
    />
</div>

<style>
    .hidden { display: none }

    .controls {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .sound-select {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5em;
    }

    .smoothing {
        display: grid;
        place-items: center;
        gap: 0.3em;
    }

    .smoothing > span {
        white-space: nowrap;
    }

    .smoothing > input {
        width: 60%
    }

    #chroma-chart {
        width: 99% !important;
        min-width: 0 !important;
        max-height: 200px;
        margin: 0 auto;
    }
</style>
