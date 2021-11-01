<script>

    let dataset = [
        { 'point1' : new Array(30).fill(0.3) },
        { 'point2' : new Array(30).fill(0.1) }
    ]

    function sanitiseData(data) {
        return data.length <= 10 ? data.push('...') : data.slice(0, 10)
    }
</script>

<div class="table">
    <div class="heading">Identifier</div>
    <div class="heading">Data</div>
    {#each dataset as point}
    {#each Object.entries(point) as [id, data]}
        <div class='entry'>{id}</div>
        <div class='entry'>{ sanitiseData(data) }</div>
    {/each}
    {/each}
</div>

<style lang='scss'>
    .table {
        display: grid;
        grid-template-columns: auto auto;
        width: min(20ch, 100%);
        // width: min(20ch, 100%);
        font-family: $mono;
        column-gap: 1em;
        margin: 0 auto;
    }


    .heading {
        font-weight: bold;
    }

    .entry {
        color: grey;
        text-align: left;
    }
</style>