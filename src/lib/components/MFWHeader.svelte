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
        display: flex;
        flex-direction: row;
        gap: 1em;
        margin-top: 1em;
    }
    .photo {
        flex: 0 1 30%;
        img {
            min-width: 200px;
            max-width: 100%;    
        }

        a:hover {
            background:transparent;
        }
    }

    .bio {
        flex: 0 1 70%;
        color: grey;
        text-align: justify;
    }
</style>