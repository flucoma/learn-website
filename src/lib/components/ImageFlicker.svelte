<script>
    import { onMount } from 'svelte';
	export let images = [];
    var src = images[0]
    var alt = ''
    var currentIdx = 0

    function handleClick(direction) {
        if (direction == 'back'){
            currentIdx = currentIdx - 1
            if (currentIdx < 0){
                currentIdx = 0
            };
        } else if(direction == 'forward'){
            currentIdx = currentIdx + 1
            if (currentIdx > images.length - 1){
                currentIdx = images.length - 1
            };
        };
		
        handle_button_style()

        src = images[currentIdx]
	};

    function handle_button_style(){
        if (currentIdx == 0){
            set_button_state('button1', 'disable');
            set_button_state('button2', 'enable');
        }
        else if (currentIdx == images.length -1){
            set_button_state('button1', 'enable');
            set_button_state('button2', 'disable');
        }
        else{
            set_button_state('button1', 'enable');
            set_button_state('button2', 'enable');
        };
    };

    function set_button_state(class_name, state){
        var to_disable = document.getElementsByClassName(class_name);
        for(var i = 0; i < to_disable.length; i++){
            if (state == "disable"){
                //to_disable[i].style.color = "#d6d2d2";
                to_disable[i].disabled = true;
            }else if(state == "enable"){
                //to_disable[i].style.color = "black";
                to_disable[i].disabled = false;
            };
        };
    };

    onMount(async () => {
		handle_button_style();
	});
</script>

<div class="imageFlickerContainer">

    <div class="flickerImages">

        <button on:click={() => handleClick("back")} class="button button1" disabled=true>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" transform="rotate(180)">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
        </button>

        <a target="_blank" href={src}>
            <img loading="lazy" {alt} {src} />
        </a>

        <button on:click={() => handleClick("forward")} class="button button2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
        </button>

    </div>
</div>



<style lang="postcss">

    svg {
		fill: var(--med-blue);
		width: 16px;
		height: 16px;
	}

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
        height: 50px;
        background-color: transparent;
        border: 0em;
    }

    .button:hover{
        cursor: pointer;
        background-color: #c0c2c0;
    }

    button:disabled,
    button[disabled]{
        background-color: transparent;
        cursor: not-allowed;
        color: #c0c2c0;
    }

    button:disabled,
    button[disabled]:hover{
        background-color: transparent;
        cursor: not-allowed;
        color: #c0c2c0;
    }

    button:disabled,
    button[disabled] > svg{
        fill: #c0c2c0;
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
        cursor: zoom-in;
    }

    .flickerImages > a:hover{
        background-color: transparent;
    }

    .flickerImages{
        max-width: 100%;
        display: flex;
        align-items: center;
    }
</style>
