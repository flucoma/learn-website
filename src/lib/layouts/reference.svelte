<script>
    export let title;
    export let blurb;
</script>

<div class='title-box'>
    <h1>{ title }</h1> 
    <p class='blurb'>{ blurb }</p>
</div>


<slot />

<h1>See Also</h1>

<style lang='scss'>
    .blurb {
        color: grey;
        text-align: left;
    }

    .title > h1 {
        margin-bottom: 0;
    }

    .title > p {
        margin-top: 0;
    }


</style>