<script>
    // For code block:
    import { browser } from '$app/env';
    let code_key = 'novelty_slice';
    let block;
    let code_string = '';

    let code_examples = {
        "novelty_slice" : {
            "max" : "<pre><code>\n----------begin_max5_patcher----------\n585.3oc0VtsiaCBDF9Z6mBDWmFA3Sw8p88nZUEwljxJarEfSypU69rWN3rMa\niiiaJRs8hXqYLge9lYXfWhifa6NxTPvmAeADE8RbTjyk0QzncDrkdrpgpbCC\n1xTJ5dFbk+aZ1QsyOo7jKdsyQ21m9DN4jydpt5abw9uJYUZudDT5ZzJPBNy9\nJCYeRHqQfGG+OhgVtngocBS9oytA8Iu3QudW5m6Y94FBAOZ+xqww1GqVHbB1\n2MK6KXqWx5YhZfhomBR7LPlT54JO29pfLOj3+hPtmooZsDnns8JvCMbklI.n\no.FMWVMI6LfwiV+lDmbUhWM9KjjucX2Nl7sIHsXNPKSNq7MM+d3jbMN20zQ0\nVP2RE6CJrRiVLfG4IHNeAoV+91h6ZCKY1LaHAUC1BTSPX1BHLwkZwEoAMo5x\nk2MlWqwqo2TCshMAooyPJdSoCQjizzM+617cb2IPIqlfQxBXLwkFyy9OYG5t\nlAd8ZC1htCrF8ypFdE6MvCptAYE6JwA7sqpwEX2qRTPCDWVQ6lVXCW7q2rvs\n1r9+XPwC13zMlTA32Wb0LklKnZdm3rwX.FftRXeo5LNGypSdHzAs.gr2UxR8\netR2JzUD.jxVBQnPD6VRRp3CiokW22wEZ0oqfUtNybPMxU9mfHuaEfXvMKSC\nQcZ9BBAYAPmzEnC4Bc7a2o88GXR03fcRX518TmzZtYkyjK7ltq2YN35.+z3c\n8bfToo0k1z2ZP5VVvi49yvfsc0LoXf6FarENijtNoBp4fwdpmCWC23Wi+Afp\n2Xen\n-----------end_max5_patcher-----------\n</code></pre>",
            "sc" : "(\n~src = Buffer.read(s, FluidFilesPath(\"Nicol-LoopE-M.wav\"));\n~indices = Buffer(s);\nFluidBufNoveltySlice.processBlocking(s, source: ~src, indices: ~indices);\n\nFluidWaveform(~src,~indices,bounds:Rect(0,0,1600,400));\n)"
        }
    };

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

        z-index: 100;
        width: 100%;
        height: 200px;
    }

    .ctrl{
        display: flex;
        position: relative;
    }

    .max_code{
        width: 100%;
    }

    .code_container{
        /*border: 0.063rem solid #dcdee0;*/
        height: 150px;
        width: 100%;
        
        white-space: pre-wrap;
        word-wrap: break-word; 
        overflow-y: scroll;
        font-size: 0.5em;
        padding: 0em;
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

    /*=================================================
    WIDE*/
    @media (min-width: 1200px) {
        .codesnipper_container{
            height: 200px;
        }
        .code_container{
            height: 155px;
        }
	}
    /*=================================================
    NARROW*/
	@media (max-width: 1200px) {
        .codesnipper_container{
            height: 250px;
        }
        .code_container{
            height: 200px;
        }
	}

</style>