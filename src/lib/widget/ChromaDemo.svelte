<script>
    import { onMount } from 'svelte';
    import * as Meyda from 'meyda';
    import { Chart } from 'chart.js';
    import Button from '$lib/components/Button.svelte';

    // Audio
    let player;
    let ready = false;
    let features = new Array(12).fill(0.0);
    let maxPitch;
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
        ctx = canvas.getContext('2d');
        const labels = ['C','C#','D','D#','E','F','G','G#','A','A#','B','C']
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
        console.log(analyser)

        analyser.start();
        ready = true;
    })
</script>

<canvas bind:this={ canvas } />

<div class='controls'>
    <div class="sound-select">
        <Button 
        label='Bass 🎸'
        on:click={ () => {
            player.src = '/audio/bass-m.mp3';
            player.play();
            }}
        />

        <Button 
        label='Piano 🎹'
        on:click={ () => {
            player.src = '/audio/piano-m.mp3';
            player.play();
            }}
        />

        <Button 
        label='Oboe 🎷'
        on:click={ () => {
            player.src = '/audio/oboe-m.mp3';
            player.play();
            }}
        />

        <Button 
        label='Trombone 🎺'
        on:click={ () => {
            player.src = '/audio/trombone-m.mp3';
            player.play();
            }}
        />
    </div>

    <div class="smoothing">

        <span>Smoothing: {smoothing} frames</span> 
        <input type='range'
        min=50
        max=1000
        bind:value={smoothing}
        on:input={ () => chart.options.animation.duration = smoothing }
        />

        <audio controls loop 
        bind:this={player} 
        src='/audio/bass-m.mp3'
        crossorigin='anonymous'
        class:hidden={!ready}
        />
    </div>


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
        gap: 0.5em;
    }

    .smoothing {
        display: grid;
        place-items: center;
        width: 100%;
        gap: 1em;
    }

    .smoothing > span {
        white-space: nowrap;
    }

    .smoothing > input {
        width: 60%
    }


    canvas {
        width: 100%;
        height: 300px;
    }
</style>
