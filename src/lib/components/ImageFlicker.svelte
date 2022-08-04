<script>
    import { onMount } from 'svelte';
	export let images = [];
    var src = images[0]
    var alt = ''
    var currentIdx = 0

    function handleClickBack() {
		currentIdx = currentIdx - 1
        if (currentIdx < 0){
            currentIdx = 0
        };

        handle_button_style()

        src = images[currentIdx]
	}
    function handleClickForward() {
		currentIdx = currentIdx + 1
        if (currentIdx > images.length - 1){
            currentIdx = images.length - 1
        }

        handle_button_style()

        src = images[currentIdx]
	}

    function handle_button_style(){
        if (currentIdx == 0){
            disable_button('button1');
            enable_button('button2');
        }
        else if (currentIdx == images.length -1){
            disable_button('button2');
            enable_button('button1');
        }
        else{
            enable_button('button1');
            enable_button('button2');
        }
    }

    function disable_button(class_name){
        var to_disable = document.getElementsByClassName(class_name);
        for(var i = 0; i < to_disable.length; i++){
            to_disable[i].style.color = "#d6d2d2";
        };
    }

    function enable_button(class_name){
        var to_disable = document.getElementsByClassName(class_name);
        for(var i = 0; i < to_disable.length; i++){
            to_disable[i].style.color = "black";
        };
    }

    onMount(async () => {
		disable_button('button1');
        enable_button('button2');
	});

    
</script>

<div class="imageFlickerContainer">
    <div class="flickerImages">
        <a target="_blank" href={src}>
            <img loading="lazy" {alt} {src} />
        </a>
    </div>
    <div class="flickerControl">
        <button on:click={handleClickBack} class="button button1">Back</button>
        <button on:click={handleClickForward} class="button button2">Forward</button>
    </div>

</div>



<style lang="postcss">
    .imageFlickerContainer{
        background-color: #f2f2f2;
        border: solid black 0.1rem;
        width: 95%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1em;
    }

    .button{
        padding: 1em;
        margin: 0.5em;
    }

    .button2{
        float:right;
    }

    img{
        padding-top: 1em;
		padding-bottom: 1em;
		max-width: 80%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .flickerImages > a{
        max-width: 80%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .flickerImages > a:hover{
        background-color: transparent;
    }

    .flickerImages{
        max-width: 100%;
    }

    .flickerControl{
        background-color: #d6d2d2;
        border-top: solid black 0.1rem;
    }
</style>
