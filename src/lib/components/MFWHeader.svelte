<script>
    export let src = '';
    export let name = '';
    export let website = '';
    export let bio = '';
    import { slide } from 'svelte/transition';
</script>
<h2>Artist Bio</h2>
<div class="container">
    <div class="photo" transition:slide>
        <a target='_blank' href={website}>
            <img
            transition:slide
            loading=lazy
            alt={`${name} profile picture`}
            src={src}
            />
        </a>
    </div>
    <div class="bio">
        {@html bio}
    </div>
</div>

<style lang='scss'>
    .container{
        display: grid;
        grid-template-rows: auto auto;
        gap: 1em;
        margin-top: 1em;
    }
    .photo {
        margin: 0 auto;
        img {
            min-width: 0px;
            max-width: 300px  
        }

        a:hover {
            background:transparent;
        }
    }

    .bio {
        color: grey;
        text-align: justify;
    }
</style>