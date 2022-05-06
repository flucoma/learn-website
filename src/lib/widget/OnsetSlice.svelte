<script>
    import { onMount } from 'svelte';
    import { fromArrayBuffer } from 'numpy-parser';
    import { Chart, registerables } from 'chart.js';
    import { pairwise, scale } from '$lib/util';
    import annotationPlugin from 'chartjs-plugin-annotation';
    
    let canvas, ctx, chart;
    let curve = [0, 0];
    let threshold = 0.5;
    let annotation = {};
    $: {
        annotation = {
            "threshold" : {
                type : 'line',
                yMin: threshold, yMax: threshold,
                borderColor : 'rgba(255, 99, 132, 0.5)'
            }
        }

        const peaks = [];

        pairwise(curve, (prev, curr, i) => {
            if (curr > threshold && prev < threshold) {
                peaks.push(i)
            }
        })

        peaks.forEach((x, i) => {
            annotation[`peaks${i}`] = {
                type: 'line',
                xMin: x, xMax: x,
                borderColor: 'rgba(0, 0, 255, 0.65)'
            }
        })
        
        if (chart) {
            chart.options.plugins.annotation.annotations = annotation
            chart.update()
        }
    }
    
    onMount(async() => {
        const res = await fetch('/ref/onsetslice/delta-curve.npy');
        const arr = await res.arrayBuffer();
        const raw = await fromArrayBuffer(arr);
        curve = raw.data;
        const imins = [ Math.min(...curve), Math.max(...curve) ]; 
        curve = raw.data.map(x => scale(x, imins, [0, 1]));

        if ('ResizeObserver' in window === false) {
            const module = await import('@juggle/resize-observer');
            window.ResizeObserver = module.ResizeObserver;
        }
        // Chart
        Chart.register(...registerables, annotationPlugin);
        ctx = canvas.getContext('2d');
        const data = {
            labels: curve.map((x, i) => i),
            datasets: [
            {
                data: curve,
                borderColor: 'black',
                borderWidth: 1,
                cubicInterpolationMode: 'monotone',
                tension: 1,
                pointRadius: 0,
                animation: { duration: 0 }
            },
            ]
        };
        chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                    annotation: {
                        animations: false,
                        annotations: annotation
                    }
                },
                animation: { duration: 1000 },
                datasets: {
                    line: { pointRadius: 3 }
                },
                normalized: true,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false,
                        min: 0,
                        max: curve.length
                    },
                    y: {
                        display: true,
                        min: 0,
                        max: Math.max(...curve)
                    }
                }
            }
        });
    })
    
</script>

<div class="container">
    <canvas bind:this={canvas}></canvas>

<form class="threshold">
    <label for='threshold'>Threshold</label>
    <div class="slider">
        <input id='threshold' type=range min=0 max=1 step=0.01 bind:value={threshold} />
        <div class="value">{ threshold.toFixed(2) }</div>
    </div>
</form>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        place-items: left;
        gap: 1em;
        margin-top: 1em;
        margin-bottom: 1em;
    }
    .threshold {
        display: flex;
        flex-direction: column;
        place-items: left;
        gap: 0.25em;
        font-size: 0.75rem;
    }
    .slider {
        display: grid;
        grid-template-columns: 200px 4ch;
        gap: 0.5em;
    }
    canvas {
        width: 100%;
        max-height: 280px;
    }
</style>