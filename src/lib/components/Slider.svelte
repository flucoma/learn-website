<script>
import { escape_attribute_value } from 'svelte/internal';


    export let value;
    export let min= "0";
    export let max = "100";
    export let title = "";
    export let step = "any";
    export let inFunc;
    export let chFunc;
</script>

<div class='container'>
    <div class="label">
        <span class="text title">{title}: {value}</span>     
    </div>

    <div class='slider'>
        <span class="text min">{min}</span>
        <input class="slider" type="range" min={min} max={max} step={step} bind:value={value} on:input={inFunc} on:change={chFunc} />
        <span class="text max">{max}</span>
    </div>
</div>


<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: left;
    }
    
    .slider {
        display: flex;
        flex-direction: row;
    }

    .label {
        display: flex;
        flex-direction: row;
    }

    .title {
        text-align: center;
    }
    
    .text {
        font-size: 10px;
        color: grey;
    }
    .min {
        text-align: right;
        padding-right: 2px;
    }
    .max {
        text-align: left;
        padding-left: 2px;
    }
</style>