<script>
    import * as _ from 'lodash';
    import * as d3 from 'd3';
    import { Slider } from '$lib/components/multislider/multislider';

    const accent = d3.scaleOrdinal(d3.schemeAccent);

    let value = 1;
    let values = new Array(10).fill(0).map(x => Math.random())
    let colorPool = [
        'blue', 'cyan', 'red', 'green', 'yellow',
    ]
</script>

<h2>A single slider</h2>
{ value }

<Slider 
bind:value={value}
min={0}
max={9}
steps={10}
/>

<h2>Composing multiple sliders together</h2>

<div class="row">
    {#each values as x, i}
    <div class="col">
        {x.toFixed(1)}
        <Slider 
        bind:value={values[i]}
        min={0}
        max={6}
        steps={10000}
        height={'100%'}
        color={accent(i)}
        />
    </div>
    {/each}
</div>

<style>
    .row {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        height: 200px;
    }

    .col {
        display: grid;
        grid-template-rows: max-content auto;
        place-items: center;
    }
</style>