<script lang="ts">
    export let data = [];
    function sanitiseData(data) {
        return data.map(d => d.toFixed(2))
        return data.length <= 10 ? data.push('...') : data.slice(0, 10)
    }
</script>

<div class="table">
    <div class="heading">Identifier</div>
    <div class="heading">Data</div>
    {#each data as point}
    {#each Object.entries(point) as [id, data]}
        <div class='entry'>{ id }</div>
        <div class='entry'>{ sanitiseData(data) }</div>
    {/each}
    {/each}
</div>

<style lang='scss'>
    .table {
        display: grid;
        grid-template-columns: auto auto;
        width: min(20ch, 100%);
        font-family: $mono;
        gap: 1em;
        padding-top: 1em;
    }

    .heading {
        font-weight: bold;
    }

    .entry {
        color: grey;
        text-align: left;
    }
</style>