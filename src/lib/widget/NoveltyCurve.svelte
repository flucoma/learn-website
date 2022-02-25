<script>
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import data from '../../../static/data/novelty_curve.json'
    let curve = data.curve;

    console.log(curve.length)


    let chart, ctx, canvas

    onMount(async () => {
        if ('ResizeObserver' in window === false) {
            const module = await import('@juggle/resize-observer');
            window.ResizeObserver = module.ResizeObserver;
            console.log('using polyfill')
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
                // cubicInterpolationMode: 'monotone',
                // tension: 0.1,
                pointRadius: 0,
                animation: { duration: 100 }
            }
            ]
        };
        chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false,
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
                        ticks: {
                            autoSkip: true,
                            callback: (value) => {
                                return value
                            },
                            autoSkipPadding: 14
                        },
                        display: true,
                        type: 'linear',
                        min: 0,
                        max: curve.length
                    },
                    y: {display: false}
                }
            }
        });
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

