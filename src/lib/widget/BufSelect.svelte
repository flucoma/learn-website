<script>
    let w = 5;
    let h = 5;
    let indices = -1;
    let channels = -1;
</script>

<div class="controls">
    <div class="attr">
        Indices
        <input bind:value={indices} />
        <div class="error"></div>
    </div>

    <div class="attr">
        Columns
        <input bind:value={channels} />
    </div>
</div>

<div class="container">
    {#each {length: w} as _, row}
    <div class="row">
        { #each {length: h} as _, col}
        <div class='cell'>{row}{col}</div>
        {/each}
    </div>
    {/each}
</div>

<style lang='scss'>

.container {
    display: grid;
    grid-template-columns: repeat(5, auto);
    place-items: center stretch;
}

.row {
    
}

.cell {
    border: 1px solid rgb(201, 201, 201);
    width: 50px;
    height: 50px;
}

.select {
    background-color: black;
}

.controls {
    display: flex;
    flex-direction: column;
    width: 50%;

    input {
        padding: 1em;
        font-size: 1rem;
    }
}

</style>