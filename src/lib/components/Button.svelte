<script>
    import { createEventDispatcher } from 'svelte';
    export let label = 'button';

    const dispatch = createEventDispatcher();

    function doStuff() {
        dispatch('click')
    }

</script>

<button class='btn' on:click={ doStuff }>
    { label }
</button>

<style lang='scss'>
    .btn {
        font-family: $font;
        border: 1px outset $light-blue;
        background-color: $light-blue;
        color: white;
        min-width: 100px;
        width: max-content;
        height: 38px;
        cursor: pointer;
        transition: box-shadow .1s;
    }

    .btn:active {
        border: 1px outset $med-blue;
        background-color: $med-blue;
    }

    .btn:hover {
        box-shadow: 0 0 11px rgba(33,33,33,.2); 
    }
</style>