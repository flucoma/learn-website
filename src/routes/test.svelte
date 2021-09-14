<script>
    import * as Plot from '@observablehq/plot';
    import { onMount } from 'svelte';

    let data;
    let container;
    onMount(async() => {
        
        await fetch('/drum.csv')
            .then(response => response.text())
            .then(d => data=d.split('\n'))

        data.forEach((d, i) => {
            data[i] = [i, parseFloat(d.replace(/(\r\n|\n|\r)/gm, ""))]
        }) 


        console.log(data)
        let p = Plot.plot({
            marks: [
                Plot.line(data)
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