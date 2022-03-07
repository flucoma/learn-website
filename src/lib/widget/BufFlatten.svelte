<script>
  // https://sashamaps.net/docs/resources/20-colors/
  const colors = [[230, 25, 75], [60, 180, 75], [255, 225, 25], [0, 130, 200], [245, 130, 48], [70, 240, 240], [240, 50, 230], [250, 190, 212], [0, 128, 128], [220, 190, 255], [170, 110, 40], [255, 250, 200], [128, 0, 0], [170, 255, 195], [0, 0, 128], [128, 128, 128], [255, 120, 120], [0, 0, 0]]
  const css_colors = colors.map(x => `rgb(${x[0]}, ${x[1]}, ${x[2]})`);
  const shapes = [
      '',
      'polygon(0% 0%, 0% 0%, 100% 100%, 0% 100%)',
      'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      'circle(50%)',
      'polygon(100% 100%, 0% 0%, 0% 100%, 100% 0%)',
  ];
  
  let displayNumFrames = -1;
  let displayNumChans = -1;

  let srcFrames = 5;
  let srcChans = 3;

  let startFrame = 0;
  let numFrames;

  let startChan = 0;
  let numChans;
  
  let axis = 1;
  
  let numFrames_error = '';
  let numChans_error = ''; 
  let startFrame_error = '';
  let startChan_error = '';
    
  $:{
    numFrames = srcFrames;
    numChans = srcChans;
    
    numFrames_error = '';
    numChans_error = '';
    startFrame_error = '';
    startChan_error = '';
        
    if(displayNumFrames===0){
      numFrames_error = 'numFrames cannot = 0';
    } 
    
    if(displayNumChans===0){
      numChans_error = 'numChans cannot = 0'
    }
    
    numFrames = displayNumFrames===-1 ? srcFrames : displayNumFrames;
    numChans = displayNumChans===-1 ? srcChans : displayNumChans;

    let endFrame = Math.min(startFrame+numFrames,srcFrames)
    let endChan = Math.min(startChan+numChans,srcChans)
    
    numFrames = endFrame - startFrame;
    numChans = endChan - startChan;
    
    if(startFrame+displayNumFrames > srcFrames){
      startFrame_error = 'startFrame + numFrames cannot be > the number of frames in the soruce';
    } 
    
    if(startChan+displayNumChans > srcChans){
      startChan_error = 'startFrame + numFrames cannot be > the number of frames in the soruce';
    } 
  }
  
</script>

<form>
    <label class='numberboxlabel' for='start_frame'>Start Frame</label>
    <input class='numberbox' id='start_frame' bind:value={startFrame} type=number min=0 max={srcFrames-1} />
    <div class='error'>{startFrame_error}</div>
</form>

<form>
    <label class='numberboxlabel' for='num_frames'>Num Frames</label>
    <input class='numberbox' id='num_frames' bind:value={displayNumFrames} type=number min=-1 max={srcFrames} />
    <div class="error">{ numFrames_error }</div>
</form>

<form>
    <label class='numberboxlabel' for='start_chan'>Start Chan</label>
    <input class='numberbox' id='start_chan' bind:value={startChan} type=number min=0 max={srcChans-1}/>
    <div class="error">{ startChan_error }</div>
</form>

<form>
    <label class='numberboxlabel' for='num_chans'>Num Chans</label>
    <input class='numberbox' id='num_chans' bind:value={displayNumChans} type=number min=-1 max={srcChans}/>
    <div class="error">{ numChans_error }</div>
</form>

<form>
    <label class='numberboxlabel' for='axis'>Axis</label>
    <input class='numberbox' id='axis' bind:value={axis} type=number min=0 max=1/>
</form>

<br>

<div class="container source">
    <div class="label">Source Buffer</div>
    {#each {length: srcChans} as _,chan}
    <div class="row">
        {#each {length: srcFrames} as _,frame}
        <div
        class='cube'
        style:background-color={css_colors[frame]} 
        style:clip-path={shapes[chan]}
        />
        {/each}
    </div>
    {/each}
</div>

<div class="container destination">
    <div class="label">Destination Buffer</div>
    <div class="row">
    
    {#if axis===1}
        {#each {length: numFrames} as _,frame }
          {#each {length: numChans} as _,chan }
            <div 
            class="cube"
            style:background-color={css_colors[startFrame+frame]} 
            style:clip-path={shapes[startChan+chan]}
            />
          {/each}                
        {/each}
        
        {:else}
        
        {#each {length: numChans} as _,chan }
          {#each {length: numFrames} as _,frame }
            <div 
            class="cube"
            style:background-color={css_colors[startFrame+frame]} 
            style:clip-path={shapes[startChan+chan]}
            />
          {/each}                
        {/each}
         
        {/if}
    </div>
</div>

<style>
    .numberbox {
        width: 50px;
    }
    
    .numberboxlabel {
        width: 150px;
    }
    
    .error {
        color: red;
        font-size: 0.75rem;
    }
    
    .container {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        margin-bottom: 2em;
    }

    .row {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
    }

    .cube {
        width: 30px;
        height: 30px;
    }

    form {
        display: grid;
        gap: 0.5em;
        grid-template-columns: 10ch auto auto;
        justify-content: left;
        margin-bottom: 0.5em;
    }
    
</style>
