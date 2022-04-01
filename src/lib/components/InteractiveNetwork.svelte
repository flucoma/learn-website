<script lang="ts">
    import { onMount } from 'svelte';
    import { getting_started } from '$lib/app.js';

    var graph = getting_started;
    let el;

    import * as d3 from 'd3';

    onMount(() => {

        var svg = d3.select(el)
        .append("svg")
            .style("width", "95%")
            .style("height", "95%")
            .style("background-color", "white")
            .style("display", "block")
            .style("margin", "0 auto")
            .style("text-align", "center")
            .style("border", "0.063rem solid #dcdee0");

        var svg_g = svg.append('g');

        console.log(svg.node())

        var width = svg.node().getBoundingClientRect().width;
        var height =  svg.node().getBoundingClientRect().height;
        var r = 20;
        var collide_buffer = 10;
        var repulsion_strength = -400;
        console.log('Dimensions:', width, height);

        init();

        var simulation = d3.forceSimulation()
            .force("x", d3.forceX(width / 2))
            .force("y", d3.forceY(height / 2))
            .force("collide", d3.forceCollide(r + collide_buffer))
            .force("charge", d3.forceManyBody()
                .strength(repulsion_strength))
            .force("link", d3.forceLink()
                .id(function (d) { return d.id; }))
            .on("tick", update);

        // Run the simulation:
        simulation.nodes(graph.nodes);
        simulation.force("link")
            .links(graph.links);

        function update(){
            graph.nodes.forEach(update_node);
            graph.links.forEach(update_link);
        };

        function update_node(d){
            d3.select("#unique_id_node_" + String(d.id) + "> circle")
                .attr("cx", d.x)
                .attr("cy", d.y);
            d3.select("#unique_id_node_" + String(d.id) + "> text")
                .attr("x", d.x)
                .attr("y", d.y);
        };

        function update_link(l){
            d3.select("#unique_id_link_" + String(l.source.id) + '_' + String(l.target.id))
                .attr("x1", l.source.x)
                .attr("y1", l.source.y)
                .attr("x2", l.target.x)
                .attr("y2", l.target.y);
        };

        function init(){
            init_nodes();
            init_links();
        };

        function init_links(){
            graph.links.forEach(function(l){                
                svg_g.append("line")
                    .attr("x1", l.source.x)
                    .attr("y1", l.source.y)
                    .attr("x2", l.target.x)
                    .attr("y2", l.target.y)
                    .attr("stroke", "black")
                    .attr("id", "unique_id_link_" + String(l.source) + '_' + String(l.target));
            })
        };

        function init_nodes(){
            graph.nodes.forEach(function(d){
                d.x = Math.random() * width;
                d.y = Math.random() * height;

                var this_g = svg_g.append("g")
                    .attr("id", "unique_id_node_" + String(d.id))
                
                this_g.append("circle")
                    .attr("cx", d.x)
                    .attr("cy", d.y)
                    .attr("r", r);

                this_g.append("text")
                    .attr("x", d.x)
                    .attr("y", d.y)
                    .style("fill", "red")
                    .html(d.name); 
            });
        };

        function process_selection(node_info){
            console.log(node_info.name);
            var to_change = document.getElementById('display_name')
            to_change.innerHTML = node_info.name
        };

        svg.call(d3.drag()
            .container(svg.node())
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

        svg.on("click", function(){
            var clicked_on = dragsubject(event);
        })

        function dragsubject(event){
            var clicked_on = simulation.find(event.x, event.y)
            process_selection(clicked_on); 
            return clicked_on;
        };

        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        };
        
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        };
        
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;   
            event.subject.fy = null;
        };

	});

</script>

<div bind:this={el} id="interactive_network_div"></div>

<style>

    #interactive_network_div{
        background-color: white;
        
        min-width: 100%;
        height: 500px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>