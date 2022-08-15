import * as d3 from 'd3';

export const dragNetwork = simulation => {
	const dragstarted = event => {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	};

	const dragged = event => {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	};

	const dragended = event => {
		if (!event.active) simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;
	};

	return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
};
