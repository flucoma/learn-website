<script>
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import annotationPlugin from 'chartjs-plugin-annotation';
    import data from '../../../static/ref/noveltyslice/curve.json'
    const curve = data.curve;
    const peaks = data.peaks;
    let peaks_annotation = {}
    curve.map((x, i) => peaks.includes(i) ? x : 0);
    peaks.forEach((x, i) => {
        peaks_annotation[String(i)] = {
            type: 'line',
            yMin: 0, 
            yMax: 1,
            xMin: x, 
            xMax: x,
            borderColor: 'red',
            borderWidth: 4
        }
    })

    console.log(peaks_annotation)
    let chart, ctx, canvas

    onMount(async () => {
        if ('ResizeObserver' in window === false) {
            const module = await import('@juggle/resize-observer');
            window.ResizeObserver = module.ResizeObserver;
        }
        // Chart
        Chart.register(...registerables);
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
                animation: { duration: 100 }
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
                        annotations: peaks_annotation
                    }
                },
                animation: { duration: 100 },
                datasets: {
                    line: { pointRadius: 3 }
                },
                normalized: true,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: true,
                        type: 'linear',
                        min: 0,
                        max: curve.length
                    },
                    y: {display: false}
                }
            }
        });
        console.log(chart)
    });
</script>

<div class="container">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    canvas {
        width: 100%;
        max-height: 280px;
    }
</style>

