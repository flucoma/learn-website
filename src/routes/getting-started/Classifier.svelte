<script>
	import { onMount } from 'svelte';
	import { clip } from '$lib/util';
	import * as d3 from 'd3';

	let container;
	let simulation;
	let height;
	let width;
	let connections = [
		{
			'Content-Aware Program Output': ['JSON Data', 'Audio Outputs', 'Data Visualisation']
		},
		{
			'JSON Data': [
				'Max Facilitated Exploration',
				'Return to Generating Outputs',
				'REAPER Scripting',
				'Manual and Intuitive Composing'
			]
		},
		{
			'Max Facilitated Exploration': [
				'Return to Generating Outputs',
				'REAPER Scripting',
				'Manual and Intuitive Composing'
			]
		},
		{
			'Return to Generating Outputs': ['Content-Aware Program Output']
		},
		{
			'REAPER Scripting': ['Manual and Intuitive Composing', 'Return to Generating Outputs', 'Audio Outputs']
		},
		{
			'Audio Outputs': ['Manual and Intuitive Composing', 'Return to Generating Outputs']
		},
		{
			'Manual and Intuitive Composing': ['Return to Generating Outputs']
		},
		{
			'Data Visualisation': ['Return to Generating Outputs', 'Manual and Intuitive Composing', 'REAPER Scripting']
		}
	];

	let nodes = [];
	let links = [];
	let counter = 4;
	connections.forEach(d => {
		for (var k in d) {
			nodes.push({ id: k, group: counter });

			d[k].forEach(l => {
				links.push({ source: k, target: l, group: counter });
			});
			counter += 1;
		}
	});
	onMount(() => {
		let svg = d3.select(container);
		simulation = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3.forceLink(links).id(d => {
					return d.id;
				})
			)
			.force('charge', d3.forceManyBody().strength(-2000).distanceMin(-24))
			.force('center', d3.forceCenter(width / 2.74, height / 2));

		const colourScale = d3.scaleOrdinal(d3.schemeCategory10);
		svg.append('svg:defs')
			.append('svg:marker')
			.attr('id', 'arrow')
			.attr('viewBox', '0 -2 7 7')
			.attr('refX', 4.7) //so that it comes towards the center.
			.attr('markerWidth', 20)
			.attr('markerHeight', 20)
			.attr('orient', 'auto')
			.append('svg:path')
			.attr('d', 'M0,-1L3,0L0,1');

		let link = svg
			.append('g')
			.style('stroke', 4)
			.selectAll('line')
			.data(links)
			.attr('stroke-opacity', 1.0)
			.join('line')
			.style('stroke', d => colourScale(d.group))
			.attr('marker-end', 'url(#arrow)');

		let node = svg
			.append('g')
			.attr('stroke', '#fff')
			.attr('stroke-width', 1.5)
			.selectAll('circle')
			.data(nodes)
			.join('circle')
			.attr('fill', d => colourScale(d.group))
			.attr('r', d => (d.id === 'Return to Generating Outputs' ? 6 : 4));

		let text = svg
			.append('g')
			.attr('class', 'labels')
			.selectAll('text')
			.data(nodes)
			.enter()
			.append('text')
			.attr('text-align', 'left')
			.attr('transform', 'translate(15, 0)')
			.text(d => {
				return d.id;
			});

		simulation.on('tick', () => {
			link.attr('x1', d => clip(d.source.x, 0, width))
				.attr('y1', d => clip(d.source.y, 0, height))
				.attr('x2', d => clip(d.target.x, 0, width))
				.attr('y2', d => clip(d.target.y, 0, height));

			node.attr('cx', d => clip(d.x, 0, width)).attr('cy', d => clip(d.y, 0, height));

			text.attr('dx', d => clip(d.x, 0, width)).attr('dy', d => clip(d.y, 0, height));
		});
	});
</script>

<a class="container" href='/learn/classification-neural-network'>
	<h1>Neural Network Classifier</h1>
	<p>Classify sounds using a neural network</p>
	<svg bind:this={container} class="d3-container" width=250 height=300 />
</a>

<style>
	a {
		text-decoration: none;
		color: black;
	}

	a:hover {
		background: transparent;
	}

	a > h1 {
		margin: 0;
	}
	.container {
		width: 500px;
		height: 300px;
		position: relative;
		border-radius: 0.25rem;
		border: 0.063rem solid #dcdee0;
		padding: 0.75em;
		max-width: 100%;
	}

	.box {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: -100;
	}
</style>
