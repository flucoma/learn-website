<script>
    import DataSetView from '$lib/components/DataSetView.svelte';
    import { fly } from 'svelte/transition'
    import Button from '$lib/components/Button.svelte';

    const input = [
        {"one" : [1, 2, 3, 4]},
        {"two" : [2, 4, 30, 40]},
        {"three" : [0.01, 0.02, 0.03, 0.04]}
    ]

    let output = []

    let explanation = ''
    const btnWidth = '300px';
</script>

<div class="filter-control">
    <div class="filters">
        <Button 
        width={btnWidth}
        label='filter 0 < 3, addcolumn 0'
        on:click={ () => {
            output = [
                {"one" : [1]},
                {"two" : [2]},
                {"three" : [0.01]}
            ]
        
            explanation = 'Select all the identifiers where the 1st column is less than 3. Then return the first column of every identifier where this is satisfied.'
        }}
        />
        
        <Button 
        width={btnWidth}
        label='filter 0 < 3, addrange 0 2'
        on:click={ () => {
            output = [
                {"one" : [1, 2]},
                {"two" : [2, 4]},
                {"three" : [0.01, 0.02]}
            ]
        
            explanation = 'Select all the identifiers where the 1st column is less than 3. Then return the next 2 columns in range after the first of every identifier where this is satisfied.'
        }}
        />
        
        <Button
        width={btnWidth}
        label='filter 3 < 3, addcolumn 0, addcolumn 3' 
        on:click={ () => {
            output = [
                {"three" : [0.01, 0.04]}
            ]
            explanation = 'Select all the identifiers where the 4th column is less than 3. Then return the first and last columns of the every identifier where this is satisfied.'
        }}
        />
        
        <Button 
        width={btnWidth}
        label='filter 0 <= 2, addrange 0 2, addcolumn 3'
        on:click={ () => {
            output = [
                {"one" : [1, 2, 4]},
                {"two" : [2, 4, 40]},
                {"three" : [0.01, 0.02, 0.04]}
            ]
        
            explanation = 'Select all the identifiers where the 1st column is less than equal to 2. Then return the next 2 columns after the first (0) and the 4th column (3) for every identifier where this condition is satisified.'
        }}
        />
    </div>

    {#key explanation}
    <div class="explanation">
        { explanation }
    </div>
    {/key}
</div>

<div class='ds'>
    <DataSetView 
    data={input}
    />
    
    <DataSetView 
    data={output}
    />
</div>

<style>
    .ds {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
    }

    .filter-control {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        margin-bottom: 0.5em;
    }

    .filters {
        display: flex;
        flex-direction: column;
    }

    .explanation {
        font-style: italic;
    }
</style>