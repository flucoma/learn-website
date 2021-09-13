<script>
    import * as Plot from '@observablehq/plot';
    import { onMount } from 'svelte';
    let fakeData = new Array(100).fill(
        new Array(2)
    );

    fakeData.forEach((d, i) => {
        const x = (Math.random() * 2) - 1
        const y = (Math.random() * 2) - 1
        const point = [x, y];
        fakeData[i] = point;
    })
    console.log(fakeData)

    let container;
    onMount(async() => { 
        let p = Plot.plot({
            x : {
                domain: [-1, 1],
            },
            y : {
                domain: [-1, 1]
            },
            marks: [
                Plot.dot(fakeData)
            ],
            style: { 
                background: "white",
                color: "rgb(3,113,181)"
            }
        });

        container.append(p);
    })
</script>

<div class='container' bind:this={container}></div>

<style>
    .container {
        font-family: sans-serif;
        font-size: 11px;
    }
</style>