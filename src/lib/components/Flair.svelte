<script>
    export let flair = ''
</script>

<div class="flair"
class:article={flair==='article'}
class:reference={flair==='reference'}
class:podcast={flair==='podcast'}
class:event={flair==='event'}
>
    { flair } 
</div>


<style lang='scss'>
    .flair {
        font-size: 0.75rem;
        border-radius: 3px;
        color: white;
        padding: 3px;
    }

    .event {
        background-color: rgb(235, 161, 23);
    }

    .article {
        background-color: $light-blue;
    }

    .reference {
        background-color: forestgreen;
    }

    .podcast {
        background-color: palevioletred;
    }
</style>