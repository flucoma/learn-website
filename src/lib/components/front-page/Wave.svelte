<script lang="ts">
    import { onMount } from 'svelte';
	import { CanvasSpace, Create, Pt } from 'pts';
    let height = 100;
    let width;
    let palette = [
        'rgb(4,32,67)',
        'rgb(183,214,232)',
        'rgb(102,161,196)',
        'rgb(26,91,132)',
        'rgb(4,6,17)',
        'rgb(15,71,103)',
        'rgb(58,92,107)'
    ];
    let waveHeight = 1.0;
    $: speed = 0.75
    onMount(async () => {
		let space = new CanvasSpace('#canvas');
		let form = space.getForm();
		space.setup({
			// bgcolor: palette[5],
			resize: true
		});
        let fgWave;
        let bgWave;
        let mdWave;
		space.add({
			start: (bound) => {
                let ln1 = Create.distributeLinear( [new Pt(0, space.center.y), new Pt(space.width, space.center.y)], 50 );
                fgWave = Create.noisePts( ln1, 0.1, 0.05 );
                let ln2 = Create.distributeLinear( [new Pt(0, space.center.y), new Pt(space.width, space.center.y)], 60 );
                mdWave = Create.noisePts( ln2, 0.1, 0.05 );
                let ln3 = Create.distributeLinear( [new Pt(0, space.center.y), new Pt(space.width, space.center.y)], 120 );
                bgWave = Create.noisePts( ln3, 0.1, 0.05 );
			},
			animate: (time, ftime, space) => {
                let nps3 = mdWave.map( (p) => {
                    p.step( 0.01*(1-1), 0.0025*speed );
                    return p.$add( 0, (p.noise2D()*space.center.y) * waveHeight );
                });
                nps3 = nps3.concat( [space.size, new Pt( 0, space.size.y )] );
                form.fillOnly(palette[2]).polygon( nps3 );
                // Generate noise in a line
                let nps2 = bgWave.map( (p) => {
                    p.step( 0.01*(1-1), 0.0025*speed );
                    return p.$add( 0, (p.noise2D()*space.center.y) * waveHeight );
                });
                // Draw wave
                nps2 = nps2.concat( [space.size, new Pt( 0, space.size.y )] );
                form.fillOnly(palette[3]).polygon( nps2 );
                // Generate noise in a line
                let nps = fgWave.map( (p) => {
                    p.step( 0.01*(1-1), 0.0025*speed );
                    return p.$add( 0, (p.noise2D()*space.center.y + (space.center.y * 0.2)) * waveHeight );
                });
                // Draw wave
                nps = nps.concat( [space.size, new Pt( 0, space.size.y )] );
                form.fillOnly(palette[0]).polygon( nps );
			},
			action: (t, x, y, e) => {
                
			},
            resize: () => {
                let ln1 = Create.distributeLinear( [new Pt(0, space.center.y), new Pt(space.width, space.center.y)], 120 );
                fgWave = Create.noisePts( ln1, 0.1, 0.05 );
                let ln2 = Create.distributeLinear( [new Pt(0, space.center.y), new Pt(space.width, space.center.y)], 120 );
                mdWave = Create.noisePts( ln2, 0.1, 0.05 );
                let ln3 = Create.distributeLinear( [new Pt(0, space.center.y), new Pt(space.width, space.center.y)], 120 );
                bgWave = Create.noisePts( ln3, 0.1, 0.05 );
            }
		});
		space.bindMouse().bindTouch().play();
	});
</script>

<canvas
id='canvas' 
width="100%" height="{height}" 
style={`height: ${height}px`}
/>

<style>
    #canvas {
        position: absolute;
        bottom: 0;
        z-index: -1;
        width: 100%;
    }
</style>