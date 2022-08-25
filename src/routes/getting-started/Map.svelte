<script>
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import * as d3 from 'd3';
	import * as _ from 'lodash';
	import metric0 from '$lib/data/reference/mds/metric_0.json';
	import metric1 from '$lib/data/reference/mds/metric_1.json';
	import metric2 from '$lib/data/reference/mds/metric_2.json';
	import metric3 from '$lib/data/reference/mds/metric_3.json';
	import metric4 from '$lib/data/reference/mds/metric_4.json';
	import metric5 from '$lib/data/reference/mds/metric_5.json';

	let canvas, ctx, chart, timer;

	const metric = [
		Object.values(metric0.data).map(x => [...x, Math.random() * 4]),
		Object.values(metric1.data).map(x => [...x, Math.random() * 3]),
		Object.values(metric2.data).map(x => [...x, Math.random() * 2]),
		Object.values(metric3.data).map(x => [...x, Math.random() * 6]),
		Object.values(metric4.data).map(x => [...x, Math.random() * 3.5]),
		Object.values(metric5.data).map(x => [...x, Math.random() * 3])
	];

	const numpoints = 400;

	const colours = metric[0].map(v => d3.interpolateBlues(v[0] * 4 * v[1] + 0.4));

	const change = () => {
		clearInterval(timer);
		const time = Math.random() * 3000 + 2000
		timer = setInterval(change, time);
		chart.data.datasets[0].data = _.sample(metric).slice(0, numpoints);
		let colour;
		const choice = Math.random();
		if (choice > 0.66) {
			colour = metric[0].map(v => d3.interpolateSinebow(v[0] * 4 * v[1] + 0.4));
		} else if (choice > 0.33 && choice <= 0.66) {
			colour = metric[0].map(v => d3.interpolateBlues(v[0] * 4 * v[1] + 0.4));
		} else {
			colour = metric[0].map(v => d3.interpolateWarm(v[0] * 4 * v[1] + 0.4));
		}

		chart.data.datasets[0].backgroundColor = colour
		chart.data.datasets[0].borderColor = colour;
		chart.update();
	}

	onMount(async () => {
		Chart.register(...registerables);
		ctx = canvas.getContext('2d');

		const data = {
			datasets: [
				{
					data: metric[0].slice(0, numpoints),
					backgroundColor: colours,
					borderColor: colours,
					pointRadius: 4
				}
			]
		};

		chart = new Chart(ctx, {
			type: 'bubble',
			data: data,
			options: {
				events: [],
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				scales: {
					x: { display: false },
					y: { display: false }
				}
			}
		});
		chart.options.animation = { duration: 3000 };

		timer = setInterval(change, 2000)
	});
</script>


<a class="raisedbox tile" href='/learn/2d-corpus-explorer'>
	<h3>2D Corpus Exploration</h3>
	<p class='description'>Explore a sound bank using machine listening and machine learning</p>
	<canvas bind:this={canvas} id="scatter-plot" on:mouseenter={change} on:mouseleave={change}/>
</a>

<style>
	a {
		padding: 0.75em;
	}

	#scatter-plot {
		max-height: 200px;
	}

	@media (min-width: 700px) {
		a, #scatter-plot {
			width: calc(668px - 1.5em) !important;
		}
	}
	
	@media (max-width: 700px) {
		a, #scatter-plot {
			width: 300px !important;
		}
	}

</style>
