<script>
    // For code block:
    import { browser } from '$app/env';
    let path = '';
    let block;
    let code_string = "";

    function getStrings(){
        
    }

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

<div bind:this={block} class="code_block" style="grid-area: codeBlock1;">
    <h3>Max</h3>
    <button on:click={() => copyCode("max_code")} class="codebtn">📋</button>
    <div class="copied_tick" id="max_tick">✓</div>
    <div >
<pre class="code_container"><code id="max_code">{code_string}</code></pre>
    </div>
</div>

<style>

.snippet_section{
        max-width: 80%;
        margin: 0 auto;
        /*margin-top: 1em;*/
        margin-bottom: 5em;
        grid-gap : 1em;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas: 
        "snippetTitle snippetTitle snippetVid"
        "snippetDesc snippetDesc snippetVid"
        "codeBlock1 codeBlock2 codeBlock3";
    }

    .front_page_video_container_snippet{
        padding: 0.5em;
    }

.code_container{
        border: 0.063rem solid #dcdee0;
        height: 10em;
        

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
        margin: 0.5em;
	}

    .copied_tick{
        position: absolute;
		right: 0;
        bottom: 0;
        color: green;
        font-size: 2em;
        padding: 0.5em;
        opacity: 0;
    }

</style>