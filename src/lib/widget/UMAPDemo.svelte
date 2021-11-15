<script>
	import { UMAP } from 'umap-js';
    import { onMount } from 'svelte';
    import Slider from '$lib/components/Slider.svelte';
    import * as d3 from 'd3';
    import * as THREE from "three";
    import oc from 'three-orbit-controls';
    
    const OrbitControls = oc(THREE)
    let container;
    let height = 450;
    let width = 450;
    let stepInterval = 3;
    let go = true;
    // Animation Code
    let camera, scene, renderer, group;
    let particles, particlePositions, positions, pointCloud;
    const r = 4000;

    // UMAP params
    let neighbors = 10;
    let minDist = 0.3;
    let epochs = 500; 

    // Data
    let epoch = 0;
    let data = new Array(300).fill(new Array(3).fill(0));
    data = data.map(x => x.map(y => Math.random()));

    let umap = new UMAP({
        'nComponents' : 3,
        'nEpochs' : epochs,
        'minDist' : minDist,
        'nNeighbors' : neighbors,
        'spread' : 1.0
    });

    let numEpochs = umap.initializeFit(data);

    onMount(() => {
        init();
        animate();
    })

    const init = () => {
        camera = new THREE.PerspectiveCamera(90, width / height, 1, r * 2);
        const controls = new OrbitControls( camera, container );
        camera.position.z = 5000;
        controls.minDistance = 1000;
        controls.maxDistance = r * 1.5;
        
        scene = new THREE.Scene();
        group = new THREE.Group();
        scene.add(group);

        const pMaterial = new THREE.PointsMaterial({
            color: new THREE.Color(Math.random() * 0.35, Math.random() * 0.35, Math.random() * 0.35, 1.0),
            size: 90,
            blending: THREE.AdditiveBlending,
            transparent: false,
            sizeAttenuation: true
        })

        particles = new THREE.SphereGeometry( 5, 64, 64 );
        particlePositions = new Float32Array(data.length * 3);
        positions = new Float32Array((data.length * data.length) * 3);

        data.forEach((d, i) => {
            const x = r * d[0] - (r / 2);
            const y = r * d[1] - (r / 2);
            const z = r * d[2] - (r / 2);
            
            particlePositions[ i * 3 ] = x;
            particlePositions[ i * 3 + 1 ] = y;
            particlePositions[ i * 3 + 2 ] = z;

        })
        particles.setDrawRange( 0, data.length );
        particles.setAttribute( 
            'position', new THREE.BufferAttribute( 
                particlePositions, 3
            ).setUsage(THREE.DynamicDrawUsage)
        );

        // particles/points
        pointCloud = new THREE.Points( particles, pMaterial );
        group.add( pointCloud );

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );

        geometry.computeBoundingSphere();
        geometry.setDrawRange( 0, 0 );

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor( 0x000000, 0 );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( width, height );
        container.appendChild( renderer.domElement );
        
    }
    
    const animate = () => {

        data.forEach((d, i) => {
            const x = r * d[0] - (r / 4);
            const y = r * d[1] - (r / 4);
            const z = r * d[2] - (r / 4);
            
            particlePositions[ i * 3 ] = x;
            particlePositions[ i * 3 + 1 ] = y;
            particlePositions[ i * 3 + 2 ] = z;
        })

        requestAnimationFrame( animate );
        pointCloud.geometry.attributes.position.needsUpdate = true;
        render()
    }

    const render = () => {renderer.render( scene, camera )};

    const getMinMax = (arr) => {
        let min = Infinity;
        let max = -Infinity;
        arr.forEach(x => {
            let vecMin = d3.min(x);
            let vecMax = d3.max(x);
            min = vecMin < min ? vecMin : min;
            max = vecMax > max ? vecMax : max;
        })
        return { 'min':min,'max':max }
    }

    const step = () => {
        epoch++;
        umap.step()
        let embedding = umap.getEmbedding();
        let bounds = getMinMax(embedding);
        let norm = d3.scaleLinear()
            .domain([bounds.min, bounds.max])
            .range([0, 1]);
        data = embedding.map(row => 
            row.map(col => norm(col))
        );
        if (go && epoch <= numEpochs) {
            setTimeout(step, stepInterval);
        } else {
            go = false;
            epoch = 0;
        }
    }

    const doStep = () => {
        epoch = 0;
        go = true;
        umap = new UMAP({
            'nComponents' : 3,
            'nEpochs' : epochs,
            'minDist' : minDist,
            'nNeighbors' : neighbors
        });
        data = data.map(x => x.map(y => Math.random()));
        numEpochs = umap.initializeFit(data);
        step()
    }

</script>
<div id="controls">
    <button on:click={doStep}>just build it yourself (tm)</button>
</div>


<div id="main">
    <div id="view" bind:this={container} bind:offsetHeight={height} bind:offsetWidth={width}></div>
    <div id="parameters">
        <span>Epoch: {epoch}</span>
        <Slider bind:value={stepInterval} title="Interval" min="1" max="100" step="1"/>
        <Slider bind:value={epochs} title="Epochs" min="50" max="2000" step="1" chFunc={doStep}/>
        <Slider bind:value={minDist} title="Minimum Distance" min="0.0" max="1" step="0.001" chFunc={doStep}/>
        <Slider bind:value={neighbors} title="Number of Neighbours" min="3" max="99" step="1" chFunc={doStep}/>
    </div>
</div>
<style>
    #view {
        height: 600px;
        width: 600px;
        border: 1px solid rgba(128, 128, 128, 0.32);
    }

    #main {
        display: flex;
        flex-direction: row;
    }

    #parameters {
        display: flex;
        flex-direction: column;
    }
</style>