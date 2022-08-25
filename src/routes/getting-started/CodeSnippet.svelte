<script>
    // For code block:
    import { browser } from '$app/env';
    let code_key = 'novelty_slice';
    let block;
    let code_string = '';

    let code_examples = {
        "novelty_slice" : {
            "max" : "this is max code",
            "sc" : "this is sc code"
        }
    }

    function get_string(type){
        return code_examples[code_key][type];
    }

    function setType(type){
        code_string = get_string(type);
    };

    code_string = get_string('max');

    function copyCode(element_id) {
        if (browser) {
            let code = document.getElementById(element_id);
            console.log(code.innerText);

            var range, selection;

            if (document.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(code);
                range.select();
            } else if (window.getSelection) {
                selection = window.getSelection();
                range = document.createRange();
                range.selectNodeContents(code);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            
            navigator.clipboard.writeText(code.innerText);

            var tick_id = 'pd_tick';
            if(element_id == 'max_code'){
                tick_id = "max_tick";
            }else if(element_id == 'sc_code'){
                tick_id = "sc_tick";
            }

            var fadeTarget = document.getElementById(tick_id);
            fadeTarget.style.opacity = 1;
            var fadeEffect = setInterval(function() {
            if (fadeTarget.style.opacity < 0.1)
            {
            clearInterval(fadeEffect);
            }
            else
            {
            fadeTarget.style.opacity -= 0.1;
            }
            }, 200);
        }
    }
</script>

<div class="codesnipper_container">
    <div bind:this={block} class="code_block">
        <button on:click={() => copyCode("max_code")} class="codebtn">Copy</button>
        <div class="copied_tick" id="max_tick">✓</div>
        <div>
<pre class="code_container"><code id="max_code">{code_string}</code></pre>
        </div>
    </div>
    <div class="ctrl"> 
        <button on:click={() => setType("max")}>Max</button>
        <button on:click={() => setType("sc")}>SuperCollider</button>
    </div>
</div>

<style>
    .codesnipper_container{
        display: inline;
    }

    .ctrl{
        display: flex;
        position: relative;
    }

    .code_container{
        border: 0.063rem solid #dcdee0;
        height: 150px;
        
        white-space: pre-wrap;
        word-wrap: break-word; 
        overflow-y: scroll;
    }

    .code_block {
		position: relative;
        overflow-x: auto;
	}

	.codebtn {
		font-family: var(--font);
		position: absolute;
		right: 0;
	}

    .copied_tick{
        position: absolute;
		right: 0;
        bottom: 0;
        color: green;
        font-size: 2em;
        opacity: 0;
    }

</style>