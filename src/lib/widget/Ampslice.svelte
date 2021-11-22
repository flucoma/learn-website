<script>
    import { WebglPlot, WebglLine, ColorRGBA } from 'webgl-plot';
    import * as Tone from 'tone';
    import smooth from 'array-smooth';
    import { onMount } from 'svelte';
    import Button from '$lib/components/Button.svelte';

    // Audio
    let player; // <audio>
    let features = new Array();
    let meter, bassPlayer, pianoPlayer, drumPlayer;
    let waveform;
    let peaksInstance;
    let ctxStarted = false;
    // Canvas
    let canvas, pixelRatio;
    let ready = false;
    
    onMount(async() => {
        // Tone.js setup
        meter = new Tone.Meter({ normalRange: true });
        bassPlayer = new Tone.Player({ loop: true, url: '/audio/bass-m.mp3' }).toDestination();
        pianoPlayer = new Tone.Player({ loop: true, url: '/audio/piano-m.mp3'}).toDestination();
        drumPlayer = new Tone.Player({ loop: true, url: '/audio/drum-m.mp3' }).toDestination();
        bassPlayer.connect(meter); pianoPlayer.connect(meter); drumPlayer.connect(meter);

        Tone.loaded()
        .then(() => {
            console.log('loaded!')
            ready = true;
        })

        // webgl setup
        pixelRatio = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * pixelRatio;
        canvas.height = 300 * pixelRatio;
        features = new Array(canvas.width).fill(0.0);
    });

    const updateWaveform = (choice) => {
        if (choice === 'drum') {
            bassPlayer.stop();
            pianoPlayer.stop();
            drumPlayer.start();
        }
        else if (choice === 'bass') {
            bassPlayer.start();
            pianoPlayer.stop();
            drumPlayer.stop();
        }
        else {
            bassPlayer.stop();
            pianoPlayer.start();
            drumPlayer.stop();
        }

        if (!ctxStarted) {
            setInterval(() => {
                features.shift(); features.push(meter.getValue());
            }, 0.1)
            ctxStarted = true;

            // web-gl plot
            const numX = canvas.width;
            const color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
            const color2 = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
            const line = new WebglLine(color2, numX);
            const smoothedLine = new WebglLine(color, numX)
            const wglp = new WebglPlot(canvas);

            line.arrangeX();
            smoothedLine.arrangeX();

            wglp.addLine(line);
            wglp.addLine(smoothedLine);

            function newFrame() {
                // let t = smooth(features, 0.0)
                let t = features;
                let tSmooth = smooth(features, 100);

                for (let i=0; i<t.length; i++) {
                    line.setY(i, t[i] * 2 - 0.5);
                    smoothedLine.setY(i, tSmooth[i] * 2 - 0.5)
                }
                wglp.update();
                requestAnimationFrame(newFrame);
            }
            newFrame();
        }
    };
</script>

<canvas id='vis' bind:this={ canvas } class:hidden={!ready} />

<div class='controls'>
    <div class="sound-select">
        <Button 
        label='Bass 🎸'
        on:click={ () => { updateWaveform('bass') }}
        />

        <Button 
        label='Piano 🎹'
        on:click={ () => { updateWaveform('piano') }}
        />

        <Button 
        label='Drum 🥁'
        on:click={ () => { updateWaveform('drum') }}
        />
    </div>
</div>

<style>
    .hidden {
        visibility: hidden;
    }
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

    #vis {
        width: 99% !important;
        min-width: 0 !important;
        max-height: 400px;
        margin: 0 auto;
        border: 1px solid rgb(230, 230, 230);
    }
</style>
