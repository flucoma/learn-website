<script lang='ts'>
	export let src: string = '';
	export let alt: string = '';
	export let drawBorder = true;
</script>

<div class="container">
    <a target='_blank' href={src}>
        <img 
        loading=lazy
        alt={alt} 
        src={src}
        />
    </a>
    <div class='label'>
        {@html label}
    </div>
</div>

<style lang='scss'>
    .container {
        display: grid;
        place-items: center;
        width: 80%;
        margin: 0 auto;

        img {
            padding-top: 1em;
            padding-bottom: 1em;
            max-width: 100%;
        }

        a {
            max-width: 100%;
        }

        a:hover {
            background:transparent;
        }
    }

    .label{
        text-align: center;
        font-size: 0.8rem;
        font-style: italic;
    }
</style>
